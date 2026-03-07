package com.barber.schedule.services;

import com.barber.schedule.entities.Client;
import com.barber.schedule.repositories.ClientRepository;
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
        return obj.get();
    }


}
