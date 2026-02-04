package com.example.Assignment2.service;

import com.example.Assignment2.dto.NewsArticleRequest;
import com.example.Assignment2.dto.NewsArticleResponse;
import com.example.Assignment2.dto.TagResponse;
import com.example.Assignment2.model.Category;
import com.example.Assignment2.model.NewsArticle;
import com.example.Assignment2.model.NewsTag;
import com.example.Assignment2.model.SystemAccount;
import com.example.Assignment2.model.Tag;
import com.example.Assignment2.repository.CategoryRepository;
import com.example.Assignment2.repository.NewsArticleRepository;
import com.example.Assignment2.repository.NewsTagRepository;
import com.example.Assignment2.repository.SystemAccountRepository;
import com.example.Assignment2.repository.TagRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class NewsArticleService {
    private final NewsArticleRepository newsArticleRepository;
    private final NewsTagRepository newsTagRepository;
    private final CategoryRepository categoryRepository;
    private final SystemAccountRepository systemAccountRepository;
    private final TagRepository tagRepository;

    public NewsArticleService(NewsArticleRepository newsArticleRepository,
                              NewsTagRepository newsTagRepository,
                              CategoryRepository categoryRepository,
                              SystemAccountRepository systemAccountRepository,
                              TagRepository tagRepository) {
        this.newsArticleRepository = newsArticleRepository;
        this.newsTagRepository = newsTagRepository;
        this.categoryRepository = categoryRepository;
        this.systemAccountRepository = systemAccountRepository;
        this.tagRepository = tagRepository;
    }

    public List<NewsArticleResponse> getAll(String keyword) {
        List<NewsArticle> articles = (keyword == null || keyword.isBlank())
                ? newsArticleRepository.findAll()
                : newsArticleRepository.findByNewsTitleContainingIgnoreCase(keyword);
        return articles.stream().map(this::toResponse).toList();
    }

    public List<NewsArticleResponse> getActive() {
        return newsArticleRepository.findByNewsStatusTrue().stream().map(this::toResponse).toList();
    }

    public List<NewsArticleResponse> getByAuthor(Integer accountId) {
        return newsArticleRepository.findByCreatedByID_Id(accountId).stream().map(this::toResponse).toList();
    }

    public NewsArticleResponse getById(Integer id) {
        return newsArticleRepository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy bài viết"));
    }

    public NewsArticleResponse create(NewsArticleRequest request) {
        NewsArticle article = new NewsArticle();
        applyRequest(article, request, true);
        NewsArticle saved = newsArticleRepository.save(article);
        syncTags(saved, request.getTagIds());
        return toResponse(saved);
    }

    public NewsArticleResponse update(Integer id, NewsArticleRequest request) {
        NewsArticle article = newsArticleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy bài viết"));
        applyRequest(article, request, false);
        NewsArticle saved = newsArticleRepository.save(article);
        syncTags(saved, request.getTagIds());
        return toResponse(saved);
    }

    public void delete(Integer id) {
        newsTagRepository.deleteByNewsArticle_Id(id);
        newsArticleRepository.deleteById(id);
    }

    private void applyRequest(NewsArticle article, NewsArticleRequest request, boolean isCreate) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy danh mục"));
        SystemAccount createdBy = systemAccountRepository.findById(request.getCreatedById())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy tài khoản tạo"));

        article.setNewsTitle(request.getNewsTitle());
        article.setHeadline(request.getHeadline());
        article.setNewsContent(request.getNewsContent());
        article.setNewsSource(request.getNewsSource());
        article.setCategoryID(category);
        article.setNewsStatus(request.getNewsStatus());
        article.setCreatedByID(createdBy);
        if (isCreate) {
            article.setCreatedDate(Instant.now());
        }

        if (request.getUpdatedById() != null) {
            SystemAccount updatedBy = systemAccountRepository.findById(request.getUpdatedById())
                    .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy tài khoản cập nhật"));
            article.setUpdatedByID(updatedBy);
        }
        article.setModifiedDate(Instant.now());

    }

    private void syncTags(NewsArticle article, List<Integer> tagIds) {
        newsTagRepository.deleteByNewsArticle_Id(article.getId());
        if (tagIds == null) {
            return;
        }
        for (Integer tagId : tagIds) {
            Tag tag = tagRepository.findById(tagId)
                    .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy tag"));
            NewsTag newsTag = new NewsTag();
            newsTag.setNewsArticle(article);
            newsTag.setTag(tag);
            newsTagRepository.save(newsTag);
        }
    }

    private NewsArticleResponse toResponse(NewsArticle article) {
        List<TagResponse> tags = newsTagRepository.findByNewsArticle_Id(article.getId()).stream()
                .map(NewsTag::getTag)
                .filter(tag -> tag != null)
                .map(tag -> TagResponse.builder()
                        .id(tag.getId())
                        .tagName(tag.getTagName())
                        .build())
                .toList();
        return NewsArticleResponse.builder()
                .id(article.getId())
                .newsTitle(article.getNewsTitle())
                .headline(article.getHeadline())
                .newsContent(article.getNewsContent())
                .newsSource(article.getNewsSource())
                .categoryId(article.getCategoryID() != null ? article.getCategoryID().getId() : null)
                .categoryName(article.getCategoryID() != null ? article.getCategoryID().getCategoryName() : null)
                .newsStatus(article.getNewsStatus())
                .createdById(article.getCreatedByID() != null ? article.getCreatedByID().getId() : null)
                .createdByName(article.getCreatedByID() != null ? article.getCreatedByID().getAccountName() : null)
                .updatedById(article.getUpdatedByID() != null ? article.getUpdatedByID().getId() : null)
                .updatedByName(article.getUpdatedByID() != null ? article.getUpdatedByID().getAccountName() : null)
                .createdDate(article.getCreatedDate())
                .modifiedDate(article.getModifiedDate())
                .tags(tags)
                .build();
    }
}