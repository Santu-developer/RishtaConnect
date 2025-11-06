//package com.santu.Backend_Matrilab.dto.request;
//
//public class BasicInformationDTO {
//
//    private Long id;
//    private Long userId; // Only include user ID
//    private String firstName;
//    private String lastName;
//    private String dateOfBirth;
//    private String religion;
//    private String gender;
//    private String maritalStatus;
//    private String language;
//    private String profession;
//    private String presentAddress;
//    private String financialCondition;
//    private String smokingHabits;
//    private String drinkingStatus;
//    private String district;
//    private String division;
//    private String taluk;
//    private String zipCode;
//
//    public BasicInformationDTO() {
//    }
//
//    public BasicInformationDTO(long l, String s, String s1, String s2, String s3, String s4, String s5, String s6, String s7, String s8, String s9, String s10, String s11, String s12, String s13, String number, long l1) {
//    }
//    // Getters and Setters
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public Long getUserId() {
//        return userId;
//    }
//
//    public void setUserId(Long userId) {
//        this.userId = userId;
//    }
//
//    public String getFirstName() {
//        return firstName;
//    }
//
//    public void setFirstName(String firstName) {
//        this.firstName = firstName;
//    }
//
//    public String getLastName() {
//        return lastName;
//    }
//
//    public void setLastName(String lastName) {
//        this.lastName = lastName;
//    }
//
//    public String getDateOfBirth() {
//        return dateOfBirth;
//    }
//
//    public void setDateOfBirth(String dateOfBirth) {
//        this.dateOfBirth = dateOfBirth;
//    }
//
//    public String getReligion() {
//        return religion;
//    }
//
//    public void setReligion(String religion) {
//        this.religion = religion;
//    }
//
//    public String getGender() {
//        return gender;
//    }
//
//    public void setGender(String gender) {
//        this.gender = gender;
//    }
//
//    public String getMaritalStatus() {
//        return maritalStatus;
//    }
//
//    public void setMaritalStatus(String maritalStatus) {
//        this.maritalStatus = maritalStatus;
//    }
//
//    public String getLanguage() {
//        return language;
//    }
//
//    public void setLanguage(String language) {
//        this.language = language;
//    }
//
//    public String getProfession() {
//        return profession;
//    }
//
//    public void setProfession(String profession) {
//        this.profession = profession;
//    }
//
//    public String getPresentAddress() {
//        return presentAddress;
//    }
//
//    public void setPresentAddress(String presentAddress) {
//        this.presentAddress = presentAddress;
//    }
//
//    public String getFinancialCondition() {
//        return financialCondition;
//    }
//
//    public void setFinancialCondition(String financialCondition) {
//        this.financialCondition = financialCondition;
//    }
//
//    public String getSmokingHabits() {
//        return smokingHabits;
//    }
//
//    public void setSmokingHabits(String smokingHabits) {
//        this.smokingHabits = smokingHabits;
//    }
//
//    public String getDrinkingStatus() {
//        return drinkingStatus;
//    }
//
//    public void setDrinkingStatus(String drinkingStatus) {
//        this.drinkingStatus = drinkingStatus;
//    }
//
//    public String getDistrict() {
//        return district;
//    }
//
//    public void setDistrict(String district) {
//        this.district = district;
//    }
//
//    public String getDivision() {
//        return division;
//    }
//
//    public void setDivision(String division) {
//        this.division = division;
//    }
//
//    public String getTaluk() {
//        return taluk;
//    }
//
//    public void setTaluk(String taluk) {
//        this.taluk = taluk;
//    }
//
//    public String getZipCode() {
//        return zipCode;
//    }
//
//    public void setZipCode(String zipCode) {
//        this.zipCode = zipCode;
//    }
//
//    public BasicInformationDTO(Long id, String firstName, String lastName, String dateOfBirth, String religion,
//                               String gender, String maritalStatus, String language, String profession,
//                               String presentAddress, String financialCondition, String smokingHabits,
//                               String drinkingStatus, String district, String division, String taluk,
//                               String zipCode, Long userId) {
//        this.id = (id != null) ? id : 0L;  // Default to 0 if null
//        this.firstName = (firstName != null) ? firstName : "N/A";
//        this.lastName = (lastName != null) ? lastName : "N/A";
//        this.dateOfBirth = (dateOfBirth != null) ? dateOfBirth : "N/A";
//        this.religion = (religion != null) ? religion : "N/A";
//        this.gender = (gender != null) ? gender : "N/A";
//        this.maritalStatus = (maritalStatus != null) ? maritalStatus : "N/A";
//        this.language = (language != null) ? language : "N/A";
//        this.profession = (profession != null) ? profession : "N/A";
//        this.presentAddress = (presentAddress != null) ? presentAddress : "N/A";
//        this.financialCondition = (financialCondition != null) ? financialCondition : "N/A";
//        this.smokingHabits = (smokingHabits != null) ? smokingHabits : "N/A";
//        this.drinkingStatus = (drinkingStatus != null) ? drinkingStatus : "N/A";
//        this.district = (district != null) ? district : "N/A";
//        this.division = (division != null) ? division : "N/A";
//        this.taluk = (taluk != null) ? taluk : "N/A";
//        this.zipCode = (zipCode != null) ? zipCode : "000000";
//        this.userId = (userId != null) ? userId : 0L; // Default to 0L if null
//    }
//
//
//
//}

package com.santu.Backend_Matrilab.dto.request;

public class BasicInformationDTO {

    private Long id;
    private Long userId; // User ID
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
    private String bloodGroup; // Blood Group field

    // Default constructor
    public BasicInformationDTO() {
    }

    // Constructor with all fields, including bloodGroup and userId
    public BasicInformationDTO(Long id, String firstName, String lastName, String dateOfBirth, String religion,
                               String gender, String maritalStatus, String language, String profession,
                               String presentAddress, String financialCondition, String smokingHabits,
                               String drinkingStatus, String state, String district,
                               String zipCode, String bloodGroup, Long userId) {
        this.id = (id != null) ? id : 0L; // Set to 0 if null
        this.firstName = (firstName != null) ? firstName : "N/A";
        this.lastName = (lastName != null) ? lastName : "N/A";
        this.dateOfBirth = (dateOfBirth != null) ? dateOfBirth : "N/A";
        this.religion = (religion != null) ? religion : "N/A";
        this.gender = (gender != null) ? gender : "N/A";
        this.maritalStatus = (maritalStatus != null) ? maritalStatus : "N/A";
        this.language = (language != null) ? language : "N/A";
        this.profession = (profession != null) ? profession : "N/A";
        this.presentAddress = (presentAddress != null) ? presentAddress : "N/A";
        this.financialCondition = (financialCondition != null) ? financialCondition : "N/A";
        this.smokingHabits = (smokingHabits != null) ? smokingHabits : "N/A";
        this.drinkingStatus = (drinkingStatus != null) ? drinkingStatus : "N/A";
        this.state = (state != null) ? state : "N/A";
        this.district = (district != null) ? district : "N/A";
        this.zipCode = (zipCode != null) ? zipCode : "000000";
        this.bloodGroup = (bloodGroup != null) ? bloodGroup : "N/A"; // Blood group default value
        this.userId = (userId != null) ? userId : 0L; // Default to 0 if userId is null
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

    public String getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }
}
