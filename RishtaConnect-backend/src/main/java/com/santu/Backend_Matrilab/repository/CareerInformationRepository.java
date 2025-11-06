package com.santu.Backend_Matrilab.repository;

import com.santu.Backend_Matrilab.entities.CareerInformation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CareerInformationRepository extends JpaRepository<CareerInformation, Long> {
    List<CareerInformation> findByUserId(Long userId);
}

