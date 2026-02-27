package com.example.demo.repository;

import com.example.demo.entity.BookingReservation;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingReservationRepository extends JpaRepository<BookingReservation, Integer> {
    List<BookingReservation> findByCustomer_EmailAddress(String emailAddress);
}