package com.example.demo.repository;

import com.example.demo.entity.RoomInformation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomInformationRepository extends JpaRepository<RoomInformation, Integer> {
}