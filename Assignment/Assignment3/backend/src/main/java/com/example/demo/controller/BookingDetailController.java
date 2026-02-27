package com.example.demo.controller;

import com.example.demo.entity.BookingDetail;
import com.example.demo.entity.BookingDetailId;
import com.example.demo.service.BookingDetailService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
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
@RequestMapping("/api/booking-details")
public class BookingDetailController {
    private final BookingDetailService bookingDetailService;

    public BookingDetailController(BookingDetailService bookingDetailService) {
        this.bookingDetailService = bookingDetailService;
    }

    @GetMapping
    public List<BookingDetail> getAll() {
        return bookingDetailService.findAll();
    }

    @GetMapping("/{bookingId}/{roomId}")
    public BookingDetail getById(@PathVariable Integer bookingId, @PathVariable Integer roomId) {
        BookingDetailId id = new BookingDetailId();
        id.setBookingReservationId(bookingId);
        id.setRoomId(roomId);
        return bookingDetailService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BookingDetail create(@Valid @RequestBody BookingDetail bookingDetail) {
        return bookingDetailService.save(bookingDetail);
    }

    @PutMapping("/{bookingId}/{roomId}")
    public BookingDetail update(@PathVariable Integer bookingId,
                                @PathVariable Integer roomId,
                                @Valid @RequestBody BookingDetail bookingDetail) {
        BookingDetailId id = new BookingDetailId();
        id.setBookingReservationId(bookingId);
        id.setRoomId(roomId);
        return bookingDetailService.update(id, bookingDetail);
    }

    @DeleteMapping("/{bookingId}/{roomId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer bookingId, @PathVariable Integer roomId) {
        BookingDetailId id = new BookingDetailId();
        id.setBookingReservationId(bookingId);
        id.setRoomId(roomId);
        bookingDetailService.delete(id);
    }
}