package com.barber.schedule.resources;

import com.barber.schedule.entities.Booking;
import com.barber.schedule.entities.dtos.BookingDTO;
import com.barber.schedule.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = "/bookings")
public class BookingResource {

    @Autowired
    private BookingService bookingService;

    @GetMapping
    public ResponseEntity<List<Booking>> findAll(){
        List<Booking> Bookings = bookingService.findAll();
        return ResponseEntity.ok().body(Bookings);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Booking> findById(@PathVariable Long id){
        Booking obj = bookingService.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    @PostMapping
    public ResponseEntity<Booking> insert(@RequestBody BookingDTO bookingDTO){
        Booking booking = bookingService.insert(bookingDTO);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(booking.getId()).toUri();
        return ResponseEntity.created(uri).body(booking);
    }

    @GetMapping(value = "/history")
    public ResponseEntity<List<Booking>> findHistory(@RequestParam String phone) {
        List<Booking> bookings = bookingService.findHistoryByPhone(phone);
        return ResponseEntity.ok().body(bookings);
    }

}

