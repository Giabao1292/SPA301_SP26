package com.example.demo.service;

import com.example.demo.entity.BookingDetail;
import com.example.demo.entity.BookingDetailId;
import com.example.demo.repository.BookingDetailRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class BookingDetailService {
    private final BookingDetailRepository bookingDetailRepository;

    public BookingDetailService(BookingDetailRepository bookingDetailRepository) {
        this.bookingDetailRepository = bookingDetailRepository;
    }

    public List<BookingDetail> findAll() {
        return bookingDetailRepository.findAll();
    }

    public BookingDetail findById(BookingDetailId id) {
        return bookingDetailRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Booking detail not found"));
    }

    public BookingDetail save(BookingDetail bookingDetail) {
        return bookingDetailRepository.save(bookingDetail);
    }

    public BookingDetail update(BookingDetailId id, BookingDetail bookingDetail) {
        BookingDetail existing = findById(id);
        existing.setBookingReservation(bookingDetail.getBookingReservation());
        existing.setRoom(bookingDetail.getRoom());
        existing.setStartDate(bookingDetail.getStartDate());
        existing.setEndDate(bookingDetail.getEndDate());
        existing.setActualPrice(bookingDetail.getActualPrice());
        return bookingDetailRepository.save(existing);
    }

    public void delete(BookingDetailId id) {
        bookingDetailRepository.deleteById(id);
    }
}