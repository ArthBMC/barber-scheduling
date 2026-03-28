package com.barber.schedule.services;

import com.barber.schedule.entities.Client;
import com.barber.schedule.exceptions.NotFoundException;
import com.barber.schedule.repositories.ClientRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
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
        return obj.orElseThrow(() -> new NotFoundException("Client with id " + id + " not found"));
    }

    @Transactional
    public Client findOrCreate(String name, String phone){
        return clientRepository.findByPhone(phone).
                orElseGet(() -> clientRepository.save(new Client(name, phone)));
    }

}
