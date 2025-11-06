package com.santu.Backend_Matrilab.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

@Entity
@Table(name = "my_interest", indexes = {
    @Index(name = "idx_interest_user_id", columnList = "user_id"),
    @Index(name = "idx_interest_target_user", columnList = "interested_user_id"),
    @Index(name = "idx_interest_status", columnList = "status"),
    @Index(name = "idx_interest_date", columnList = "interest_date")
})
public class MyInterest extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonBackReference
    @NotNull(message = "User is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotNull(message = "Interested user ID is required")
    @Column(name = "interested_user_id", nullable = false)
    private Long interestedUserId;

    @Column(name = "interest_date")
    private LocalDateTime interestDate;

    @Size(max = 20, message = "Status cannot exceed 20 characters")
    @Column(name = "status", length = 20)
    private String status = "PENDING";

    @Size(max = 1000, message = "Message cannot exceed 1000 characters")
    @Column(name = "message", columnDefinition = "TEXT")
    private String message;

    @PrePersist
    protected void onInterestCreate() {
        if (interestDate == null) {
            interestDate = LocalDateTime.now();
        }
        if (status == null) {
            status = "PENDING";
        }
    }

    public MyInterest() {
    }

    public MyInterest(Long id, User user, Long interestedUserId, String status, String message) {
        this.id = id;
        this.user = user;
        this.interestedUserId = interestedUserId;
        this.status = status != null ? status : "PENDING";
        this.message = message;
        this.interestDate = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getInterestedUserId() {
        return interestedUserId;
    }

    public void setInterestedUserId(Long interestedUserId) {
        this.interestedUserId = interestedUserId;
    }

    public LocalDateTime getInterestDate() {
        return interestDate;
    }

    public void setInterestDate(LocalDateTime interestDate) {
        this.interestDate = interestDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
