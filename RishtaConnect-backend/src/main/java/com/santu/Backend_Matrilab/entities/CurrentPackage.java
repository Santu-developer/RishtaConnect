package com.santu.Backend_Matrilab.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

@Entity
@Table(name = "current_package", indexes = {
    @Index(name = "idx_current_pkg_user_id", columnList = "user_id"),
    @Index(name = "idx_current_pkg_active", columnList = "is_active"),
    @Index(name = "idx_current_pkg_end_date", columnList = "end_date")
})
public class CurrentPackage extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonBackReference
    @NotNull(message = "User is required")
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Size(max = 100, message = "Package name cannot exceed 100 characters")
    @Column(name = "package_name", length = 100)
    private String packageName;

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Min(value = 0, message = "Remaining interest express cannot be negative")
    @Column(name = "remaining_interest_express")
    private Integer remainingInterestExpress = 0;

    @Min(value = 0, message = "Remaining contact view cannot be negative")
    @Column(name = "remaining_contact_view")
    private Integer remainingContactView = 0;

    public CurrentPackage() {
    }

    public CurrentPackage(Long id, User user, String packageName, LocalDateTime startDate,
                         LocalDateTime endDate, Boolean isActive, Integer remainingInterestExpress,
                         Integer remainingContactView) {
        this.id = id;
        this.user = user;
        this.packageName = packageName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isActive = isActive != null ? isActive : true;
        this.remainingInterestExpress = remainingInterestExpress != null ? remainingInterestExpress : 0;
        this.remainingContactView = remainingContactView != null ? remainingContactView : 0;
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

    public String getPackageName() {
        return packageName;
    }

    public void setPackageName(String packageName) {
        this.packageName = packageName;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public Integer getRemainingInterestExpress() {
        return remainingInterestExpress;
    }

    public void setRemainingInterestExpress(Integer remainingInterestExpress) {
        this.remainingInterestExpress = remainingInterestExpress;
    }

    public Integer getRemainingContactView() {
        return remainingContactView;
    }

    public void setRemainingContactView(Integer remainingContactView) {
        this.remainingContactView = remainingContactView;
    }

    public boolean isExpired() {
        return endDate != null && LocalDateTime.now().isAfter(endDate);
    }
}
