package com.santu.Backend_Matrilab.service.impl;

import com.santu.Backend_Matrilab.entities.IgnoredProfile;
import com.santu.Backend_Matrilab.entities.User;
import com.santu.Backend_Matrilab.repository.IgnoredProfileRepository;
import com.santu.Backend_Matrilab.repository.UserRepository;
import com.santu.Backend_Matrilab.service.interfac.IgnoredProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class IgnoredProfileServiceImpl implements IgnoredProfileService {

    @Autowired
    private IgnoredProfileRepository ignoredProfileRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public IgnoredProfile addToIgnoredList(Long userId, Long ignoredUserId, String reason) {
        // Validate user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "User not found with ID: " + userId));

        // Validate ignored user exists
        if (!userRepository.existsById(ignoredUserId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Ignored user not found with ID: " + ignoredUserId);
        }

        // Check if user is trying to ignore themselves
        if (userId.equals(ignoredUserId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Cannot ignore yourself");
        }

        // Check if already ignored
        if (ignoredProfileRepository.existsByUserIdAndIgnoredUserId(userId, ignoredUserId)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "User already in ignored list");
        }

        // Create ignored profile
        IgnoredProfile ignoredProfile = new IgnoredProfile();
        ignoredProfile.setUser(user);
        ignoredProfile.setIgnoredUserId(ignoredUserId);
        ignoredProfile.setReason(reason);
        ignoredProfile.setIgnoredDate(LocalDateTime.now());

        return ignoredProfileRepository.save(ignoredProfile);
    }

    @Override
    public List<IgnoredProfile> getUserIgnoredList(Long userId) {
        // Validate user exists
        if (!userRepository.existsById(userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "User not found with ID: " + userId);
        }

        return ignoredProfileRepository.findByUserId(userId);
    }

    @Override
    @Transactional
    public void removeFromIgnoredList(Long userId, Long ignoredUserId) {
        // Validate user exists
        if (!userRepository.existsById(userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "User not found with ID: " + userId);
        }

        // Check if ignored profile exists
        if (!ignoredProfileRepository.existsByUserIdAndIgnoredUserId(userId, ignoredUserId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Ignored profile not found");
        }

        ignoredProfileRepository.deleteByUserIdAndIgnoredUserId(userId, ignoredUserId);
    }

    @Override
    public boolean hasIgnored(Long userId, Long ignoredUserId) {
        return ignoredProfileRepository.existsByUserIdAndIgnoredUserId(userId, ignoredUserId);
    }

    @Override
    public long getIgnoredCount(Long userId) {
        // Validate user exists
        if (!userRepository.existsById(userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "User not found with ID: " + userId);
        }

        return ignoredProfileRepository.countByUserId(userId);
    }
}
