package com.example.Lab4.services;

import com.example.Lab4.pojos.Category;
import com.example.Lab4.repositories.IOrchidCategoryRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrchidCategoryService implements IOrchidCategoryService{
    private final IOrchidCategoryRepository orchidCategoryRepository;
    public OrchidCategoryService(IOrchidCategoryRepository orchidCategoryRepository) {
        this.orchidCategoryRepository = orchidCategoryRepository;
    }
    @Override
    public List<Category> findAll() {
        return orchidCategoryRepository.findAll();
    }
}
