package com.santu.Backend_Matrilab.repository;

import com.santu.Backend_Matrilab.entities.ShortlistedProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShortlistedProfileRepository extends JpaRepository<ShortlistedProfile, Long> {

    List<ShortlistedProfile> findByUserId(Long userId);

    Optional<ShortlistedProfile> findByUserIdAndShortlistedUserId(Long userId, Long shortlistedUserId);

    boolean existsByUserIdAndShortlistedUserId(Long userId, Long shortlistedUserId);

    void deleteByUserIdAndShortlistedUserId(Long userId, Long shortlistedUserId);

    long countByUserId(Long userId);
}

