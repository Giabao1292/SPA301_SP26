package com.example.Lab4.services;

import com.example.Lab4.dto.request.OrchidRequestDTO;
import com.example.Lab4.pojos.Orchid;
import java.util.List;

public interface IOrchidService {

    List<Orchid> findAll();

    Orchid findById(Integer id);

    Orchid save(OrchidRequestDTO orchid);

    Orchid update(Integer id, OrchidRequestDTO orchid);

    void delete(Integer id);
}
