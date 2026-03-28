package com.barber.schedule.exceptions;

public class ExistentUsernameException extends RuntimeException{

    public ExistentUsernameException(String message){
        super(message);
    }

}
