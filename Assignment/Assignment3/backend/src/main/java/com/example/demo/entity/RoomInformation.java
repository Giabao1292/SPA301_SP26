package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "RoomInformation")
public class RoomInformation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RoomID")
    private Integer id;

    @NotBlank
    @Size(max = 20)
    @Column(name = "RoomNumber", nullable = false, unique = true, length = 20)
    private String roomNumber;

    @Size(max = 255)
    @Column(name = "RoomDetailDescription", length = 255)
    private String detailDescription;

    @PositiveOrZero
    @Column(name = "RoomMaxCapacity")
    private Integer maxCapacity;

    @ManyToOne
    @JoinColumn(name = "RoomTypeID")
    private RoomType roomType;

    @Column(name = "RoomStatus")
    private Integer status;

    @Column(name = "RoomPricePerDay", precision = 10, scale = 2)
    private BigDecimal pricePerDay;

    @JsonIgnore
    @OneToMany(mappedBy = "room")
    private Set<BookingDetail> bookingDetails = new HashSet<>();

    @PrePersist
    public void prePersist() {
        if (status == null) {
            status = 1;
        }
    }
}