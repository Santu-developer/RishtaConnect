package com.santu.Backend_Matrilab.controller;

import com.santu.Backend_Matrilab.dto.request.ShortlistRequest;
import com.santu.Backend_Matrilab.entities.ShortlistedProfile;
import com.santu.Backend_Matrilab.service.interfac.ShortlistedProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/shortlist")
@CrossOrigin(origins = "*")
public class ShortlistedProfileController {

    @Autowired
    private ShortlistedProfileService shortlistedProfileService;

    // Add user to shortlist
    @PostMapping("/add/{userId}")
    public ResponseEntity<?> addToShortlist(
            @PathVariable Long userId,
            @RequestBody ShortlistRequest request) {
        try {
            ShortlistedProfile shortlist = shortlistedProfileService.addToShortlist(
                    userId,
                    request.getShortlistedUserId(),
                    request.getNotes()
            );
            return ResponseEntity.status(HttpStatus.CREATED).body(shortlist);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // Get user's shortlist
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ShortlistedProfile>> getUserShortlist(@PathVariable Long userId) {
        List<ShortlistedProfile> shortlist = shortlistedProfileService.getUserShortlist(userId);
        return ResponseEntity.ok(shortlist);
    }

    // Get shortlist count for dashboard
    @GetMapping("/count/{userId}")
    public ResponseEntity<Long> getShortlistCount(@PathVariable Long userId) {
        long count = shortlistedProfileService.getShortlistCount(userId);
        return ResponseEntity.ok(count);
    }

    // Check if user is shortlisted
    @GetMapping("/check/{userId}/{shortlistedUserId}")
    public ResponseEntity<Map<String, Boolean>> isShortlisted(
            @PathVariable Long userId,
            @PathVariable Long shortlistedUserId) {
        boolean isShortlisted = shortlistedProfileService.isShortlisted(userId, shortlistedUserId);
        return ResponseEntity.ok(Map.of("isShortlisted", isShortlisted));
    }

    // Remove from shortlist by ID
    @DeleteMapping("/{userId}/{shortlistId}")
    public ResponseEntity<?> removeFromShortlist(
            @PathVariable Long userId,
            @PathVariable Long shortlistId) {
        try {
            shortlistedProfileService.removeFromShortlist(userId, shortlistId);
            return ResponseEntity.ok(Map.of("message", "Removed from shortlist successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // Remove from shortlist by target user ID
    @DeleteMapping("/{userId}/user/{shortlistedUserId}")
    public ResponseEntity<?> removeByTargetUser(
            @PathVariable Long userId,
            @PathVariable Long shortlistedUserId) {
        try {
            shortlistedProfileService.removeByTargetUser(userId, shortlistedUserId);
            return ResponseEntity.ok(Map.of("message", "Removed from shortlist successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}
