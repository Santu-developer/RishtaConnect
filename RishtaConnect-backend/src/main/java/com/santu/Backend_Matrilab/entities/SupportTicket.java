package com.santu.Backend_Matrilab.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "support_tickets")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SupportTicket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 200)
    private String subject;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(nullable = false, length = 20)
    private String status = "OPEN";

    @Column(length = 20)
    private String priority = "MEDIUM";

    @Column(length = 50)
    private String category = "OTHER";

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @Column(name = "updated_date")
    private LocalDateTime updatedDate;

    @Column(name = "resolved_date")
    private LocalDateTime resolvedDate;

    @PrePersist
    protected void onCreate() {
        createdDate = LocalDateTime.now();
        updatedDate = LocalDateTime.now();
        if (status == null || status.isEmpty()) {
            status = "OPEN";
        }
        if (priority == null || priority.isEmpty()) {
            priority = "MEDIUM";
        }
        if (category == null || category.isEmpty()) {
            category = "OTHER";
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedDate = LocalDateTime.now();
        if ("RESOLVED".equals(status) && resolvedDate == null) {
            resolvedDate = LocalDateTime.now();
        }
        if ("CLOSED".equals(status) && resolvedDate == null) {
            resolvedDate = LocalDateTime.now();
        }
    }
}
