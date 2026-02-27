package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "RoomType")
public class RoomType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RoomTypeID")
    private Integer id;

    @NotBlank
    @Size(max = 100)
    @Column(name = "RoomTypeName", nullable = false, length = 100)
    private String name;

    @Size(max = 255)
    @Column(name = "TypeDescription", length = 255)
    private String description;

    @Size(max = 255)
    @Column(name = "TypeNote", length = 255)
    private String note;

    @JsonIgnore
    @OneToMany(mappedBy = "roomType")
    private Set<RoomInformation> rooms = new HashSet<>();
}