package com.example.Lab4.controllers;

import com.example.Lab4.pojos.Category;
import com.example.Lab4.repositories.IOrchidCategoryRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    private final IOrchidCategoryRepository repo;

    public CategoryController(IOrchidCategoryRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Category> getAll() {
        return repo.findAll();
    }
}
