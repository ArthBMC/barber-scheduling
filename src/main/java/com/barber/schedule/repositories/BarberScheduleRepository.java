package com.barber.schedule.repositories;

import com.barber.schedule.entities.BarberSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.DayOfWeek;
import java.util.List;

@Repository
public interface BarberScheduleRepository extends JpaRepository<BarberSchedule, Long> {

     List<BarberSchedule> findByBarberIdAndDayOfWeek(Long id, DayOfWeek day);

     void deleteByBarberId(Long barberId);

}
