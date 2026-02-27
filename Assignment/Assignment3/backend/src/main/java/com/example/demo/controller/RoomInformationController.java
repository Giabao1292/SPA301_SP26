package com.example.demo.controller;

import com.example.demo.entity.RoomInformation;
import com.example.demo.service.RoomInformationService;
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
@RequestMapping("/api/rooms")
public class RoomInformationController {
    private final RoomInformationService roomInformationService;

    public RoomInformationController(RoomInformationService roomInformationService) {
        this.roomInformationService = roomInformationService;
    }

    @GetMapping
    public List<RoomInformation> getAll() {
        return roomInformationService.findAll();
    }

    @GetMapping("/{id}")
    public RoomInformation getById(@PathVariable Integer id) {
        return roomInformationService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RoomInformation create(@Valid @RequestBody RoomInformation roomInformation) {
        return roomInformationService.save(roomInformation);
    }

    @PutMapping("/{id}")
    public RoomInformation update(@PathVariable Integer id, @Valid @RequestBody RoomInformation roomInformation) {
        return roomInformationService.update(id, roomInformation);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        roomInformationService.delete(id);
    }
}