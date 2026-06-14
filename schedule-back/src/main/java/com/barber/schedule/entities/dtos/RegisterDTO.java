package com.barber.schedule.entities.dtos;

import com.barber.schedule.entities.enums.UserRoles;

public record RegisterDTO(String name, String avatarUrl, String username, String password, UserRoles role){
}
