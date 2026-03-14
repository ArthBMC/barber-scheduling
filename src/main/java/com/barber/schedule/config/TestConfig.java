package com.barber.schedule.config;

import com.barber.schedule.entities.*;
import com.barber.schedule.entities.enums.BookingStatus;
import com.barber.schedule.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.time.LocalDateTime;
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
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BarberRepository barberRepository;

    @Override
    public void run(String... args) throws Exception {

        Client c1 = new Client(null, "Arthur", "40028922");
        Client c2 = new Client(null, "Raul", "5555922");
        clientRepository.saveAll(Arrays.asList(c1, c2));

        ServiceType s1 = new ServiceType(null, "Corte simples", "Corte na máquina e na tesoura", 40.0, 30);
        ServiceType s2 = new ServiceType(null, "Barba", "Barba feita", 15.0, 10);
        serviceTypeRepository.saveAll(Arrays.asList(s1, s2));

        Barber barber1 = new Barber("Diego", "gsfsdsdf");
        Barber barber2 = new Barber("Pedro", "asasasd");
        barberRepository.saveAll(Arrays.asList(barber1, barber2));

        Booking b1 = new Booking(null, LocalDateTime.parse("2019-07-21T03:42:10"), BookingStatus.WAITING_CONFIRMATION, c1, s1, barber2);
        Booking b2 = new Booking(null, LocalDateTime.parse("2019-07-21T04:42:10"), BookingStatus.CONCLUDED, c1, s1, barber1);
        Booking b3 = new Booking(null, LocalDateTime.parse("2019-07-23T05:42:10"), BookingStatus.CONFIRMED, c1, s2, barber2);
        bookingRepository.saveAll(Arrays.asList(b1, b2, b3));


    }
}
