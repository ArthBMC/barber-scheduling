package com.barber.schedule.entities;

import com.barber.schedule.entities.enums.BookingStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

@Getter
@Setter
@JsonPropertyOrder({ "id", "moment", "bookedPrice", "bookedDuration", "serviceType" })
@Entity
@Table(name = "tb_booking")
public class Booking implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "GMT")
    private LocalDateTime moment;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @ManyToOne
    @JoinColumn(name = "barber_id")
    private Barber barber;

    private Double bookedPrice;
    private Integer bookedDuration;
    @ManyToOne
    @JoinColumn(name = "id_service")
    private ServiceType serviceType;

    private BookingStatus bookingStatus;

    public Booking(){}

    public Booking(Long id, LocalDateTime moment, BookingStatus bookingStatus, Client client, ServiceType serviceType, Barber barber) {
        this.id = id;
        this.moment = moment;
        this.client = client;
        setBookingStatus(bookingStatus);
        this.serviceType = serviceType;
        this.barber = barber;
    }

    public void setBookingStatus(BookingStatus bookingStatus){
        if(bookingStatus != null) {
            this.bookingStatus = bookingStatus;
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
