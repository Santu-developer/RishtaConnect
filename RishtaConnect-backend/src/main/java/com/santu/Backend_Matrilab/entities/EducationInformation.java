package com.santu.Backend_Matrilab.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "education_information", indexes = {
    @Index(name = "idx_education_user_id", columnList = "user_id")
})
public class EducationInformation extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonBackReference
    @NotNull(message = "User is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Size(max = 150, message = "Institute name cannot exceed 150 characters")
    @Column(length = 150)
    private String institute;

    @Size(max = 100, message = "Degree cannot exceed 100 characters")
    @Column(length = 100)
    private String degree;

    @Size(max = 100, message = "Field of study cannot exceed 100 characters")
    @Column(name = "field_of_study", length = 100)
    private String fieldOfStudy;

    @Size(max = 50, message = "Registration number cannot exceed 50 characters")
    @Column(name = "registration_number", length = 50)
    private String registrationNumber;

    @Size(max = 50, message = "Roll number cannot exceed 50 characters")
    @Column(name = "roll_number", length = 50)
    private String rollNumber;

    @Size(max = 4, message = "Start year must be 4 digits")
    @Column(name = "start_year", length = 4)
    private String startYear;

    @Size(max = 4, message = "End year must be 4 digits")
    @Column(name = "end_year", length = 4)
    private String endYear;

    @Size(max = 20, message = "Result cannot exceed 20 characters")
    @Column(length = 20)
    private String result;

    public EducationInformation() {
    }

    public EducationInformation(Long id, User user, String institute, String degree, String fieldOfStudy,
                               String registrationNumber, String rollNumber, String startYear,
                               String endYear, String result) {
        this.id = id;
        this.user = user;
        this.institute = institute;
        this.degree = degree;
        this.fieldOfStudy = fieldOfStudy;
        this.registrationNumber = registrationNumber;
        this.rollNumber = rollNumber;
        this.startYear = startYear;
        this.endYear = endYear;
        this.result = result;
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

    public String getInstitute() {
        return institute;
    }

    public void setInstitute(String institute) {
        this.institute = institute;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getFieldOfStudy() {
        return fieldOfStudy;
    }

    public void setFieldOfStudy(String fieldOfStudy) {
        this.fieldOfStudy = fieldOfStudy;
    }

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }

    public String getRollNumber() {
        return rollNumber;
    }

    public void setRollNumber(String rollNumber) {
        this.rollNumber = rollNumber;
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

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }
}