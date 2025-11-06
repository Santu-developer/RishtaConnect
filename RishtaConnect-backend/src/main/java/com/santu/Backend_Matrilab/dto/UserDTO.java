package com.santu.Backend_Matrilab.dto;


import com.santu.Backend_Matrilab.dto.request.*;
import java.util.ArrayList;
import java.util.List;

public class UserDTO {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String role;
    private BasicInformationDTO basicInformation;
    private FamilyInformationDTO familyInformation;
    private PhysicalAttributesDTO physicalAttributes;
    private List<CareerInformationDTO> careerInformation = new ArrayList<>();
    private List<EducationInformationDTO> educationInformation  = new ArrayList<>();
    private List<GalleryDTO> galleries  = new ArrayList<>();
    private List<PartnerExpectationsDTO> partnerExpectations = new ArrayList<>();
    private List<PurchaseHistoryDTO> purchaseHistories = new ArrayList<>();
    private List<ShortlistedProfileDTO> shortlistedProfiles = new ArrayList<>();
    private List<MyInterestDTO> myInterests = new ArrayList<>();
    private List<InterestRequestDTO> interestRequests = new ArrayList<>();
    private List<IgnoredProfileDTO> ignoredProfiles = new ArrayList<>();
    private List<SupportTicketDTO> supportTickets = new ArrayList<>();
    private CurrentPackageDTO currentPackage;

    public UserDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public BasicInformationDTO getBasicInformation() {
        return basicInformation;
    }

    public void setBasicInformation(BasicInformationDTO basicInformation) {
        this.basicInformation = basicInformation;
    }

    public FamilyInformationDTO getFamilyInformation() {
        return familyInformation;
    }

    public void setFamilyInformation(FamilyInformationDTO familyInformation) {
        this.familyInformation = familyInformation;
    }

    public PhysicalAttributesDTO getPhysicalAttributes() {
        return physicalAttributes;
    }

    public void setPhysicalAttributes(PhysicalAttributesDTO physicalAttributes) {
        this.physicalAttributes = physicalAttributes;
    }

    public List<CareerInformationDTO> getCareerInformation() {
        return careerInformation;
    }

    public void setCareerInformation(List<CareerInformationDTO> careerInformation) {
        this.careerInformation = careerInformation;
    }

    public List<EducationInformationDTO> getEducationInformation() {
        return educationInformation;
    }

    public void setEducationInformation(List<EducationInformationDTO> educationInformation) {
        this.educationInformation = educationInformation;
    }

    public List<GalleryDTO> getGalleries() {
        return galleries;
    }

    public void setGalleries(List<GalleryDTO> galleries) {
        this.galleries = galleries;
    }

    public List<PartnerExpectationsDTO> getPartnerExpectations() {
        return partnerExpectations;
    }

    public void setPartnerExpectations(List<PartnerExpectationsDTO> partnerExpectations) {
        this.partnerExpectations = partnerExpectations;
    }

    public List<PurchaseHistoryDTO> getPurchaseHistories() {
        return purchaseHistories;
    }

    public void setPurchaseHistories(List<PurchaseHistoryDTO> purchaseHistories) {
        this.purchaseHistories = purchaseHistories;
    }

    public List<ShortlistedProfileDTO> getShortlistedProfiles() {
        return shortlistedProfiles;
    }

    public void setShortlistedProfiles(List<ShortlistedProfileDTO> shortlistedProfiles) {
        this.shortlistedProfiles = shortlistedProfiles;
    }

    public List<MyInterestDTO> getMyInterests() {
        return myInterests;
    }

    public void setMyInterests(List<MyInterestDTO> myInterests) {
        this.myInterests = myInterests;
    }

    public List<InterestRequestDTO> getInterestRequests() {
        return interestRequests;
    }

    public void setInterestRequests(List<InterestRequestDTO> interestRequests) {
        this.interestRequests = interestRequests;
    }

    public List<IgnoredProfileDTO> getIgnoredProfiles() {
        return ignoredProfiles;
    }

    public void setIgnoredProfiles(List<IgnoredProfileDTO> ignoredProfiles) {
        this.ignoredProfiles = ignoredProfiles;
    }

    public List<SupportTicketDTO> getSupportTickets() {
        return supportTickets;
    }

    public void setSupportTickets(List<SupportTicketDTO> supportTickets) {
        this.supportTickets = supportTickets;
    }

    public CurrentPackageDTO getCurrentPackage() {
        return currentPackage;
    }

    public void setCurrentPackage(CurrentPackageDTO currentPackage) {
        this.currentPackage = currentPackage;
    }

    public UserDTO(Long id, String firstName, String lastName, String email, String role, BasicInformationDTO basicInformation, FamilyInformationDTO familyInformation, PhysicalAttributesDTO physicalAttributes, List<CareerInformationDTO> careerInformation, List<EducationInformationDTO> educationInformation, List<GalleryDTO> galleries, List<PartnerExpectationsDTO> partnerExpectations, List<PurchaseHistoryDTO> purchaseHistories, List<ShortlistedProfileDTO> shortlistedProfiles, List<MyInterestDTO> myInterests, List<InterestRequestDTO> interestRequests, List<IgnoredProfileDTO> ignoredProfiles, List<SupportTicketDTO> supportTickets, CurrentPackageDTO currentPackage) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
        this.basicInformation = basicInformation;
        this.familyInformation = familyInformation;
        this.physicalAttributes = physicalAttributes;
        this.careerInformation = careerInformation;
        this.educationInformation = educationInformation;
        this.galleries = galleries;
        this.partnerExpectations = partnerExpectations;
        this.purchaseHistories = purchaseHistories;
        this.shortlistedProfiles = shortlistedProfiles;
        this.myInterests = myInterests;
        this.interestRequests = interestRequests;
        this.ignoredProfiles = ignoredProfiles;
        this.supportTickets = supportTickets;
        this.currentPackage = currentPackage;
    }
}
