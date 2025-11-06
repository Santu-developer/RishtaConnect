package com.santu.Backend_Matrilab.repository;


import com.santu.Backend_Matrilab.entities.FamilyInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FamilyInformationRepository extends JpaRepository<FamilyInformation, Long> {
    Optional<FamilyInformation> findByUserId(Long userID);
    //    FamilyInformation findByUserId(Long userId);
}