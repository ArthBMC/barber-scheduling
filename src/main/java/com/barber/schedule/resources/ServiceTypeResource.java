package com.barber.schedule.resources;

import com.barber.schedule.entities.ServiceType;
import com.barber.schedule.services.ServiceTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = "/services")
public class ServiceTypeResource {

    @Autowired
    private ServiceTypeService serviceTypeService;

    @GetMapping
    public ResponseEntity<List<ServiceType>> findAll(){
        List<ServiceType> serviceTypeList = serviceTypeService.findAll();
        return ResponseEntity.ok().body(serviceTypeList);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<ServiceType> findById(@PathVariable Long id){
        ServiceType obj = serviceTypeService.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    @PostMapping
    public ResponseEntity<ServiceType> insert(@RequestBody ServiceType obj){
        obj = serviceTypeService.insert(obj);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).body(obj);
    }

}

