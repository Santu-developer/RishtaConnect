package com.santu.Backend_Matrilab.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "career_information", indexes = {
    @Index(name = "idx_career_user_id", columnList = "user_id")
})
public class CareerInformation extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonBackReference
    @NotNull(message = "User is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Size(max = 100, message = "Company name cannot exceed 100 characters")
    @Column(length = 100)
    private String company;

    @Size(max = 100, message = "Designation cannot exceed 100 characters")
    @Column(length = 100)
    private String designation;

    @Size(max = 4, message = "Start year must be 4 digits")
    @Column(name = "start_year", length = 4)
    private String startYear;

    @Size(max = 4, message = "End year must be 4 digits")
    @Column(name = "end_year", length = 4)
    private String endYear;

    public CareerInformation() {
    }

    public CareerInformation(Long id, User user, String company, String designation, String startYear, String endYear) {
        this.id = id;
        this.user = user;
        this.company = company;
        this.designation = designation;
        this.startYear = startYear;
        this.endYear = endYear;
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

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getStartYear() {
        return startYear;
    }

    public void setStartYear(String startYear) {
        this.startYear = startYear;
    }

    public String getEndYear() {
        return endYear;
    }

    public void setEndYear(String endYear) {
        this.endYear = endYear;
    }
}
