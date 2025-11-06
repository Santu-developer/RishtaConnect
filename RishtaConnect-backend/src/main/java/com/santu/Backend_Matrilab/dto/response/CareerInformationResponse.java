package com.santu.Backend_Matrilab.dto.response;

public class CareerInformationResponse {
    private Long id;
    private Long userId;
    private String company;
    private String designation;
    private String startYear;
    private String endYear;

    public CareerInformationResponse() {
    }

    public CareerInformationResponse(Long id, Long userId, String company, String designation, String startYear, String endYear) {
        this.id = id;
        this.userId = userId;
        this.company = company;
        this.designation = designation;
        this.startYear = startYear;
        this.endYear = endYear;
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
