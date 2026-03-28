package com.barber.schedule.exceptions;

public class UpdateCancelledBookingException extends RuntimeException{

    public UpdateCancelledBookingException() { super("It's not possible to change a status from a booking cancelled"); }

    public UpdateCancelledBookingException(String message){
        super(message);
    }

}
