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

    public Client findByPhone(String phone){
        Optional<Client> obj = clientRepository.findByPhone(phone);
        return obj.get();
    }

    public Client findOrCreate(String name, String phone){
        return clientRepository.findByPhone(phone).orElse(clientRepository.save(new Client(name, phone)));
    }

    public Client insert(Client obj){
        clientRepository.findByPhone(obj.getPhone()).ifPresent(c -> {
            throw new RuntimeException("This client already exists");
        });
        return clientRepository.save(obj);
    }

    public void delete(Long id){
        clientRepository.deleteById(id);
    }

}
