package com.example.demo.controller;

import com.example.demo.entity.BookingReservation;
import com.example.demo.service.BookingReservationService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bookings")
public class BookingReservationController {
    private final BookingReservationService bookingReservationService;

    public BookingReservationController(BookingReservationService bookingReservationService) {
        this.bookingReservationService = bookingReservationService;
    }

    @GetMapping
    public List<BookingReservation> getAll() {
        return bookingReservationService.findAll();
    }

    @GetMapping("/{id}")
    public BookingReservation getById(@PathVariable Integer id) {
        return bookingReservationService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BookingReservation create(@Valid @RequestBody BookingReservation bookingReservation) {
        return bookingReservationService.save(bookingReservation);
    }

    @PutMapping("/{id}")
    public BookingReservation update(@PathVariable Integer id, @Valid @RequestBody BookingReservation bookingReservation) {
        return bookingReservationService.update(id, bookingReservation);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        bookingReservationService.delete(id);
    }

    @GetMapping("/me")
    public List<BookingReservation> getMyBookings(Authentication authentication) {
        return bookingReservationService.findByCustomerEmail(authentication.getName());
    }

    @PostMapping("/me")
    @ResponseStatus(HttpStatus.CREATED)
    public BookingReservation createMyBooking(@Valid @RequestBody BookingReservation bookingReservation,
                                              Authentication authentication) {
        return bookingReservationService.saveForCustomer(authentication.getName(), bookingReservation);
    }
}