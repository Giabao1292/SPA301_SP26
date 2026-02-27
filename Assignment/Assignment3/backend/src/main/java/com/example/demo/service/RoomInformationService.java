package com.example.demo.service;

import com.example.demo.entity.RoomInformation;
import com.example.demo.repository.RoomInformationRepository;
import com.example.demo.repository.BookingDetailRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class RoomInformationService {
    private final RoomInformationRepository roomInformationRepository;
    private final BookingDetailRepository bookingDetailRepository;

    public RoomInformationService(RoomInformationRepository roomInformationRepository,
                                  BookingDetailRepository bookingDetailRepository) {
        this.roomInformationRepository = roomInformationRepository;
        this.bookingDetailRepository = bookingDetailRepository;
    }

    public List<RoomInformation> findAll() {
        return roomInformationRepository.findAll();
    }

    public RoomInformation findById(Integer id) {
        return roomInformationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Room not found: " + id));
    }

    public RoomInformation save(RoomInformation roomInformation) {
        return roomInformationRepository.save(roomInformation);
    }

    public RoomInformation update(Integer id, RoomInformation roomInformation) {
        RoomInformation existing = findById(id);
        existing.setRoomNumber(roomInformation.getRoomNumber());
        existing.setDetailDescription(roomInformation.getDetailDescription());
        existing.setMaxCapacity(roomInformation.getMaxCapacity());
        existing.setRoomType(roomInformation.getRoomType());
        existing.setStatus(roomInformation.getStatus());
        existing.setPricePerDay(roomInformation.getPricePerDay());
        return roomInformationRepository.save(existing);
    }

    public void delete(Integer id) {
        if (bookingDetailRepository.existsByRoomId(id)) {
            RoomInformation existing = findById(id);
            existing.setStatus(0);
            roomInformationRepository.save(existing);
            return;
        }
        roomInformationRepository.deleteById(id);
    }
}