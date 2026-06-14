package com.barber.schedule.entities.dtos;

public record ServiceTypeDTO(
        Long id, String name, String description, Double price, Integer duration
) {
}
