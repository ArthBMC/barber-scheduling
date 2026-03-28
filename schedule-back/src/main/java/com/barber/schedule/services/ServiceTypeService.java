package com.barber.schedule.services;

import com.barber.schedule.entities.ServiceType;
import com.barber.schedule.exceptions.NotFoundException;
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
        return obj.orElseThrow(() -> new NotFoundException("Service with id " + id + " not found"));
    }

    public ServiceType insert(ServiceType obj){
        return serviceTypeRepository.save(obj);
    }

    public void delete(Long id){ serviceTypeRepository.deleteById(id);}

    public ServiceType update(Long id, ServiceType obj){
        ServiceType entity = serviceTypeRepository.getReferenceById(id);
        updateData(entity, obj);
        return serviceTypeRepository.save(entity);
    }

    public void updateData(ServiceType entity, ServiceType obj){
        if (obj.getName() != null){
            entity.setName(obj.getName());
        }
        if (obj.getDescription() != null){
            entity.setDescription(obj.getDescription());
        }
        if (obj.getPrice() != null){
            entity.setPrice(obj.getPrice());
        }
        if (obj.getDuration() != null){
            entity.setDuration(obj.getDuration());
        }
    }


}
