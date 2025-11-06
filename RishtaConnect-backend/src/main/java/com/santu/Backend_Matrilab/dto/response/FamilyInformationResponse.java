package com.santu.Backend_Matrilab.dto.response;
public class FamilyInformationResponse {

    private Long id;
    private Long userId; // ID of the associated user
    private String fathersName;
    private String fathersProfession;
    private String fathersContact;
    private String mothersName;
    private String mothersProfession;
    private String mothersContact;
    private int totalBrother;
    private int totalSister;


    // Default constructor
    public FamilyInformationResponse() {
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

    public String getFathersName() {
        return fathersName;
    }

    public void setFathersName(String fathersName) {
        this.fathersName = fathersName;
    }

    public String getFathersProfession() {
        return fathersProfession;
    }

    public void setFathersProfession(String fathersProfession) {
        this.fathersProfession = fathersProfession;
    }

    public String getFathersContact() {
        return fathersContact;
    }

    public void setFathersContact(String fathersContact) {
        this.fathersContact = fathersContact;
    }

    public String getMothersName() {
        return mothersName;
    }

    public void setMothersName(String mothersName) {
        this.mothersName = mothersName;
    }

    public String getMothersProfession() {
        return mothersProfession;
    }

    public void setMothersProfession(String mothersProfession) {
        this.mothersProfession = mothersProfession;
    }

    public String getMothersContact() {
        return mothersContact;
    }

    public void setMothersContact(String mothersContact) {
        this.mothersContact = mothersContact;
    }

    public int getTotalBrother() {
        return totalBrother;
    }

    public void setTotalBrother(int totalBrother) {
        this.totalBrother = totalBrother;
    }

    public int getTotalSister() {
        return totalSister;
    }

    public void setTotalSister(int totalSister) {
        this.totalSister = totalSister;
    }

    public FamilyInformationResponse(Long id, Long userId, String fathersName, String fathersProfession, String fathersContact, String mothersName, String mothersProfession, String mothersContact, int totalBrother, int totalSister) {
        this.id = id;
        this.userId = userId;
        this.fathersName = fathersName;
        this.fathersProfession = fathersProfession;
        this.fathersContact = fathersContact;
        this.mothersName = mothersName;
        this.mothersProfession = mothersProfession;
        this.mothersContact = mothersContact;
        this.totalBrother = totalBrother;
        this.totalSister = totalSister;
    }
}
