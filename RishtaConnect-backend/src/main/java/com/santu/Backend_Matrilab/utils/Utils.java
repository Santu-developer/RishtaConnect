package com.santu.Backend_Matrilab.utils;

import com.santu.Backend_Matrilab.dto.*;
import com.santu.Backend_Matrilab.dto.request.*;
import com.santu.Backend_Matrilab.entities.*;

import java.security.SecureRandom;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class Utils {

    private static final String ALPHANUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final SecureRandom secureRandom = new SecureRandom();
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    // Method to generate random confirmation code
    public static String generateRandomConfirmationCode(int length) {
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(ALPHANUMERIC_STRING.length());
            char randomChar = ALPHANUMERIC_STRING.charAt(randomIndex);
            stringBuilder.append(randomChar);
        }
        return stringBuilder.toString();
    }

    // Mapping User Entity to UserDTO
    public static UserDTO mapUserEntityToUserDTO(User user) {
        UserDTO userDTO = new UserDTO();

        // Map basic user information
        userDTO.setId(user.getId());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setEmail(user.getEmail());
        userDTO.setRole(user.getRole());

        // Mapping PhysicalAttributes if present
        if (user.getPhysicalAttributes() != null) {
            PhysicalAttributes physicalAttributes = user.getPhysicalAttributes();
            userDTO.setPhysicalAttributes(new PhysicalAttributesDTO(  // Map to PhysicalAttributesDTO
                    physicalAttributes.getId(),
                    physicalAttributes.getComplexion(),
                    physicalAttributes.getHeight(),
                    physicalAttributes.getWeight(),
                    physicalAttributes.getEyeColor(),
                    physicalAttributes.getHairColor(),
                    physicalAttributes.getDisability(),
                    user.getId() // passing user ID as userId
            ));
        } else {
            // Provide default values if no physical attributes are present
            userDTO.setPhysicalAttributes(new PhysicalAttributesDTO(
                    null, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", null // passing null for userId
            ));
        }

        if (user.getFamilyInformation() != null) {
            FamilyInformation familyInfo = user.getFamilyInformation();
            userDTO.setFamilyInformation(new FamilyInformationDTO(  // Map to FamilyInformationDTO
                    familyInfo.getId(),
                    familyInfo.getFathersName(),
                    familyInfo.getFathersProfession(),
                    familyInfo.getFathersContact(),
                    familyInfo.getMothersName(),
                    familyInfo.getMothersProfession(),
                    familyInfo.getMothersContact(),
                    familyInfo.getTotalBrother(),
                    familyInfo.getTotalSister(),
                    user.getId() // passing user ID as userId
            ));
        } else {
            // Provide default values if no family information is present
            userDTO.setFamilyInformation(new FamilyInformationDTO(
                    null, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 0, 0, 0L // Use 0L for default Long value
            ));

        }
        if (user.getBasicInformation() != null) {
            BasicInformation basicInfo = user.getBasicInformation();
            userDTO.setBasicInformation(new BasicInformationDTO(  // Map to BasicInformationDTO
                    basicInfo.getId(),
                    basicInfo.getFirstName(),
                    basicInfo.getLastName(),
                    basicInfo.getDateOfBirth() != null ? basicInfo.getDateOfBirth().format(DATE_FORMATTER) : "N/A",
                    basicInfo.getReligion(),
                    basicInfo.getGender(),
                    basicInfo.getMaritalStatus(),
                    basicInfo.getLanguage(),
                    basicInfo.getProfession(),
                    basicInfo.getPresentAddress(),
                    basicInfo.getFinancialCondition(),
                    basicInfo.getSmokingHabits(),
                    basicInfo.getDrinkingStatus(),
                    basicInfo.getState(),
                    basicInfo.getDistrict(),
                    basicInfo.getZipCode(),
                    basicInfo.getBloodGroup(),
                    user.getId() // passing user ID as userId
            ));
        } else {
            // Provide default values if no basic information is present
            userDTO.setBasicInformation(new BasicInformationDTO(
                    0L, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A",
                    "N/A", "N/A", "N/A", "N/A", "N/A", "000000", "N/A", 0L // Removed division and taluk
            ));

        }

        // Assuming user.getPartnerExpectations() returns a List<PartnerExpectations>
        if (user.getPartnerExpectations() != null && !user.getPartnerExpectations().isEmpty()) {
            List<PartnerExpectations> partnerExpectationsList = user.getPartnerExpectations();

            // Map each PartnerExpectations entity to PartnerExpectationsDTO and collect into a list
            List<PartnerExpectationsDTO> partnerExpectationsDTOList = new ArrayList<>();

            for (PartnerExpectations partnerExpectations : partnerExpectationsList) {
                PartnerExpectationsDTO partnerExpectationsDTO = new PartnerExpectationsDTO(
                        partnerExpectations.getId(),
                        partnerExpectations.getUser() != null ? partnerExpectations.getUser().getId() : null, // Map userId
                        partnerExpectations.getGeneralRequirement(),
                        partnerExpectations.getPreferredMinAge(),
                        partnerExpectations.getPreferredMaxAge(),
                        partnerExpectations.getPreferredMinHeight(),
                        partnerExpectations.getPreferredMaxHeight(),
                        partnerExpectations.getPreferredMaxWeight(),
                        partnerExpectations.getPreferredComplexion(),
                        partnerExpectations.getPreferredEducation(),
                        partnerExpectations.getPreferredOccupation(),
                        partnerExpectations.getPreferredLanguages(),
                        partnerExpectations.getPreferredPersonality(),
                        partnerExpectations.getPreferredFamilyValues()
                );

                partnerExpectationsDTOList.add(partnerExpectationsDTO);
            }

            // Set the list of PartnerExpectationsDTO objects in userDTO
            userDTO.setPartnerExpectations(partnerExpectationsDTOList);
        } else {
            // If there are no partner expectations, set an empty list or default list if needed
            List<PartnerExpectationsDTO> emptyList = new ArrayList<>();
            userDTO.setPartnerExpectations(emptyList);
        }


        // Assuming user.getEducationInformation() returns a List<EducationInformation>
        if (user.getEducationInformation() != null && !user.getEducationInformation().isEmpty()) {
            List<EducationInformation> educationInformationList = user.getEducationInformation();

            // Map each EducationInformation entity to EducationInformationDTO and collect into a list
            List<EducationInformationDTO> educationInformationDTOList = new ArrayList<>();

            for (EducationInformation educationInformation : educationInformationList) {
                EducationInformationDTO educationInformationDTO = new EducationInformationDTO(
                        educationInformation.getId(),
                        educationInformation.getUser() != null ? educationInformation.getUser().getId() : null, // Map userId
                        educationInformation.getInstitute(),
                        educationInformation.getDegree(),
                        educationInformation.getFieldOfStudy(),
                        educationInformation.getRegistrationNumber(),
                        educationInformation.getRollNumber(),
                        educationInformation.getStartYear(),
                        educationInformation.getEndYear(),
                        educationInformation.getResult()
                );

                educationInformationDTOList.add(educationInformationDTO);
            }

            // Set the list of EducationInformationDTO objects in userDTO
            userDTO.setEducationInformation(educationInformationDTOList);
        } else {
            // If there is no education information, set an empty list or a default list if needed
            List<EducationInformationDTO> emptyList = new ArrayList<>();
            userDTO.setEducationInformation(emptyList);
        }


        if (user.getCareerInformation() != null && !user.getCareerInformation().isEmpty()) {
            List<CareerInformation> careerInformationList = user.getCareerInformation();

            // Map each CareerInformation entity to CareerInformationDTO and collect into a list
            List<CareerInformationDTO> careerInformationDTOList = new ArrayList<>();

            for (CareerInformation careerInformation : careerInformationList) {
                CareerInformationDTO careerInformationDTO = new CareerInformationDTO(
                        careerInformation.getId(),
                        careerInformation.getUser() != null ? careerInformation.getUser().getId() : null, // Map userId
                        careerInformation.getCompany(),
                        careerInformation.getDesignation(),
                        careerInformation.getStartYear(),
                        careerInformation.getEndYear()
                );

                careerInformationDTOList.add(careerInformationDTO);
            }

            // Set the list of CareerInformationDTO objects in userDTO
            userDTO.setCareerInformation(careerInformationDTOList);
        } else {
            // If there is no career information, set an empty list or a default list if needed
            List<CareerInformationDTO> emptyList = new ArrayList<>();
            userDTO.setCareerInformation(emptyList);
        }








        return userDTO;
    }

}
