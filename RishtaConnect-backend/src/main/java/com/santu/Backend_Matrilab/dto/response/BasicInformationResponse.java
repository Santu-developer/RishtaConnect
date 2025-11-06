package com.santu.Backend_Matrilab.dto.response;

public class BasicInformationResponse {

    private Long id;
    private Long userId;
    private String firstName;
    private String lastName;
    private String dateOfBirth;
    private String religion;
    private String gender;
    private String maritalStatus;
    private String language;
    private String profession;
    private String presentAddress;
    private String financialCondition;
    private String smokingHabits;
    private String drinkingStatus;
    private String state;
    private String district;
    private String zipCode;
    private String bloodGroup;

    // Constructor
    public BasicInformationResponse(Long id, Long userId, String firstName, String lastName, String dateOfBirth,
                                    String religion, String gender, String maritalStatus, String language,
                                    String profession, String presentAddress, String financialCondition,
                                    String smokingHabits, String drinkingStatus, String state, String district,
                                    String zipCode, String bloodGroup) {
        this.id = id;
        this.userId = userId;
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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
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

    public String getBloodGroup() { return bloodGroup; }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }
}
