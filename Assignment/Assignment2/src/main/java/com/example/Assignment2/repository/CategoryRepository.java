package com.example.Assignment2.repository;

import com.example.Assignment2.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    List<Category> findByCategoryNameContainingIgnoreCase(String keyword);

    List<Category> findByStatusTrue();
}