package com.barber.schedule.resources;

import com.barber.schedule.config.security.TokenService;
import com.barber.schedule.entities.User;
import com.barber.schedule.entities.dtos.LoginDTO;
import com.barber.schedule.entities.dtos.LoginResponseDTO;
import com.barber.schedule.entities.dtos.RegisterDTO;
import com.barber.schedule.entities.enums.UserRoles;
import com.barber.schedule.repositories.UserRepository;
import com.barber.schedule.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
@RequestMapping("auth")
public class AuthorizationResource {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private UserService userService;

    @PostMapping("/logins")
    public ResponseEntity<LoginResponseDTO> login (@RequestBody @Valid LoginDTO login){
        var usernamePassword = new UsernamePasswordAuthenticationToken(login.username(), login.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((User) Objects.requireNonNull(auth.getPrincipal()));
        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody @Valid RegisterDTO registerDTO){
        if (this.userRepository.findByUsername(registerDTO.username()) != null)
            return ResponseEntity.badRequest().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(registerDTO.password());
        if (registerDTO.role() != UserRoles.BARBER){
            userService.createAdmin(registerDTO.username(), encryptedPassword);
        }else userService.registerNewBarber(registerDTO, encryptedPassword);
        return ResponseEntity.ok().build();
    }



}
