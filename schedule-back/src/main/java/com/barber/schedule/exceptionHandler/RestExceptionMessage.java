package com.barber.schedule.exceptionHandler;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Setter
@Getter
@AllArgsConstructor
public class RestExceptionMessage {
    private HttpStatus status;
    private String message;
}
