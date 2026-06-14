package com.barber.schedule.entities.enums;

import lombok.Getter;

@Getter
public enum UserRoles {

    ADMIN ("admin"),
    BARBER("user");

    private String role;

    UserRoles(String role){this.role = role;}

}
