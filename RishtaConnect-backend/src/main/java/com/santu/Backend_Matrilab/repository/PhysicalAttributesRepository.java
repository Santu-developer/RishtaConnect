package com.santu.Backend_Matrilab.repository;

import com.santu.Backend_Matrilab.entities.PhysicalAttributes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PhysicalAttributesRepository extends JpaRepository<PhysicalAttributes, Long> {
    Optional<PhysicalAttributes> findByUserId(Long userId);
}
