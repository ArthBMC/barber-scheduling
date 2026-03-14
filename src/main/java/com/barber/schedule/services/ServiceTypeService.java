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
    private ServiceTypeRepository serviceTypeRepository;

    public List<ServiceType> findAll(){
        return serviceTypeRepository.findAll();
    }

    public ServiceType findById(Long id){
        Optional<ServiceType> obj = serviceTypeRepository.findById(id);
        return obj.get();
    }

    public ServiceType insert(ServiceType obj){
        return serviceTypeRepository.save(obj);
    }

    public void delete(Long id){ serviceTypeRepository.deleteById(id);}

    public ServiceType updatePrice(Long id, ServiceType obj){
        ServiceType old = serviceTypeRepository.getReferenceById(id);
        old.setPrice(obj.getPrice());
        return serviceTypeRepository.save(old);
    }

}
