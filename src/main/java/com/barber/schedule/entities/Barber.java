package com.barber.schedule.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@Entity
public class Barber extends User implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private String name;
    private String avatarUrl;

    @JsonIgnore
    @OneToMany(mappedBy = "barber")
    private List<Booking> bookings;

    public Barber() {}

    public Barber(String name, String avatarUrl) {
        this.name = name;
        this.avatarUrl = avatarUrl;
    }

    public Barber(Long id, String username, String password, String role, Barber barber, String name, String avatarUrl) {
        super(id, username, password, role, barber);
        this.name = name;
        this.avatarUrl = avatarUrl;
    }

}
