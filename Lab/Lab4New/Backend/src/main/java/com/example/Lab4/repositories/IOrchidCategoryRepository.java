package com.example.Lab4.repositories;

import com.example.Lab4.pojos.Category;
import com.example.Lab4.pojos.Orchid;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IOrchidCategoryRepository extends JpaRepository<Category, Integer> {
}
