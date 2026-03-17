package com.barber.schedule.services;

import com.barber.schedule.entities.Barber;
import com.barber.schedule.entities.User;
import com.barber.schedule.entities.dtos.BarberDTO;
import com.barber.schedule.entities.dtos.LoginDTO;
import com.barber.schedule.entities.enums.UserRoles;
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

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(Long id) {
        Optional<User> obj = userRepository.findById(id);
        return obj.orElseThrow(() -> new RuntimeException("This user does not exists."));
    }

    @Transactional
    public User registerNewBarber(BarberDTO barberDTO) {
        Barber barber = new Barber(barberDTO.name(), barberDTO.avatarUrl());
        barberRepository.save(barber);

        User baberUser = new User();
        baberUser.setUsername(barberDTO.username());
        baberUser.setPassword(barberDTO.password());
        baberUser.setRole(UserRoles.BARBER);
        baberUser.setBarber(barber);
        return userRepository.save(baberUser);
    }

    @Transactional
    public User createAdmin(String username, String password) {
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("This username already exists");
        }
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setRole(UserRoles.ADMIN);
        return userRepository.save(user);
    }

    public User login(LoginDTO loginDTO) {
        User user = userRepository.findByUsername(loginDTO.username()).orElseThrow(() -> new RuntimeException("User or Password invalid."));
        if (!user.getPassword().equals(loginDTO.password())) {
            throw new RuntimeException("User or Password invalid.");
        }
        return user;
    }

    @Transactional
    public User updateUsername(Long id, String newUsername) {
        User entity = userRepository.getReferenceById(id);
        entity.setUsername(newUsername);
        return userRepository.save(entity);
    }

    @Transactional
    public User updatePassword(Long id, String newPassword) {
        User entity = userRepository.getReferenceById(id);
        entity.setPassword(newPassword);
        return userRepository.save(entity);
    }


}
