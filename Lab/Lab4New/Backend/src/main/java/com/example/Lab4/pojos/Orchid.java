package com.example.Lab4.pojos;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.Nationalized;

@Entity
@Table(name = "orchid")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Orchid {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orchid_id", nullable = false)
    private Integer id;

    @Column(name = "is_attractive")
    private Boolean isAttractive;

    @Column(name = "is_natural")
    private Boolean isNatural;

    @Size(max = 255)
    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Nationalized
    @Lob
    @Column(name = "orchid_description")
    private String orchidDescription;

    @Size(max = 1000)
    @Column(name = "orchid_url", length = 1000)
    private String orchidUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

}