package com.barber.schedule.services;

import com.barber.schedule.entities.ServiceType;
import com.barber.schedule.repositories.ServiceTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceTypeService {

    @Autowired
    private ServiceTypeRepository ServiceTypeRepository;

    public List<ServiceType> findAll(){
        return ServiceTypeRepository.findAll();
    }

    public ServiceType findById(Long id){
        Optional<ServiceType> obj = ServiceTypeRepository.findById(id);
        return obj.get();
    }

    public ServiceType insert(ServiceType obj){
        return ServiceTypeRepository.save(obj);
    }

}
