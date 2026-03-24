package com.barber.schedule.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "tb_barber_block")
public class BarberBlock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "barber_id")
    private Barber barber;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    public BarberBlock (){}

}
