package com.example.Assignment2.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "Tag")
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TagID", nullable = false)
    private Integer id;

    @Size(max = 100)
    @NotBlank
    @Nationalized
    @Column(name = "TagName", nullable = false)
    private String tagName;

    @Nationalized
    @Column(name = "Note")
    private String note;

    @OneToMany(mappedBy = "tag", fetch = FetchType.LAZY)
    private Set<NewsTag> newsTags = new LinkedHashSet<>();
}