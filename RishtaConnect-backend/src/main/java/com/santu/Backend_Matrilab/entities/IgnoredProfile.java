package com.santu.Backend_Matrilab.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

@Entity
@Table(name = "ignored_profile", indexes = {
    @Index(name = "idx_ignored_user_id", columnList = "user_id"),
    @Index(name = "idx_ignored_target_user", columnList = "ignored_user_id"),
    @Index(name = "idx_ignored_date", columnList = "ignored_date")
})
public class IgnoredProfile extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonBackReference
    @NotNull(message = "User is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotNull(message = "Ignored user ID is required")
    @Column(name = "ignored_user_id", nullable = false)
    private Long ignoredUserId;

    @Column(name = "ignored_date")
    private LocalDateTime ignoredDate;

    @Size(max = 500, message = "Reason cannot exceed 500 characters")
    @Column(name = "reason", columnDefinition = "TEXT")
    private String reason;

    @PrePersist
    protected void onIgnoreCreate() {
        if (ignoredDate == null) {
            ignoredDate = LocalDateTime.now();
        }
    }

    public IgnoredProfile() {
    }

    public IgnoredProfile(Long id, User user, Long ignoredUserId, String reason) {
        this.id = id;
        this.user = user;
        this.ignoredUserId = ignoredUserId;
        this.reason = reason;
        this.ignoredDate = LocalDateTime.now();
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

    public Long getIgnoredUserId() {
        return ignoredUserId;
    }

    public void setIgnoredUserId(Long ignoredUserId) {
        this.ignoredUserId = ignoredUserId;
    }

    public LocalDateTime getIgnoredDate() {
        return ignoredDate;
    }

    public void setIgnoredDate(LocalDateTime ignoredDate) {
        this.ignoredDate = ignoredDate;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
