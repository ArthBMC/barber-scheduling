package com.barber.schedule.repositories;

import com.barber.schedule.entities.Booking;
import com.barber.schedule.entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

}
