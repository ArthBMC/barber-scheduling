package com.barber.schedule.services;

import com.barber.schedule.entities.Barber;
import com.barber.schedule.entities.User;
import com.barber.schedule.entities.dtos.LoginDTO;
import com.barber.schedule.entities.dtos.RegisterDTO;
import com.barber.schedule.entities.enums.UserRoles;
import com.barber.schedule.exceptions.ExistentUsernameException;
import com.barber.schedule.exceptions.InvalidLoginCredentialsException;
import com.barber.schedule.exceptions.NotFoundException;
import com.barber.schedule.repositories.BarberRepository;
import com.barber.schedule.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BarberRepository barberRepository;
    //@Autowired
    //private PasswordEncoder passwordEncoder;

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(Long id) {
        Optional<User> obj = userRepository.findById(id);
        return obj.orElseThrow(() -> new NotFoundException("User with id " + id + " not found"));
    }

    public UserDetails findByUsername(String username) {
        UserDetails user = userRepository.findByUsername(username);
        if (user == null) {throw new InvalidLoginCredentialsException("User or Password invalid.");}
        return user;
    }

    @Transactional
    public void registerNewBarber(RegisterDTO barberDTO, String password) {
        if (userRepository.existsByUsername(barberDTO.username())) {
            throw new ExistentUsernameException("This username already exists.");
        }

        Barber barber = new Barber(barberDTO.name(), barberDTO.avatarUrl());
        barberRepository.save(barber);

        User baberUser = new User();
        baberUser.setUsername(barberDTO.username());
        //baberUser.setPassword(passwordEncoder.encode(barberDTO.password()));
        baberUser.setPassword(password);
        baberUser.setRole(UserRoles.BARBER);
        baberUser.setBarber(barber);
        userRepository.save(baberUser);
    }

    @Transactional
    public void createAdmin(String username, String password) {
        if (userRepository.existsByUsername(username)) {
            throw new ExistentUsernameException("This username already exists.");
        }
        User user = new User();
        user.setUsername(username);
        //user.setPassword(passwordEncoder.encode(password));
        user.setPassword(password);
        user.setRole(UserRoles.ADMIN);
        userRepository.save(user);
    }

    public LoginDTO login(LoginDTO loginDTO) {
        UserDetails user = userRepository.findByUsername(loginDTO.username());
              if (user == null) {throw new InvalidLoginCredentialsException("User or Password invalid.");}
        if (!loginDTO.password().equals(user.getPassword())) {
            throw new InvalidLoginCredentialsException("User or Password invalid.");
        }
        return loginDTO;
    }

    @Transactional
    public User updateUsername(Long id, String newUsername) {
        User entity = userRepository.getReferenceById(id);
        entity.setUsername(newUsername);
        return userRepository.save(entity);
    }

    @Transactional
    public void updatePassword(Long id, String newPassword) {
        User entity = userRepository.getReferenceById(id);
        //entity.setPassword(passwordEncoder.encode(newPassword));
        entity.setPassword(newPassword);
        userRepository.save(entity);
    }


}
