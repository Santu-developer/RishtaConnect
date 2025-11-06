package com.santu.Backend_Matrilab.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

@Entity
@Table(name = "basic_information", indexes = {
    @Index(name = "idx_basic_info_user_id", columnList = "user_id"),
    @Index(name = "idx_basic_info_gender", columnList = "gender"),
    @Index(name = "idx_basic_info_religion", columnList = "religion")
})
public class BasicInformation extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonBackReference
    @NotNull(message = "User is required")
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", unique = true, nullable = false)
    private User user;

    @Size(max = 50, message = "First name cannot exceed 50 characters")
    @Column(name = "first_name", length = 50)
    private String firstName;

    @Size(max = 50, message = "Last name cannot exceed 50 characters")
    @Column(name = "last_name", length = 50)
    private String lastName;

    @Past(message = "Date of birth must be in the past")
    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Size(max = 30, message = "Religion cannot exceed 30 characters")
    @Column(length = 30)
    private String religion;

    @Size(max = 10, message = "Gender must be valid")
    @Column(length = 10)
    private String gender;

    @Size(max = 30, message = "Marital status cannot exceed 30 characters")
    @Column(name = "marital_status", length = 30)
    private String maritalStatus;

    @Size(max = 100, message = "Language cannot exceed 100 characters")
    @Column(length = 100)
    private String language;

    @Size(max = 100, message = "Profession cannot exceed 100 characters")
    @Column(length = 100)
    private String profession;

    @Size(max = 255, message = "Present address cannot exceed 255 characters")
    @Column(name = "present_address")
    private String presentAddress;

    @Size(max = 50, message = "Financial condition cannot exceed 50 characters")
    @Column(name = "financial_condition", length = 50)
    private String financialCondition;

    @Size(max = 20, message = "Smoking habits cannot exceed 20 characters")
    @Column(name = "smoking_habits", length = 20)
    private String smokingHabits;

    @Size(max = 20, message = "Drinking status cannot exceed 20 characters")
    @Column(name = "drinking_status", length = 20)
    private String drinkingStatus;

    @Size(max = 100, message = "State cannot exceed 100 characters")
    @Column(length = 100)
    private String state;

    @Size(max = 100, message = "District cannot exceed 100 characters")
    @Column(length = 100)
    private String district;

    @Pattern(regexp = "^[0-9]{4,10}$", message = "Zip code must be between 4 and 10 digits")
    @Column(name = "zip_code", length = 10)
    private String zipCode;

    @Size(max = 10, message = "Blood group cannot exceed 10 characters")
    @Column(name = "blood_group", length = 10)
    private String bloodGroup;

    public BasicInformation() {
    }

    public BasicInformation(Long id, User user, String firstName, String lastName, LocalDate dateOfBirth,
                          String religion, String gender, String maritalStatus, String language,
                          String profession, String presentAddress, String financialCondition,
                          String smokingHabits, String drinkingStatus, String state, String district,
                          String zipCode, String bloodGroup) {
        this.id = id;
        this.user = user;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.religion = religion;
        this.gender = gender;
        this.maritalStatus = maritalStatus;
        this.language = language;
        this.profession = profession;
        this.presentAddress = presentAddress;
        this.financialCondition = financialCondition;
        this.smokingHabits = smokingHabits;
        this.drinkingStatus = drinkingStatus;
        this.state = state;
        this.district = district;
        this.zipCode = zipCode;
        this.bloodGroup = bloodGroup;
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

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getReligion() {
        return religion;
    }

    public void setReligion(String religion) {
        this.religion = religion;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getMaritalStatus() {
        return maritalStatus;
    }

    public void setMaritalStatus(String maritalStatus) {
        this.maritalStatus = maritalStatus;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getProfession() {
        return profession;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }

    public String getPresentAddress() {
        return presentAddress;
    }

    public void setPresentAddress(String presentAddress) {
        this.presentAddress = presentAddress;
    }

    public String getFinancialCondition() {
        return financialCondition;
    }

    public void setFinancialCondition(String financialCondition) {
        this.financialCondition = financialCondition;
    }

    public String getSmokingHabits() {
        return smokingHabits;
    }

    public void setSmokingHabits(String smokingHabits) {
        this.smokingHabits = smokingHabits;
    }

    public String getDrinkingStatus() {
        return drinkingStatus;
    }

    public void setDrinkingStatus(String drinkingStatus) {
        this.drinkingStatus = drinkingStatus;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }

}
