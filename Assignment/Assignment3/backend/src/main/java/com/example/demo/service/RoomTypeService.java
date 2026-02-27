package com.example.demo.service;

import com.example.demo.entity.RoomType;
import com.example.demo.repository.RoomTypeRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class RoomTypeService {
    private final RoomTypeRepository roomTypeRepository;

    public RoomTypeService(RoomTypeRepository roomTypeRepository) {
        this.roomTypeRepository = roomTypeRepository;
    }

    public List<RoomType> findAll() {
        return roomTypeRepository.findAll();
    }

    public RoomType findById(Integer id) {
        return roomTypeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("RoomType not found: " + id));
    }

    public RoomType save(RoomType roomType) {
        return roomTypeRepository.save(roomType);
    }

    public RoomType update(Integer id, RoomType roomType) {
        RoomType existing = findById(id);
        existing.setName(roomType.getName());
        existing.setDescription(roomType.getDescription());
        existing.setNote(roomType.getNote());
        return roomTypeRepository.save(existing);
    }

    public void delete(Integer id) {
        roomTypeRepository.deleteById(id);
    }
}