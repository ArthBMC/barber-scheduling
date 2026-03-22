package com.barber.schedule.entities.dtos;

import java.time.DayOfWeek;
import java.time.LocalTime;

public record BarberScheduleDTO(DayOfWeek dayOfWeek, LocalTime startTime, LocalTime endTime){
}
