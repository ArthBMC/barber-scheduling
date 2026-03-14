package com.barber.schedule.services;

import com.barber.schedule.entities.Barber;
import com.barber.schedule.entities.Client;
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
        return obj.orElseThrow(() -> new RuntimeException ("This barber does not exists"));
    }

    public Barber update(Long id, Barber obj){
        Barber entity = barberRepository.getReferenceById(id);
        updateData(entity, obj);
        return barberRepository.save(entity);
    }

    public void updateData(Barber entity, Barber obj){
        if (obj.getName() != null){
            entity.setName(obj.getName());
        }
        if (obj.getAvatarUrl() != null){
            entity.setAvatarUrl(obj.getAvatarUrl());
        }
    }

}
