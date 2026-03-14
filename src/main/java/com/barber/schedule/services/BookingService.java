package com.barber.schedule.services;

import com.barber.schedule.entities.Booking;
import com.barber.schedule.repositories.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public List<Booking> findAll(){
        return bookingRepository.findAll();
    }

    public Booking findById(Long id){
        Optional<Booking> obj = bookingRepository.findById(id);
        return obj.get();
    }

    public Booking insert(Booking obj){
        return bookingRepository.save(obj);
    }

    public List<Booking> findHistoryByPhone(String phone){
        if(phone != null) {
            return bookingRepository.findByClientPhoneOrderByMomentDesc(phone);
        }else {
            return null;
        }
    }

}
