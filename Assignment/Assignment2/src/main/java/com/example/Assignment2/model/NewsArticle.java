package com.example.Assignment2.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Nationalized;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "NewsArticle")
public class NewsArticle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NewsArticleID", nullable = false)
    private Integer id;

    @Size(max = 255)
    @NotBlank
    @Nationalized
    @Column(name = "NewsTitle", nullable = false)
    private String newsTitle;

    @Nationalized
    @Lob
    @Column(name = "Headline")
    private String headline;

    @ColumnDefault("getdate()")
    @Column(name = "CreatedDate")
    private Instant createdDate;

    @Nationalized
    @Lob
    @Column(name = "NewsContent")
    private String newsContent;

    @Size(max = 255)
    @Nationalized
    @Column(name = "NewsSource")
    private String newsSource;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CategoryID")
    private Category categoryID;

    @NotNull
    @ColumnDefault("1")
    @Column(name = "NewsStatus")
    private Boolean newsStatus;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CreatedByID")
    private SystemAccount createdByID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UpdatedByID")
    private SystemAccount updatedByID;

    @Column(name = "ModifiedDate")
    private Instant modifiedDate;

    @OneToMany(mappedBy = "newsArticle", fetch = FetchType.LAZY)
    private Set<NewsTag> newsTags = new LinkedHashSet<>();

}