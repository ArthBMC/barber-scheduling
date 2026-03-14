package com.barber.schedule.entities.dtos;

import java.time.LocalDateTime;

public record BookingDTO(String clientName, String clientPhone, Long barberId, Long serviceTypeId, LocalDateTime moment) {
}
