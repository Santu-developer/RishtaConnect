package com.santu.Backend_Matrilab.controller;

import com.santu.Backend_Matrilab.entities.IgnoredProfile;
import com.santu.Backend_Matrilab.service.interfac.IgnoredProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ignored")
@CrossOrigin(origins = "*")
public class IgnoredProfileController {

    @Autowired
    private IgnoredProfileService ignoredProfileService;

    // Add user to ignored list
    @PostMapping("/add/{userId}")
    public ResponseEntity<?> addToIgnoredList(
            @PathVariable Long userId,
            @RequestBody Map<String, Object> request) {
        try {
            Long ignoredUserId = Long.valueOf(request.get("ignoredUserId").toString());
            String reason = request.get("reason") != null ? request.get("reason").toString() : null;
            
            IgnoredProfile ignoredProfile = ignoredProfileService.addToIgnoredList(userId, ignoredUserId, reason);
            return ResponseEntity.status(HttpStatus.CREATED).body(ignoredProfile);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // Get user's ignored list
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<IgnoredProfile>> getUserIgnoredList(@PathVariable Long userId) {
        List<IgnoredProfile> ignoredList = ignoredProfileService.getUserIgnoredList(userId);
        return ResponseEntity.ok(ignoredList);
    }

    // Get ignored count
    @GetMapping("/count/{userId}")
    public ResponseEntity<Long> getIgnoredCount(@PathVariable Long userId) {
        long count = ignoredProfileService.getIgnoredCount(userId);
        return ResponseEntity.ok(count);
    }

    // Check if user has ignored another user
    @GetMapping("/check/{userId}/{ignoredUserId}")
    public ResponseEntity<Map<String, Boolean>> hasIgnored(
            @PathVariable Long userId,
            @PathVariable Long ignoredUserId) {
        boolean hasIgnored = ignoredProfileService.hasIgnored(userId, ignoredUserId);
        return ResponseEntity.ok(Map.of("hasIgnored", hasIgnored));
    }

    // Remove from ignored list
    @DeleteMapping("/{userId}/{ignoredUserId}")
    public ResponseEntity<?> removeFromIgnoredList(
            @PathVariable Long userId,
            @PathVariable Long ignoredUserId) {
        try {
            ignoredProfileService.removeFromIgnoredList(userId, ignoredUserId);
            return ResponseEntity.ok(Map.of("message", "User removed from ignored list successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}
