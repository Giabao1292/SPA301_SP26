package com.example.Lab4.controllers;

import com.example.Lab4.dto.request.OrchidRequestDTO;
import com.example.Lab4.pojos.Orchid;
import com.example.Lab4.services.IOrchidService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orchids")
public class OrchidController {

    private final IOrchidService service;
    public OrchidController(IOrchidService service) {
        this.service = service;
    }
    @GetMapping
    public List<Orchid> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Orchid getById(@PathVariable Integer id) {
        return service.findById(id);
    }

    @PostMapping
    public Orchid create(@RequestBody OrchidRequestDTO orchid) {
        return service.save(orchid);
    }

    @PutMapping("/{id}")
    public Orchid update(@PathVariable Integer id,
                         @RequestBody OrchidRequestDTO orchid) {
        return service.update(id, orchid);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}
