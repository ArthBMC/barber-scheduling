package com.barber.schedule.resources;

import com.barber.schedule.entities.Barber;
import com.barber.schedule.services.BarberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/barbers")
public class BarberResource {

    @Autowired
    private BarberService barberService;

    @GetMapping
    public ResponseEntity<List<Barber>> findAll(){
        List<Barber> Barbers = barberService.findAll();
        return ResponseEntity.ok().body(Barbers);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Barber> findById(@PathVariable Long id){
        Barber obj = barberService.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Barber> update(@PathVariable Long id, @RequestBody Barber obj){
        obj = barberService.update(id, obj);
        return ResponseEntity.ok().body(obj);
    }


}

