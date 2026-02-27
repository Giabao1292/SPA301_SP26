package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import jakarta.validation.constraints.PositiveOrZero;
import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "BookingDetail")
public class BookingDetail {
    @EmbeddedId
    private BookingDetailId id = new BookingDetailId();

    @ManyToOne
    @MapsId("bookingReservationId")
    @JoinColumn(name = "BookingReservationID")
    private BookingReservation bookingReservation;

    @ManyToOne
    @MapsId("roomId")
    @JoinColumn(name = "RoomID")
    private RoomInformation room;

    @Column(name = "StartDate")
    private LocalDate startDate;

    @Column(name = "EndDate")
    private LocalDate endDate;

    @PositiveOrZero
    @Column(name = "ActualPrice", precision = 10, scale = 2)
    private BigDecimal actualPrice;
}