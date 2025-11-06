package com.santu.Backend_Matrilab.controller;

import com.santu.Backend_Matrilab.dto.request.ExpressInterestRequest;
import com.santu.Backend_Matrilab.entities.MyInterest;
import com.santu.Backend_Matrilab.service.interfac.MyInterestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/interests")
@CrossOrigin(origins = "*")
public class MyInterestController {

    @Autowired
    private MyInterestService myInterestService;

    // Express interest in a user
    @PostMapping("/express/{userId}")
    public ResponseEntity<?> expressInterest(
            @PathVariable Long userId,
            @RequestBody ExpressInterestRequest request) {
        try {
            MyInterest interest = myInterestService.expressInterest(
                    userId, 
                    request.getInterestedUserId(), 
                    request.getMessage()
            );
            return ResponseEntity.status(HttpStatus.CREATED).body(interest);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // Get all interests expressed by user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<MyInterest>> getMyInterests(@PathVariable Long userId) {
        List<MyInterest> interests = myInterestService.getMyInterests(userId);
        return ResponseEntity.ok(interests);
    }

    // Get interests by status
    @GetMapping("/user/{userId}/status/{status}")
    public ResponseEntity<List<MyInterest>> getInterestsByStatus(
            @PathVariable Long userId,
            @PathVariable String status) {
        List<MyInterest> interests = myInterestService.getMyInterestsByStatus(userId, status);
        return ResponseEntity.ok(interests);
    }

    // Get interest count for dashboard
    @GetMapping("/count/{userId}")
    public ResponseEntity<Long> getInterestCount(@PathVariable Long userId) {
        long count = myInterestService.getInterestCount(userId);
        return ResponseEntity.ok(count);
    }

    // Get interest count by status
    @GetMapping("/count/{userId}/status/{status}")
    public ResponseEntity<Long> getInterestCountByStatus(
            @PathVariable Long userId,
            @PathVariable String status) {
        long count = myInterestService.getInterestCountByStatus(userId, status);
        return ResponseEntity.ok(count);
    }

    // Check if user has expressed interest in another user
    @GetMapping("/check/{userId}/{interestedUserId}")
    public ResponseEntity<Map<String, Boolean>> hasInterest(
            @PathVariable Long userId,
            @PathVariable Long interestedUserId) {
        boolean hasInterest = myInterestService.hasInterest(userId, interestedUserId);
        return ResponseEntity.ok(Map.of("hasInterest", hasInterest));
    }

    // Delete interest
    @DeleteMapping("/{userId}/{interestId}")
    public ResponseEntity<?> deleteInterest(
            @PathVariable Long userId,
            @PathVariable Long interestId) {
        try {
            myInterestService.deleteInterest(userId, interestId);
            return ResponseEntity.ok(Map.of("message", "Interest deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // ===== RECEIVED INTERESTS (Interests received by user) =====
    
    // Get all interests received by user (where user is the target)
    @GetMapping("/received/{userId}")
    public ResponseEntity<List<MyInterest>> getReceivedInterests(@PathVariable Long userId) {
        List<MyInterest> interests = myInterestService.getReceivedInterests(userId);
        return ResponseEntity.ok(interests);
    }

    // Get received interests by status
    @GetMapping("/received/{userId}/status/{status}")
    public ResponseEntity<List<MyInterest>> getReceivedInterestsByStatus(
            @PathVariable Long userId,
            @PathVariable String status) {
        List<MyInterest> interests = myInterestService.getReceivedInterestsByStatus(userId, status);
        return ResponseEntity.ok(interests);
    }

    // Get received interest count
    @GetMapping("/received/count/{userId}")
    public ResponseEntity<Long> getReceivedInterestCount(@PathVariable Long userId) {
        long count = myInterestService.getReceivedInterestCount(userId);
        return ResponseEntity.ok(count);
    }

    // Update interest status (Accept/Reject)
    @PutMapping("/status/{interestId}")
    public ResponseEntity<?> updateInterestStatus(
            @PathVariable Long interestId,
            @RequestBody Map<String, String> request) {
        try {
            String status = request.get("status");
            if (status == null || (!status.equals("ACCEPTED") && !status.equals("REJECTED"))) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("error", "Invalid status. Use ACCEPTED or REJECTED"));
            }
            
            MyInterest updatedInterest = myInterestService.updateInterestStatus(interestId, status);
            return ResponseEntity.ok(updatedInterest);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}
