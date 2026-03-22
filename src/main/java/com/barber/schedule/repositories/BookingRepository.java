package com.barber.schedule.repositories;

import com.barber.schedule.entities.Booking;
import com.barber.schedule.entities.enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByClientPhoneOrderByMomentDesc(String phone);

    List<Booking> findByBarberIdAndMomentBetween(Long barberId, LocalDateTime start, LocalDateTime end);

    List<Booking> findByBarberIdAndMomentBetweenAndBookingStatusNot(Long barber, LocalDateTime startOfDay, LocalDateTime endOfDay, BookingStatus bookingStatus);
}
