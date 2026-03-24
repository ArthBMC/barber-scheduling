package com.barber.schedule.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "tb_barber")
public class Barber implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String avatarUrl;

    @JsonIgnore
    @OneToMany(mappedBy = "barber")
    private List<Booking> bookings;

    @OneToMany(mappedBy = "barber")
    private List<BarberSchedule> barberSchedule;

    @OneToMany(mappedBy = "barber")
    private List<BarberBlock> barberBlocks;

    public Barber() {}

    public Barber(String name, String avatarUrl) {
        this.name = name;
        this.avatarUrl = avatarUrl;
    }

}
