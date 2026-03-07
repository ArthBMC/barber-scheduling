package com.barber.schedule.services;

import com.barber.schedule.entities.Client;
import com.barber.schedule.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public List<Client> findAll(){
        return clientRepository.findAll();
    }

    public Client findById(Long id){
        Optional<Client> obj = clientRepository.findById(id);
        return obj.get();
    }

    public Client insert(Client obj){
        return clientRepository.save(obj);
    }

    public void delete(Long id){
        clientRepository.deleteById(id);
    }

    public Client update(Long id, Client obj){
        Client entity = clientRepository.getReferenceById(id);
        updateData(entity, obj);
        return clientRepository.save(entity);
    }

    public void updateData(Client entity, Client obj){
        if(obj.getName() != null) {
            entity.setName(obj.getName());
        }
        if(obj.getPhone() != null) {
            entity.setPhone(obj.getPhone());
        }
    }


}
