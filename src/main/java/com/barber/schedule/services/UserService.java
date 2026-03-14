package com.barber.schedule.services;

import com.barber.schedule.entities.Barber;
import com.barber.schedule.entities.User;
import com.barber.schedule.entities.dtos.BarberDTO;
import com.barber.schedule.repositories.BarberRepository;
import com.barber.schedule.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BarberRepository barberRepository;

    public List<User> findAll(){
        return userRepository.findAll();
    }

    public User findById(Long id){
        Optional<User> obj = userRepository.findById(id);
        return obj.get();
    }

    @Transactional
    public User registerNewBarber(BarberDTO barberDTO){
        Barber barber = new Barber(barberDTO.name(), barberDTO.avatarUrl());
        barberRepository.save(barber);

        User baberUser = new User();
        baberUser.setUsername(barberDTO.username());
        baberUser.setPassword(barberDTO.password());
        baberUser.setRole("BARBER");
        baberUser.setBarber(barber);
        return userRepository.save(baberUser);
    }



}
