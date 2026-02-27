package com.example.demo.repository;

import com.example.demo.entity.BookingDetail;
import com.example.demo.entity.BookingDetailId;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingDetailRepository extends JpaRepository<BookingDetail, BookingDetailId> {
    @Query("select count(bd) > 0 from BookingDetail bd where bd.room.id = :roomId")
    boolean existsByRoomId(@Param("roomId") Integer roomId);
}