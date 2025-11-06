package com.santu.Backend_Matrilab.repository;

import com.santu.Backend_Matrilab.entities.MyInterest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MyInterestRepository extends JpaRepository<MyInterest, Long> {

    List<MyInterest> findByUserId(Long userId);

    List<MyInterest> findByUserIdAndStatus(Long userId, String status);

    Optional<MyInterest> findByUserIdAndInterestedUserId(Long userId, Long interestedUserId);

    boolean existsByUserIdAndInterestedUserId(Long userId, Long interestedUserId);

    long countByUserIdAndStatus(Long userId, String status);

    // Get interests received by a user (where they are the interestedUserId)
    List<MyInterest> findByInterestedUserId(Long interestedUserId);

    // Get received interests by status
    List<MyInterest> findByInterestedUserIdAndStatus(Long interestedUserId, String status);

    // Count received interests
    long countByInterestedUserId(Long interestedUserId);
}

