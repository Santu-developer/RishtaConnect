package com.santu.Backend_Matrilab.repository;

import com.santu.Backend_Matrilab.entities.PartnerExpectations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PartnerExpectationsRepository extends JpaRepository<PartnerExpectations, Long> {
    Optional<PartnerExpectations> findByUserId(Long userId);
}


