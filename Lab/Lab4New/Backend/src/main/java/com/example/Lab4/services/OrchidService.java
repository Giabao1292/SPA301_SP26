package com.example.Lab4.services;

import com.example.Lab4.dto.request.OrchidRequestDTO;
import com.example.Lab4.pojos.Category;
import com.example.Lab4.pojos.Orchid;
import com.example.Lab4.repositories.IOrchidCategoryRepository;
import com.example.Lab4.repositories.IOrchidRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrchidService implements IOrchidService {

    private final IOrchidRepository orchidRepo;
    private final IOrchidCategoryRepository categoryRepo;
    public OrchidService(IOrchidRepository orchidRepo, IOrchidCategoryRepository categoryRepo) {
        this.orchidRepo = orchidRepo;
        this.categoryRepo = categoryRepo;
    }

    @Override
    public List<Orchid> findAll() {
        return orchidRepo.findAll();
    }

    @Override
    public Orchid findById(Integer id) {
        return orchidRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Orchid not found with id = " + id));
    }

    @Override
    public Orchid save(OrchidRequestDTO orchid) {
        Category category = categoryRepo.findById(orchid.getCategoryId()).orElseThrow();
        Orchid newOrchid = new Orchid();
        newOrchid.setName(orchid.getName());
        newOrchid.setIsAttractive(orchid.getIsAttractive());
        newOrchid.setIsNatural(orchid.getIsNatural());
        newOrchid.setOrchidDescription(orchid.getOrchidDescription());
        newOrchid.setOrchidUrl(orchid.getOrchidUrl());
        newOrchid.setCategory(category);
        return orchidRepo.save(newOrchid);
    }

    @Override
    public Orchid update(Integer id, OrchidRequestDTO orchid) {
        Orchid old = findById(id);

        old.setName(orchid.getName());
        old.setIsNatural(orchid.getIsNatural());
        old.setIsAttractive(orchid.getIsAttractive());
        old.setOrchidDescription(orchid.getOrchidDescription());
        old.setOrchidUrl(orchid.getOrchidUrl());

        Category category = categoryRepo.findById(orchid.getCategoryId()).orElseThrow();
        old.setCategory(category);

        return orchidRepo.save(old);
    }

    @Override
    public void delete(Integer id) {
        orchidRepo.deleteById(id);
    }
}
