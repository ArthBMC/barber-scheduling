package com.barber.schedule.entities.enums;

import lombok.Getter;

@Getter
public enum BookingStatus {

    WAITING_CONFIRMATION(1),
    CONFIRMED(2),
    CONCLUDED(3),
    CANCELED(4);

    private final int code;

    BookingStatus(int code) {
        this.code = code;
    }

    public static BookingStatus valueOf(int code) {
        for (BookingStatus value : BookingStatus.values()) {
            if (value.getCode() == code) {
                return value;
            }
        }
        throw new IllegalArgumentException("Invalid OrderStatus code");
    }

 }
