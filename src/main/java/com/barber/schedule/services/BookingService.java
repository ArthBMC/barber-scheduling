package com.barber.schedule.services;

import com.barber.schedule.entities.Barber;
import com.barber.schedule.entities.Booking;
import com.barber.schedule.entities.Client;
import com.barber.schedule.entities.ServiceType;
import com.barber.schedule.entities.dtos.BookingDTO;
import com.barber.schedule.entities.enums.BookingStatus;
import com.barber.schedule.repositories.BarberRepository;
import com.barber.schedule.repositories.BookingRepository;
import com.barber.schedule.repositories.ClientRepository;
import com.barber.schedule.repositories.ServiceTypeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private BarberRepository barberRepository;
    @Autowired
    private ServiceTypeRepository serviceTypeRepository;

    public List<Booking> findAll(){
        return bookingRepository.findAll();
    }

    public Booking findById(Long id){
        Optional<Booking> obj = bookingRepository.findById(id);
        return obj.get();
    }

    @Transactional
    public Booking insert(BookingDTO bookingDTO){

        Client client = findOrCreate(bookingDTO.clientName(), bookingDTO.clientPhone());

        Barber barber = barberRepository.findById(bookingDTO.barberId()).orElseThrow(() -> new RuntimeException("Barber not found"));
        ServiceType serviceType = serviceTypeRepository.findById(bookingDTO.serviceTypeId()).orElseThrow(() -> new RuntimeException("Service not found"));

        Booking booking = new Booking();
        booking.setClient(client);
        booking.setBarber(barber);
        booking.setServiceType(serviceType);
        booking.setMoment(bookingDTO.moment());
        booking.setBookingStatus(BookingStatus.WAITING_CONFIRMATION);
        return bookingRepository.save(booking);
    }

    private Client findOrCreate(String name, String phone){
        return clientRepository.findByPhone(phone).orElse(clientRepository.save(new Client(name, phone)));
    }

    public List<Booking> findHistoryByPhone(String phone){
        if(phone != null) {
            return bookingRepository.findByClientPhoneOrderByMomentDesc(phone);
        }else {
            return null;
        }
    }

}
