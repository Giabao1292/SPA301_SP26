package com.example.Assignment2.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "SystemAccount")
public class SystemAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "AccountID", nullable = false)
    private Integer id;

    @Size(max = 100)
    @NotBlank
    @Nationalized
    @Column(name = "AccountName", nullable = false)
    private String accountName;

    @Email
    @Size(max = 100)
    @NotBlank
    @Column(name = "AccountEmail", nullable = false, unique = true)
    private String email;

    @Size(max = 255)
    @NotBlank
    @Column(name = "AccountPassword", nullable = false)
    private String password;

    @NotNull
    @Column(name = "AccountRole")
    private Integer role;

    @OneToMany(mappedBy = "createdByID", fetch = FetchType.LAZY)
    private Set<NewsArticle> createdArticles = new LinkedHashSet<>();

    @OneToMany(mappedBy = "updatedByID", fetch = FetchType.LAZY)
    private Set<NewsArticle> updatedArticles = new LinkedHashSet<>();
}