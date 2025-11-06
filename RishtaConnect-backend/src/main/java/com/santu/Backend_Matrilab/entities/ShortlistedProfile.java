package com.santu.Backend_Matrilab.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

@Entity
@Table(name = "shortlisted_profile", indexes = {
    @Index(name = "idx_shortlist_user_id", columnList = "user_id"),
    @Index(name = "idx_shortlist_target_user", columnList = "shortlisted_user_id"),
    @Index(name = "idx_shortlist_date", columnList = "shortlisted_date")
})
public class ShortlistedProfile extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonBackReference
    @NotNull(message = "User is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotNull(message = "Shortlisted user ID is required")
    @Column(name = "shortlisted_user_id", nullable = false)
    private Long shortlistedUserId;

    @Column(name = "shortlisted_date")
    private LocalDateTime shortlistedDate;

    @Size(max = 500, message = "Notes cannot exceed 500 characters")
    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    @PrePersist
    protected void onShortlistCreate() {
        if (shortlistedDate == null) {
            shortlistedDate = LocalDateTime.now();
        }
    }

    public ShortlistedProfile() {
    }

    public ShortlistedProfile(Long id, User user, Long shortlistedUserId, String notes) {
        this.id = id;
        this.user = user;
        this.shortlistedUserId = shortlistedUserId;
        this.notes = notes;
        this.shortlistedDate = LocalDateTime.now();
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

    public Long getShortlistedUserId() {
        return shortlistedUserId;
    }

    public void setShortlistedUserId(Long shortlistedUserId) {
        this.shortlistedUserId = shortlistedUserId;
    }

    public LocalDateTime getShortlistedDate() {
        return shortlistedDate;
    }

    public void setShortlistedDate(LocalDateTime shortlistedDate) {
        this.shortlistedDate = shortlistedDate;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
