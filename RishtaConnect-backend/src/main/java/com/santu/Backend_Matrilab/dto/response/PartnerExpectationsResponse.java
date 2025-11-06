package com.santu.Backend_Matrilab.dto.response;
public class PartnerExpectationsResponse {

    private Long id;
    private Long userId;
    private String userFullName; // Assuming full name of the user for display
    private String generalRequirement;
    private Integer preferredMinAge;
    private Integer preferredMaxAge;
    private Double preferredMinHeight;
    private Double preferredMaxHeight;
    private Double preferredMaxWeight;
    private String preferredComplexion;
    private String preferredEducation;
    private String preferredOccupation;
    private String preferredLanguages;
    private String preferredPersonality;
    private String preferredFamilyValues;

    // Default Constructor
    public PartnerExpectationsResponse() {
    }

    // Parameterized Constructor
    public PartnerExpectationsResponse(Long id, Long userId, String generalRequirement, Integer preferredMinAge,
                                       Integer preferredMaxAge, Double preferredMinHeight, Double preferredMaxHeight,
                                       Double preferredMaxWeight,
                                       String preferredComplexion, String preferredEducation, String preferredOccupation,
                                       String preferredLanguages, String preferredPersonality, String preferredFamilyValues) {
        this.id = id;
        this.userId = userId;
        this.generalRequirement = generalRequirement;
        this.preferredMinAge = preferredMinAge;
        this.preferredMaxAge = preferredMaxAge;
        this.preferredMinHeight = preferredMinHeight;
        this.preferredMaxHeight = preferredMaxHeight;
        this.preferredMaxWeight = preferredMaxWeight;
        this.preferredComplexion = preferredComplexion;
        this.preferredEducation = preferredEducation;
        this.preferredOccupation = preferredOccupation;
        this.preferredLanguages = preferredLanguages;
        this.preferredPersonality = preferredPersonality;
        this.preferredFamilyValues = preferredFamilyValues;
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

    public String getUserFullName() {
        return userFullName;
    }

    public void setUserFullName(String userFullName) {
        this.userFullName = userFullName;
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
