package com.example.demo.service;

import com.example.demo.entity.BookingReservation;
import com.example.demo.repository.BookingReservationRepository;
import com.example.demo.service.CustomerService;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class BookingReservationService {
    private final BookingReservationRepository bookingReservationRepository;
    private final CustomerService customerService;

    public BookingReservationService(BookingReservationRepository bookingReservationRepository,
                                     CustomerService customerService) {
        this.bookingReservationRepository = bookingReservationRepository;
        this.customerService = customerService;
    }

    public List<BookingReservation> findAll() {
        return bookingReservationRepository.findAll();
    }

    public List<BookingReservation> findByCustomerEmail(String email) {
        return bookingReservationRepository.findByCustomer_EmailAddress(email);
    }

    public BookingReservation findById(Integer id) {
        return bookingReservationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found: " + id));
    }

    public BookingReservation save(BookingReservation bookingReservation) {
        if (bookingReservation.getBookingDetails() != null) {
            bookingReservation.getBookingDetails().forEach(detail -> detail.setBookingReservation(bookingReservation));
        }
        return bookingReservationRepository.save(bookingReservation);
    }

    public BookingReservation saveForCustomer(String email, BookingReservation bookingReservation) {
        bookingReservation.setCustomer(customerService.findByEmail(email));
        if (bookingReservation.getBookingDetails() != null) {
            bookingReservation.getBookingDetails().forEach(detail -> detail.setBookingReservation(bookingReservation));
        }
        return bookingReservationRepository.save(bookingReservation);
    }

    public BookingReservation update(Integer id, BookingReservation bookingReservation) {
        BookingReservation existing = findById(id);
        existing.setBookingDate(bookingReservation.getBookingDate());
        existing.setTotalPrice(bookingReservation.getTotalPrice());
        existing.setCustomer(bookingReservation.getCustomer());
        existing.setStatus(bookingReservation.getStatus());
        return bookingReservationRepository.save(existing);
    }

    public void delete(Integer id) {
        bookingReservationRepository.deleteById(id);
    }
}