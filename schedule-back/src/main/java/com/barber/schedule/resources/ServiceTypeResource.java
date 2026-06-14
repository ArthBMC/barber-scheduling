package com.barber.schedule.resources;

import com.barber.schedule.entities.ServiceType;
import com.barber.schedule.entities.dtos.ServiceTypeDTO;
import com.barber.schedule.services.ServiceTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = "/services")
public class ServiceTypeResource {

    @Autowired
    private ServiceTypeService serviceTypeService;

    @GetMapping
    public ResponseEntity<List<ServiceTypeDTO>> findAll(){
        List<ServiceType> serviceTypeList = serviceTypeService.findAll();
        List<ServiceTypeDTO> listDto = serviceTypeList.stream()
                .map(entity -> new ServiceTypeDTO(
                        entity.getId(),
                        entity.getName(),
                        entity.getDescription(),
                        entity.getPrice(),
                        entity.getDuration()
                ))
                .toList();
        return ResponseEntity.ok().body(listDto);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<ServiceTypeDTO> findById(@PathVariable Long id){
        ServiceType obj = serviceTypeService.findById(id);
        ServiceTypeDTO serviceTypeDTO = new ServiceTypeDTO(
                obj.getId(),
                obj.getName(),
                obj.getDescription(),
                obj.getPrice(),
                obj.getDuration()
        );
        return ResponseEntity.ok().body(serviceTypeDTO);
    }

    @PostMapping
    public ResponseEntity<ServiceTypeDTO> insert(@RequestBody ServiceTypeDTO serviceTypeDTO){
        ServiceType serviceTypeToCreate = new ServiceType(
                serviceTypeDTO.name(),
                serviceTypeDTO.description(),
                serviceTypeDTO.price(),
                serviceTypeDTO.duration()
        );
        ServiceType savedService = serviceTypeService.insert(serviceTypeToCreate);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(serviceTypeToCreate
                .getId())
                .toUri();
        ServiceTypeDTO responseDto = new ServiceTypeDTO(
                savedService.getId(),
                savedService.getName(),
                savedService.getDescription(),
                savedService.getPrice(),
                savedService.getDuration()
        );
        return ResponseEntity.created(uri).body(responseDto);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete (@PathVariable Long id){
        serviceTypeService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<ServiceTypeDTO> update(@PathVariable Long id, @RequestBody ServiceTypeDTO serviceTypeDTO){
        ServiceType serviceTypeToUpdate = new ServiceType(
                serviceTypeDTO.name(),
                serviceTypeDTO.description(),
                serviceTypeDTO.price(),
                serviceTypeDTO.duration()
        );
        ServiceType updatedService = serviceTypeService.update(id, serviceTypeToUpdate);
        ServiceTypeDTO responseDto = new ServiceTypeDTO(
                updatedService.getId(),
                updatedService.getName(),
                updatedService.getDescription(),
                updatedService.getPrice(),
                updatedService.getDuration()
        );
        return ResponseEntity.ok().body(responseDto);
    }


}

