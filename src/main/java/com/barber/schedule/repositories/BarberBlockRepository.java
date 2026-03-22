package com.barber.schedule.repositories;

import com.barber.schedule.entities.BarberBlock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BarberBlockRepository extends JpaRepository<BarberBlock, Long> {

    List<BarberBlock> findByBarberIdAndStartTimeBeforeAndEndTimeAfter(Long barberId, LocalDateTime endOfDay, LocalDateTime startOfDay);

}
