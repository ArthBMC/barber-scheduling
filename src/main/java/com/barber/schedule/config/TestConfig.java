package com.barber.schedule.config;

import com.barber.schedule.entities.Barber;
import com.barber.schedule.entities.Booking;
import com.barber.schedule.entities.Client;
import com.barber.schedule.entities.ServiceType;
import com.barber.schedule.entities.enums.BookingStatus;
import com.barber.schedule.repositories.BookingRepository;
import com.barber.schedule.repositories.ClientRepository;
import com.barber.schedule.repositories.ServiceTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.time.Instant;
import java.util.Arrays;

@Configuration
@Profile("test")
public class TestConfig implements CommandLineRunner {

    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private ServiceTypeRepository serviceTypeRepository;

    @Override
    public void run(String... args) throws Exception {

        Client c1 = new Client(null, "Arthur", "40028922");
        Client c2 = new Client(null, "Raul", "5555922");
        clientRepository.saveAll(Arrays.asList(c1, c2));

        ServiceType s1 = new ServiceType(null, "Corte simples", "Corte na máquina e na tesoura", 40.0, 10);
        ServiceType s2 = new ServiceType(null, "Barba", "Barba feita", 15.0, 20);
        serviceTypeRepository.saveAll(Arrays.asList(s1, s2));

        Booking b1 = new Booking(null, Instant.parse("2019-07-21T03:42:10Z"), BookingStatus.WAITING_CONFIRMATION, c1, s1, new Barber("Pedro", "aasdad"));
        Booking b2 = new Booking(null, Instant.parse("2019-07-21T03:42:10Z"), BookingStatus.CONCLUDED, c1, s1, new Barber("Diego", "gsfsdsdf"));
        Booking b3 = new Booking(null, Instant.parse("2019-07-21T03:42:10Z"), BookingStatus.CONFIRMED, c2, s2, new Barber("Pedro", "aasdad"));
        bookingRepository.saveAll(Arrays.asList(b1, b2, b3));


    }
}
