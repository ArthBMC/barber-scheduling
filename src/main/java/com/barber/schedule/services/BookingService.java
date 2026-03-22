package com.barber.schedule.services;

import com.barber.schedule.entities.Barber;
import com.barber.schedule.entities.Booking;
import com.barber.schedule.entities.Client;
import com.barber.schedule.entities.ServiceType;
import com.barber.schedule.entities.dtos.BookingDTO;
import com.barber.schedule.entities.enums.BookingStatus;
import com.barber.schedule.repositories.BarberRepository;
import com.barber.schedule.repositories.BookingRepository;
import com.barber.schedule.repositories.ServiceTypeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private ClientService clientService;
    @Autowired
    private BarberRepository barberRepository;
    @Autowired
    private ServiceTypeRepository serviceTypeRepository;

    public List<Booking> findAll(){
        return bookingRepository.findAll();
    }

    public Booking findById(Long id){
        Optional<Booking> obj = bookingRepository.findById(id);
        return obj.orElseThrow(() -> new RuntimeException("Booking not found"));
    }

    @Transactional
    public Booking insert(BookingDTO bookingDTO){
        int minutes = bookingDTO.moment().getMinute();
        if (minutes != 0 && minutes != 30){
            throw new RuntimeException("Bookings can only be scheduled for full hours or half-hours (for example 14:00 or 14:30)");
        }
        if (bookingDTO.moment().isBefore(LocalDateTime.now())){
            throw new RuntimeException("You cannot schedule a past date");
        }

        Client client = clientService.findOrCreate(bookingDTO.clientName(), bookingDTO.clientPhone());

        Barber barber = barberRepository.findById(bookingDTO.barberId()).orElseThrow(() -> new RuntimeException("Barber not found"));
        ServiceType serviceType = serviceTypeRepository.findById(bookingDTO.serviceTypeId()).orElseThrow(() -> new RuntimeException("Service not found"));

        Booking booking = new Booking();
        booking.setClient(client);
        booking.setBarber(barber);
        booking.setServiceType(serviceType);
        booking.setBookedPrice(serviceType.getPrice());
        booking.setBookedDuration(serviceType.getDuration());
        booking.setMoment(bookingDTO.moment());
        booking.setBookingStatus(BookingStatus.WAITING_CONFIRMATION);
        return bookingRepository.save(booking);
    }

    @Transactional
    public void updateStatus(Long id, BookingStatus newStatus){
        Booking booking = bookingRepository.getReferenceById(id);
        if (booking.getBookingStatus() == BookingStatus.CANCELED){
            throw new RuntimeException("It's not possible to change a status from a booking cancelled");
        }
        booking.setBookingStatus(newStatus);
        bookingRepository.save(booking);
    }

    public List<Booking> findByBarberAndDate(Long barberId, LocalDate date){
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.atTime(LocalTime.MAX);

        return bookingRepository.findByBarberIdAndMomentBetween(barberId, startOfDay, endOfDay);
    }

    public List<Booking> findHistoryByPhone(String phone){
        if(phone != null) {
            return bookingRepository.findByClientPhoneOrderByMomentDesc(phone);
        }else {
            return null;
        }
    }

}
