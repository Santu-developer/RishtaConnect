package com.santu.Backend_Matrilab.repository;

import com.santu.Backend_Matrilab.entities.CurrentPackage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface CurrentPackageRepository extends JpaRepository<CurrentPackage, Long> {

    Optional<CurrentPackage> findByUserId(Long userId);

    Optional<CurrentPackage> findByUserIdAndIsActiveTrue(Long userId);

    List<CurrentPackage> findByIsActiveTrue();

    List<CurrentPackage> findByEndDateBefore(LocalDateTime endDate);

    void deleteByUserId(Long userId);
}

