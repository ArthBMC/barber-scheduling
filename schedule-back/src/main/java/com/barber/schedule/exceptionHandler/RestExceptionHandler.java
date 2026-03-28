package com.barber.schedule.exceptionHandler;

import com.barber.schedule.exceptions.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<RestExceptionMessage> NotFoundExceptionHandler (NotFoundException exception){
        RestExceptionMessage threatResponse = new RestExceptionMessage(HttpStatus.NOT_FOUND, exception.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(threatResponse);
    }

    @ExceptionHandler(ExistentUsernameException.class)
    public ResponseEntity<RestExceptionMessage> ExistentUsernameException (ExistentUsernameException exception){
        RestExceptionMessage threatResponse = new RestExceptionMessage(HttpStatus.CONFLICT, exception.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(threatResponse);
    }

    @ExceptionHandler(InvalidLoginCredentialsException.class)
    public ResponseEntity<RestExceptionMessage> InvalidLoginCredentialsException (InvalidLoginCredentialsException exception){
        RestExceptionMessage threatResponse = new RestExceptionMessage(HttpStatus.UNAUTHORIZED, exception.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(threatResponse);
    }

    @ExceptionHandler(InvalidTimeException.class)
    public ResponseEntity<RestExceptionMessage> InvalidTimeException (InvalidTimeException exception){
        RestExceptionMessage threatResponse = new RestExceptionMessage(HttpStatus.BAD_REQUEST, exception.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(threatResponse);
    }

    @ExceptionHandler(PastDateException.class)
    public ResponseEntity<RestExceptionMessage> PastDateException (PastDateException exception){
        RestExceptionMessage threatResponse = new RestExceptionMessage(HttpStatus.BAD_REQUEST, exception.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(threatResponse);
    }

    @ExceptionHandler(TokenGenerateException.class)
    public ResponseEntity<RestExceptionMessage> TokenGenerateException (TokenGenerateException exception){
        RestExceptionMessage threatResponse = new RestExceptionMessage(HttpStatus.INTERNAL_SERVER_ERROR, exception.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(threatResponse);
    }

    @ExceptionHandler(UpdateCancelledBookingException.class)
    public ResponseEntity<RestExceptionMessage> UpdateCancelledBookingException (UpdateCancelledBookingException exception){
        RestExceptionMessage threatResponse = new RestExceptionMessage(HttpStatus.CONFLICT, exception.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(threatResponse);
    }

}


