package com.barber.schedule.config;

import com.barber.schedule.entities.Client;
import com.barber.schedule.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("test")
public class TestConfig implements CommandLineRunner {

    @Autowired
    private ClientRepository clientRepository;

    @Override
    public void run(String... args) throws Exception {

        Client c1 = new Client(null, "Arthur", 40028922);
        clientRepository.save(c1);
    }
}
