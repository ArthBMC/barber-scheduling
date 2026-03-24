package com.barber.schedule.services;

import com.barber.schedule.entities.Barber;
import com.barber.schedule.entities.BarberBlock;
import com.barber.schedule.entities.BarberSchedule;
import com.barber.schedule.entities.Booking;
import com.barber.schedule.entities.dtos.BarberBlockDTO;
import com.barber.schedule.entities.dtos.BarberScheduleDTO;
import com.barber.schedule.entities.enums.BookingStatus;
import com.barber.schedule.repositories.BarberBlockRepository;
import com.barber.schedule.repositories.BarberRepository;
import com.barber.schedule.repositories.BarberScheduleRepository;
import com.barber.schedule.repositories.BookingRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ScheduleService {

    @Autowired
    private BarberScheduleRepository barberScheduleRepository;
    @Autowired
    private BarberBlockRepository barberBlockRepository;
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private BarberRepository barberRepository;

    public List<LocalTime> getAvailableSchedule(Long barberId, LocalDate bookingDate) {
        List<LocalTime> availableTimes = new ArrayList<>();

        List<BarberSchedule> schedules = barberScheduleRepository.findByBarberIdAndDayOfWeek(barberId, bookingDate.getDayOfWeek());

        if (schedules.isEmpty()){
            return availableTimes;
        }

        for (BarberSchedule schedule : schedules){
            LocalTime currentTime = schedule.getStartTime();
            while (currentTime.isBefore(schedule.getEndTime())){
                availableTimes.add(currentTime);
                currentTime = currentTime.plusMinutes(30);
            }
        }

        List<Booking> bookings = bookingRepository.findByBarberIdAndMomentBetweenAndBookingStatusNot(barberId, bookingDate.atStartOfDay(),
                bookingDate.atTime(LocalTime.MAX), BookingStatus.CANCELED);

        for (Booking booking : bookings){
            LocalTime bookedTime = booking.getMoment().toLocalTime();
            availableTimes.remove(bookedTime);
        }

        if (bookingDate.isEqual(LocalDate.now())){
            LocalTime now = LocalTime.now();
            availableTimes.removeIf(time -> time.isBefore(now));
        }

        List<BarberBlock> blocks = barberBlockRepository.findByBarberIdAndStartTimeBeforeAndEndTimeAfter(barberId,
                bookingDate.atTime(LocalTime.MAX), bookingDate.atStartOfDay());

        availableTimes.removeIf(timeSlot -> {
            LocalDateTime slotMoment = bookingDate.atTime(timeSlot);

            for (BarberBlock block : blocks){
                if (!slotMoment.isBefore(block.getStartTime()) && slotMoment.isBefore(block.getEndTime())){
                    return true;
                }
            }
            return false;
        });
        return availableTimes;
    }

    @Transactional
    public List<BarberSchedule> syncSchedule(Long barberId, List<BarberScheduleDTO> dto){

        Barber barber = barberRepository.findById(barberId)
                .orElseThrow(() -> new RuntimeException("Barber not found"));

        barberScheduleRepository.deleteByBarberId(barberId);

        List<BarberSchedule> newSchedule = new ArrayList<>();

        for (BarberScheduleDTO scheduleDTO : dto){
            BarberSchedule schedule = new BarberSchedule();
            schedule.setBarber(barber);
            schedule.setDayOfWeek(scheduleDTO.dayOfWeek());
            schedule.setStartTime(scheduleDTO.startTime());
            schedule.setEndTime(scheduleDTO.endTime());
            newSchedule.add(schedule);
        }

        return barberScheduleRepository.saveAll(newSchedule);
    }

    @Transactional
    public BarberBlock blockSchedule(Long barberId, BarberBlockDTO barberBlockDTO){
        if (barberBlockDTO.startTime().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("You cannot block a past date.");
        }

        BarberBlock barberBlock = new BarberBlock();
        barberBlock.setBarber(barberRepository.findById(barberId).orElseThrow());
        barberBlock.setStartTime(barberBlockDTO.startTime());
        barberBlock.setEndTime(barberBlockDTO.endTime());
        barberBlockRepository.save(barberBlock);

        return barberBlockRepository.save(barberBlock);
    }

    @Transactional
    public void unlockSchedule(Long blockId){
        if (!barberBlockRepository.existsById(blockId)) {
            throw new RuntimeException("Block not found.");
        }
        barberBlockRepository.deleteById(blockId);
    }


}
