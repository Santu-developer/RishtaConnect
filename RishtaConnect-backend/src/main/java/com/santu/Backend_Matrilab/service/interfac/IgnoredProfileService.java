package com.santu.Backend_Matrilab.service.interfac;

import com.santu.Backend_Matrilab.entities.IgnoredProfile;

import java.util.List;

public interface IgnoredProfileService {
    IgnoredProfile addToIgnoredList(Long userId, Long ignoredUserId, String reason);
    List<IgnoredProfile> getUserIgnoredList(Long userId);
    void removeFromIgnoredList(Long userId, Long ignoredUserId);
    boolean hasIgnored(Long userId, Long ignoredUserId);
    long getIgnoredCount(Long userId);
}
