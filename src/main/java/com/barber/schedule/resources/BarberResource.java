package com.barber.schedule.resources;

import com.barber.schedule.entities.Barber;
import com.barber.schedule.services.BarberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
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

    @PostMapping
    public ResponseEntity<Barber> insert(@RequestBody Barber obj){
        obj = barberService.insert(obj);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).body(obj);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Barber> delete(@PathVariable Long id){
        barberService.delete(id);
        return ResponseEntity.noContent().build();
    }


}

