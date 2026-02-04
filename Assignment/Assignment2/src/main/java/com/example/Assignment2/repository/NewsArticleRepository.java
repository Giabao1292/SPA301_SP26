package com.example.Assignment2.repository;

import com.example.Assignment2.model.NewsArticle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NewsArticleRepository extends JpaRepository<NewsArticle, Integer> {
    List<NewsArticle> findByNewsTitleContainingIgnoreCase(String keyword);

    List<NewsArticle> findByNewsStatusTrue();

    List<NewsArticle> findByCreatedByID_Id(Integer accountId);

    long countByCategoryID_Id(Integer categoryId);

    long countByCreatedByID_Id(Integer accountId);
}