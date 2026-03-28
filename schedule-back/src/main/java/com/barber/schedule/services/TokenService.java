package com.barber.schedule.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.barber.schedule.entities.User;
import com.barber.schedule.exceptions.TokenGenerateException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    @Value("${app.security.token.secret}")
    private String secretKey;

    public String generateToken(User user){

        try {

            Algorithm algorithm = Algorithm.HMAC256(secretKey);

            return JWT.create()
                    .withIssuer("schedule-back")
                    .withSubject(user.getUsername())
                    .withExpiresAt(getExpirationDate())
                    .sign(algorithm);
        }catch (JWTCreationException e){
            throw new TokenGenerateException("Failed to generate token JWT", e);
        }


    }

    public String validateToken(String token){
        try{
        Algorithm algorithm = Algorithm.HMAC256(this.secretKey);
        return JWT.require(algorithm).withIssuer("schedule-back").build().verify(token).getSubject();
        }catch (JWTVerificationException e){
            return "";
        }
    }

    private Instant getExpirationDate(){
        return LocalDateTime.now().plusMinutes(15).toInstant(ZoneOffset.of("-03:00"));
    }
}

