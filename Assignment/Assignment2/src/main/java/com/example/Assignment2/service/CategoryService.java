package com.example.Assignment2.service;

import com.example.Assignment2.dto.CategoryRequest;
import com.example.Assignment2.dto.CategoryResponse;
import com.example.Assignment2.model.Category;
import com.example.Assignment2.repository.CategoryRepository;
import com.example.Assignment2.repository.NewsArticleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final NewsArticleRepository newsArticleRepository;

    public CategoryService(CategoryRepository categoryRepository,
                           NewsArticleRepository newsArticleRepository) {
        this.categoryRepository = categoryRepository;
        this.newsArticleRepository = newsArticleRepository;
    }

    public List<CategoryResponse> getAll(String keyword) {
        List<Category> categories = (keyword == null || keyword.isBlank())
                ? categoryRepository.findAll()
                : categoryRepository.findByCategoryNameContainingIgnoreCase(keyword);
        return categories.stream().map(this::toResponse).toList();
    }

    public List<CategoryResponse> getActive() {
        return categoryRepository.findByStatusTrue().stream().map(this::toResponse).toList();
    }

    public CategoryResponse getById(Integer id) {
        return categoryRepository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy danh mục"));
    }

    public CategoryResponse create(CategoryRequest request) {
        Category category = new Category();
        applyRequest(category, request);
        return toResponse(categoryRepository.save(category));
    }

    public CategoryResponse update(Integer id, CategoryRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy danh mục"));
        applyRequest(category, request);
        return toResponse(categoryRepository.save(category));
    }

    public void delete(Integer id) {
        long articleCount = newsArticleRepository.countByCategoryID_Id(id);
        if (articleCount > 0) {
            throw new IllegalStateException("Không thể xóa danh mục đã có bài viết");
        }
        categoryRepository.deleteById(id);
    }

    private void applyRequest(Category category, CategoryRequest request) {
        Category parent = null;
        if (request.getParentCategoryId() != null) {
            parent = categoryRepository.findById(request.getParentCategoryId())
                    .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy danh mục cha"));
        }
        category.setCategoryName(request.getCategoryName());
        category.setCategoryDesc(request.getCategoryDesc());
        category.setStatus(request.getStatus());
        category.setParentCategory(parent);
    }

    private CategoryResponse toResponse(Category category) {
        return CategoryResponse.builder()
                .id(category.getId())
                .categoryName(category.getCategoryName())
                .categoryDesc(category.getCategoryDesc())
                .parentCategoryId(category.getParentCategory() != null ? category.getParentCategory().getId() : null)
                .status(category.getStatus())
                .build();
    }
}