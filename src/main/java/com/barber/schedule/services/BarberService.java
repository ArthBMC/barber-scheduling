package com.barber.schedule.services;

import com.barber.schedule.entities.Barber;
import com.barber.schedule.repositories.BarberRepository;
import com.barber.schedule.repositories.BarberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BarberService {

    @Autowired
    private BarberRepository barberRepository;

    public List<Barber> findAll(){
        return barberRepository.findAll();
    }

    public Barber findById(Long id){
        Optional<Barber> obj = barberRepository.findById(id);
        return obj.get();
    }

    public Barber insert(Barber obj){
        return barberRepository.save(obj);
    }

    public void delete(Long id){
        barberRepository.deleteById(id);
    }

}
