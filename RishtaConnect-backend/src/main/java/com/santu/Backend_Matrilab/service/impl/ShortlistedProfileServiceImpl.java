package com.santu.Backend_Matrilab.service.impl;

import com.santu.Backend_Matrilab.entities.ShortlistedProfile;
import com.santu.Backend_Matrilab.entities.User;
import com.santu.Backend_Matrilab.repository.ShortlistedProfileRepository;
import com.santu.Backend_Matrilab.repository.UserRepository;
import com.santu.Backend_Matrilab.service.interfac.ShortlistedProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ShortlistedProfileServiceImpl implements ShortlistedProfileService {

    @Autowired
    private ShortlistedProfileRepository shortlistedProfileRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public ShortlistedProfile addToShortlist(Long userId, Long shortlistedUserId, String notes) {
        // Validate user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "User not found with ID: " + userId));

        // Validate shortlisted user exists
        if (!userRepository.existsById(shortlistedUserId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "User to shortlist not found with ID: " + shortlistedUserId);
        }

        // Check if user is trying to shortlist themselves
        if (userId.equals(shortlistedUserId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Cannot shortlist yourself");
        }

        // Check if already shortlisted
        if (shortlistedProfileRepository.existsByUserIdAndShortlistedUserId(userId, shortlistedUserId)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "User is already in your shortlist");
        }

        // Create new shortlist entry
        ShortlistedProfile shortlist = new ShortlistedProfile();
        shortlist.setUser(user);
        shortlist.setShortlistedUserId(shortlistedUserId);
        shortlist.setNotes(notes);
        shortlist.setShortlistedDate(LocalDateTime.now());

        return shortlistedProfileRepository.save(shortlist);
    }

    @Override
    public List<ShortlistedProfile> getUserShortlist(Long userId) {
        // Validate user exists
        if (!userRepository.existsById(userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "User not found with ID: " + userId);
        }

        return shortlistedProfileRepository.findByUserId(userId);
    }

    @Override
    @Transactional
    public void removeFromShortlist(Long userId, Long shortlistId) {
        // Validate user exists
        if (!userRepository.existsById(userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "User not found with ID: " + userId);
        }

        // Find shortlist entry
        ShortlistedProfile shortlist = shortlistedProfileRepository.findById(shortlistId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Shortlist entry not found with ID: " + shortlistId));

        // Verify ownership
        if (!shortlist.getUser().getId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "You can only remove entries from your own shortlist");
        }

        shortlistedProfileRepository.delete(shortlist);
    }

    @Override
    @Transactional
    public void removeByTargetUser(Long userId, Long shortlistedUserId) {
        // Validate user exists
        if (!userRepository.existsById(userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "User not found with ID: " + userId);
        }

        shortlistedProfileRepository.deleteByUserIdAndShortlistedUserId(userId, shortlistedUserId);
    }

    @Override
    public boolean isShortlisted(Long userId, Long shortlistedUserId) {
        return shortlistedProfileRepository.existsByUserIdAndShortlistedUserId(userId, shortlistedUserId);
    }

    @Override
    public long getShortlistCount(Long userId) {
        // Validate user exists
        if (!userRepository.existsById(userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "User not found with ID: " + userId);
        }

        return shortlistedProfileRepository.countByUserId(userId);
    }
}
