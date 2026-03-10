package com.barber.schedule.repositories;

import com.barber.schedule.entities.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByClientPhoneOrderByMomentDesc(String phone);

}
