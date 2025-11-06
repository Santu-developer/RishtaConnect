package com.santu.Backend_Matrilab.repository;

import com.santu.Backend_Matrilab.entities.InterestRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InterestRequestRepository extends JpaRepository<InterestRequest, Long> {

    List<InterestRequest> findByUserId(Long userId);

    List<InterestRequest> findByUserIdAndStatus(Long userId, String status);

    List<InterestRequest> findByRequesterUserId(Long requesterUserId);

    Optional<InterestRequest> findByUserIdAndRequesterUserId(Long userId, Long requesterUserId);

    boolean existsByUserIdAndRequesterUserId(Long userId, Long requesterUserId);

    long countByUserIdAndStatus(Long userId, String status);
}

