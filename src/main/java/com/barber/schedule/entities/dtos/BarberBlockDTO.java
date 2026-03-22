package com.barber.schedule.entities.dtos;

import java.time.LocalDateTime;

public record BarberBlockDTO(LocalDateTime startTime, LocalDateTime endTime){
}
