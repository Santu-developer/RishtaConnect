package com.santu.Backend_Matrilab.service.interfac;

import com.santu.Backend_Matrilab.entities.ShortlistedProfile;

import java.util.List;

public interface ShortlistedProfileService {
    ShortlistedProfile addToShortlist(Long userId, Long shortlistedUserId, String notes);
    List<ShortlistedProfile> getUserShortlist(Long userId);
    void removeFromShortlist(Long userId, Long shortlistId);
    void removeByTargetUser(Long userId, Long shortlistedUserId);
    boolean isShortlisted(Long userId, Long shortlistedUserId);
    long getShortlistCount(Long userId);
}
