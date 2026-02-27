package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "Customer")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CustomerID")
    private Integer id;

    @NotBlank
    @Size(max = 100)
    @Column(name = "CustomerFullName", nullable = false, length = 100)
    private String fullName;

    @Size(max = 20)
    @Column(name = "Telephone", length = 20)
    private String telephone;

    @NotBlank
    @Email
    @Size(max = 100)
    @Column(name = "EmailAddress", nullable = false, unique = true, length = 100)
    private String emailAddress;

    @Column(name = "CustomerBirthday")
    private LocalDate birthday;

    @Column(name = "CustomerStatus")
    private Integer status;

    @NotBlank
    @Size(max = 255)
    @Column(name = "Password", nullable = false, length = 255)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @JsonIgnore
    @OneToMany(mappedBy = "customer")
    private Set<BookingReservation> bookingReservations = new HashSet<>();

    @PrePersist
    public void prePersist() {
        if (status == null) {
            status = 1;
        }
    }
}