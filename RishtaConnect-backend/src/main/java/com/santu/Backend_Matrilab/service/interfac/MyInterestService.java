package com.santu.Backend_Matrilab.service.interfac;

import com.santu.Backend_Matrilab.entities.MyInterest;

import java.util.List;

public interface MyInterestService {
    MyInterest expressInterest(Long userId, Long interestedUserId, String message);
    List<MyInterest> getMyInterests(Long userId);
    List<MyInterest> getMyInterestsByStatus(Long userId, String status);
    void deleteInterest(Long userId, Long interestId);
    boolean hasInterest(Long userId, Long interestedUserId);
    long getInterestCount(Long userId);
    long getInterestCountByStatus(Long userId, String status);
    
    // Received interests (interests where this user is the target)
    List<MyInterest> getReceivedInterests(Long userId);
    List<MyInterest> getReceivedInterestsByStatus(Long userId, String status);
    long getReceivedInterestCount(Long userId);
    
    // Update interest status (Accept/Reject)
    MyInterest updateInterestStatus(Long interestId, String status);
}
