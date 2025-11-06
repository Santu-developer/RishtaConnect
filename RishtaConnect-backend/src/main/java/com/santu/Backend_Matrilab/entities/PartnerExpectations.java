package com.santu.Backend_Matrilab.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "partner_expectations", indexes = {
    @Index(name = "idx_partner_exp_user_id", columnList = "user_id")
})
public class PartnerExpectations extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonBackReference
    @NotNull(message = "User is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Size(max = 1000, message = "General requirement cannot exceed 1000 characters")
    @Column(name = "general_requirement", columnDefinition = "TEXT")
    private String generalRequirement;

    @Min(value = 18, message = "Preferred minimum age must be at least 18")
    @Column(name = "preferred_min_age")
    private Integer preferredMinAge;

    @Min(value = 18, message = "Preferred maximum age must be at least 18")
    @Column(name = "preferred_max_age")
    private Integer preferredMaxAge;

    @Min(value = 0, message = "Preferred minimum height cannot be negative")
    @Column(name = "preferred_min_height")
    private Double preferredMinHeight;

    @Min(value = 0, message = "Preferred maximum height cannot be negative")
    @Column(name = "preferred_max_height")
    private Double preferredMaxHeight;

    @Min(value = 0, message = "Preferred maximum weight cannot be negative")
    @Column(name = "preferred_max_weight")
    private Double preferredMaxWeight;

    @Size(max = 50, message = "Preferred complexion cannot exceed 50 characters")
    @Column(name = "preferred_complexion", length = 50)
    private String preferredComplexion;

    @Size(max = 100, message = "Preferred education cannot exceed 100 characters")
    @Column(name = "preferred_education", length = 100)
    private String preferredEducation;

    @Size(max = 100, message = "Preferred occupation cannot exceed 100 characters")
    @Column(name = "preferred_occupation", length = 100)
    private String preferredOccupation;

    @Size(max = 100, message = "Preferred languages cannot exceed 100 characters")
    @Column(name = "preferred_languages", length = 100)
    private String preferredLanguages;

    @Size(max = 200, message = "Preferred personality cannot exceed 200 characters")
    @Column(name = "preferred_personality", length = 200)
    private String preferredPersonality;

    @Size(max = 200, message = "Preferred family values cannot exceed 200 characters")
    @Column(name = "preferred_family_values", length = 200)
    private String preferredFamilyValues;

    public PartnerExpectations() {
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

    public String getGeneralRequirement() {
        return generalRequirement;
    }

    public void setGeneralRequirement(String generalRequirement) {
        this.generalRequirement = generalRequirement;
    }

    public Integer getPreferredMinAge() {
        return preferredMinAge;
    }

    public void setPreferredMinAge(Integer preferredMinAge) {
        this.preferredMinAge = preferredMinAge;
    }

    public Integer getPreferredMaxAge() {
        return preferredMaxAge;
    }

    public void setPreferredMaxAge(Integer preferredMaxAge) {
        this.preferredMaxAge = preferredMaxAge;
    }

    public Double getPreferredMinHeight() {
        return preferredMinHeight;
    }

    public void setPreferredMinHeight(Double preferredMinHeight) {
        this.preferredMinHeight = preferredMinHeight;
    }

    public Double getPreferredMaxHeight() {
        return preferredMaxHeight;
    }

    public void setPreferredMaxHeight(Double preferredMaxHeight) {
        this.preferredMaxHeight = preferredMaxHeight;
    }

    public Double getPreferredMaxWeight() {
        return preferredMaxWeight;
    }

    public void setPreferredMaxWeight(Double preferredMaxWeight) {
        this.preferredMaxWeight = preferredMaxWeight;
    }

    public String getPreferredComplexion() {
        return preferredComplexion;
    }

    public void setPreferredComplexion(String preferredComplexion) {
        this.preferredComplexion = preferredComplexion;
    }

    public String getPreferredEducation() {
        return preferredEducation;
    }

    public void setPreferredEducation(String preferredEducation) {
        this.preferredEducation = preferredEducation;
    }

    public String getPreferredOccupation() {
        return preferredOccupation;
    }

    public void setPreferredOccupation(String preferredOccupation) {
        this.preferredOccupation = preferredOccupation;
    }

    public String getPreferredLanguages() {
        return preferredLanguages;
    }

    public void setPreferredLanguages(String preferredLanguages) {
        this.preferredLanguages = preferredLanguages;
    }

    public String getPreferredPersonality() {
        return preferredPersonality;
    }

    public void setPreferredPersonality(String preferredPersonality) {
        this.preferredPersonality = preferredPersonality;
    }

    public String getPreferredFamilyValues() {
        return preferredFamilyValues;
    }

    public void setPreferredFamilyValues(String preferredFamilyValues) {
        this.preferredFamilyValues = preferredFamilyValues;
    }
}
