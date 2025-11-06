package com.santu.Backend_Matrilab.repository;

import com.santu.Backend_Matrilab.entities.IgnoredProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IgnoredProfileRepository extends JpaRepository<IgnoredProfile, Long> {

    List<IgnoredProfile> findByUserId(Long userId);

    Optional<IgnoredProfile> findByUserIdAndIgnoredUserId(Long userId, Long ignoredUserId);

    boolean existsByUserIdAndIgnoredUserId(Long userId, Long ignoredUserId);

    void deleteByUserIdAndIgnoredUserId(Long userId, Long ignoredUserId);

    long countByUserId(Long userId);
}

