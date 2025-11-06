package com.santu.Backend_Matrilab.dto.response;

public class EducationInformationResponse {

    private Long id;
    private Long userId; // Change this to Long
    private String institute;
    private String degree;
    private String fieldOfStudy;
    private String registrationNumber;
    private String rollNumber;
    private String startYear;
    private String endYear;
    private String result;

    public EducationInformationResponse(Long id, Long userId, String institute, String degree,
                                        String fieldOfStudy, String registrationNumber,
                                        String rollNumber, String startYear, String endYear, String result) {
        this.id = id;
        this.userId = userId;  // No need to convert here if it's Long
        this.institute = institute;
        this.degree = degree;
        this.fieldOfStudy = fieldOfStudy;
        this.registrationNumber = registrationNumber;
        this.rollNumber = rollNumber;
        this.startYear = startYear;
        this.endYear = endYear;
        this.result = result;
    }

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
