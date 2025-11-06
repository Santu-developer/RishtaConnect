package com.santu.Backend_Matrilab.service.impl;

import com.santu.Backend_Matrilab.entities.MyInterest;
import com.santu.Backend_Matrilab.entities.User;
import com.santu.Backend_Matrilab.repository.MyInterestRepository;
import com.santu.Backend_Matrilab.repository.UserRepository;
import com.santu.Backend_Matrilab.service.interfac.MyInterestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MyInterestServiceImpl implements MyInterestService {

    @Autowired
    private MyInterestRepository myInterestRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public MyInterest expressInterest(Long userId, Long interestedUserId, String message) {
        // Validate user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "User not found with ID: " + userId));

        // Validate interested user exists
        if (!userRepository.existsById(interestedUserId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Interested user not found with ID: " + interestedUserId);
        }

        // Check if user is trying to express interest in themselves
        if (userId.equals(interestedUserId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Cannot express interest in yourself");
        }

        // Check if interest already exists
        if (myInterestRepository.existsByUserIdAndInterestedUserId(userId, interestedUserId)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "Interest already expressed for this user");
        }

        // Create new interest
        MyInterest interest = new MyInterest();
        interest.setUser(user);
        interest.setInterestedUserId(interestedUserId);
        interest.setMessage(message);
        interest.setStatus("PENDING");
        interest.setInterestDate(LocalDateTime.now());

        return myInterestRepository.save(interest);
    }

    @Override
    public List<MyInterest> getMyInterests(Long userId) {
        // Validate user exists
        if (!userRepository.existsById(userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "User not found with ID: " + userId);
        }

        return myInterestRepository.findByUserId(userId);
    }

    @Override
    public List<MyInterest> getMyInterestsByStatus(Long userId, String status) {
        // Validate user exists
        if (!userRepository.existsById(userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "User not found with ID: " + userId);
        }

        return myInterestRepository.findByUserIdAndStatus(userId, status);
    }

    @Override
    @Transactional
    public void deleteInterest(Long userId, Long interestId) {
        // Validate user exists
        if (!userRepository.existsById(userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "User not found with ID: " + userId);
        }

        // Find interest
        MyInterest interest = myInterestRepository.findById(interestId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Interest not found with ID: " + interestId));

        // Verify ownership
        if (!interest.getUser().getId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "You can only delete your own interests");
        }

        myInterestRepository.delete(interest);
    }

    @Override
    public boolean hasInterest(Long userId, Long interestedUserId) {
        return myInterestRepository.existsByUserIdAndInterestedUserId(userId, interestedUserId);
    }

    @Override
    public long getInterestCount(Long userId) {
        // Validate user exists
        if (!userRepository.existsById(userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "User not found with ID: " + userId);
        }

        return myInterestRepository.findByUserId(userId).size();
    }

    @Override
    public long getInterestCountByStatus(Long userId, String status) {
        // Validate user exists
        if (!userRepository.existsById(userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "User not found with ID: " + userId);
        }

        return myInterestRepository.countByUserIdAndStatus(userId, status);
    }

    @Override
    public List<MyInterest> getReceivedInterests(Long userId) {
        // Validate user exists
        if (!userRepository.existsById(userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "User not found with ID: " + userId);
        }

        return myInterestRepository.findByInterestedUserId(userId);
    }

    @Override
    public List<MyInterest> getReceivedInterestsByStatus(Long userId, String status) {
        // Validate user exists
        if (!userRepository.existsById(userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "User not found with ID: " + userId);
        }

        return myInterestRepository.findByInterestedUserIdAndStatus(userId, status);
    }

    @Override
    public long getReceivedInterestCount(Long userId) {
        // Validate user exists
        if (!userRepository.existsById(userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "User not found with ID: " + userId);
        }

        return myInterestRepository.countByInterestedUserId(userId);
    }

    @Override
    @Transactional
    public MyInterest updateInterestStatus(Long interestId, String status) {
        // Find interest
        MyInterest interest = myInterestRepository.findById(interestId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Interest not found with ID: " + interestId));

        // Validate status
        if (!status.equals("ACCEPTED") && !status.equals("REJECTED")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Invalid status. Use ACCEPTED or REJECTED");
        }

        // Update status
        interest.setStatus(status);
        return myInterestRepository.save(interest);
    }
}
