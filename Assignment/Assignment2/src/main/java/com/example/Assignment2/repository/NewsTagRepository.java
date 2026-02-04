package com.example.Assignment2.repository;

import com.example.Assignment2.model.NewsTag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NewsTagRepository extends JpaRepository<NewsTag, Integer> {
    List<NewsTag> findByNewsArticle_Id(Integer newsArticleId);

    void deleteByNewsArticle_Id(Integer newsArticleId);
}