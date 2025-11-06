package com.santu.Backend_Matrilab.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

@Entity
@Table(name = "interest_request", indexes = {
    @Index(name = "idx_request_user_id", columnList = "user_id"),
    @Index(name = "idx_request_requester", columnList = "requester_user_id"),
    @Index(name = "idx_request_status", columnList = "status"),
    @Index(name = "idx_request_date", columnList = "request_date")
})
public class InterestRequest extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonBackReference
    @NotNull(message = "User is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotNull(message = "Requester user ID is required")
    @Column(name = "requester_user_id", nullable = false)
    private Long requesterUserId;

    @Column(name = "request_date")
    private LocalDateTime requestDate;

    @Size(max = 20, message = "Status cannot exceed 20 characters")
    @Column(name = "status", length = 20)
    private String status = "PENDING";

    @Size(max = 1000, message = "Message cannot exceed 1000 characters")
    @Column(name = "message", columnDefinition = "TEXT")
    private String message;

    @Column(name = "response_date")
    private LocalDateTime responseDate;

    @PrePersist
    protected void onRequestCreate() {
        if (requestDate == null) {
            requestDate = LocalDateTime.now();
        }
        if (status == null) {
            status = "PENDING";
        }
    }

    public InterestRequest() {
    }

    public InterestRequest(Long id, User user, Long requesterUserId, String status, String message) {
        this.id = id;
        this.user = user;
        this.requesterUserId = requesterUserId;
        this.status = status != null ? status : "PENDING";
        this.message = message;
        this.requestDate = LocalDateTime.now();
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

    public Long getRequesterUserId() {
        return requesterUserId;
    }

    public void setRequesterUserId(Long requesterUserId) {
        this.requesterUserId = requesterUserId;
    }

    public LocalDateTime getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(LocalDateTime requestDate) {
        this.requestDate = requestDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
        if ("ACCEPTED".equals(status) || "REJECTED".equals(status)) {
            this.responseDate = LocalDateTime.now();
        }
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getResponseDate() {
        return responseDate;
    }

    public void setResponseDate(LocalDateTime responseDate) {
        this.responseDate = responseDate;
    }
}
