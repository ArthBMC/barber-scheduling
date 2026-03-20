package com.barber.schedule.config;

import com.barber.schedule.entities.User;
import com.barber.schedule.repositories.UserRepository;
import com.barber.schedule.services.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class SecurityFilter extends OncePerRequestFilter {

   @Autowired
   private TokenService tokenService;
   @Autowired
   private UserRepository userRepository;


    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {

        var token = this.recoverToken(request);

        if (token != null){
            var login = tokenService.validateToken(token);

            if(!login.isEmpty()){
                User user = userRepository.findByUsername(login)
                        .orElseThrow(() -> new RuntimeException("This user does not exists"));
                var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        filterChain.doFilter(request, response);
    }

    private String recoverToken(HttpServletRequest request){
        var authHeader = request.getHeader("Authorization");
        if(authHeader == null)return null;
        return authHeader.replace("Bearer ", "");
    }

}
