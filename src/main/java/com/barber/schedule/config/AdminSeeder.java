package com.barber.schedule.config;

import com.barber.schedule.entities.User;
import com.barber.schedule.entities.enums.UserRoles;
import com.barber.schedule.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AdminSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Value("${app.admin.username}")
    private String adminUsername;

    @Value("${app.admin.password}")
    private String adminPassword;

    @Override
    public void run(String... args) throws Exception {
        if(!userRepository.existsByUsername(adminUsername)){

            User admin = new User();
            admin.setUsername(adminUsername);
            admin.setPassword(adminPassword);
            admin.setRole(UserRoles.ADMIN);

            userRepository.save(admin);
            System.out.println("Admin started successfully!");

        }



    }
}
