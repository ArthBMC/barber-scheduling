package com.barber.schedule.resources;

import com.barber.schedule.entities.User;
import com.barber.schedule.entities.dtos.LoginDTO;
import com.barber.schedule.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/users")
public class UserResource {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> findAll(){
        List<User> users = userService.findAll();
        return ResponseEntity.ok().body(users);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<User> findById(@PathVariable Long id){
        User obj = userService.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    /*@PostMapping
    public ResponseEntity<User> registerNewBarber(@RequestBody BarberDTO barberDTO){
        User newBarber = userService.registerNewBarber(barberDTO);
        return ResponseEntity.ok().body(newBarber);
    }*/

    @PostMapping(value = "/login")
    public ResponseEntity<LoginDTO> login(@RequestBody LoginDTO loginDTO){
        LoginDTO response = userService.login(loginDTO);
        return ResponseEntity.ok().body(loginDTO);
    }

    @PatchMapping(value = "/{id}/username")
    public ResponseEntity<User> updateUsername(@PathVariable Long id, @RequestBody LoginDTO loginDTO){
        User updatedUser = userService.updateUsername(id, loginDTO.username());
        return ResponseEntity.ok().body(updatedUser);
    }

    @PatchMapping(value = "/{id}/password")
    public ResponseEntity<User> updatePassword(@PathVariable Long id, @RequestBody LoginDTO loginDTO){
        userService.updatePassword(id, loginDTO.password());
        return ResponseEntity.noContent().build();
    }

}

