package com.barber.schedule.entities;

import com.barber.schedule.entities.enums.BookingStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

@Getter
@Setter
@Entity
@Table(name = "tb_booking")
public class Booking implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "GMT")
    private Instant moment;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @ManyToOne
    @JoinColumn(name = "id_service")
    private ServiceType serviceType;

    private Integer bookingStatus;

    public Booking(){}

    public Booking(Long id, Instant moment, BookingStatus bookingStatus, Client client, ServiceType serviceType) {
        this.id = id;
        this.moment = moment;
        this.client = client;
        setBookingStatus(bookingStatus);
        this.serviceType = serviceType;
    }

    public BookingStatus getBookingStatus(){
        return BookingStatus.valueOf(bookingStatus);
    }

    public void setBookingStatus(BookingStatus bookingStatus){
        if(bookingStatus != null) {
            this.bookingStatus = bookingStatus.getCode();
        }
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Booking booking = (Booking) o;
        return Objects.equals(id, booking.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
