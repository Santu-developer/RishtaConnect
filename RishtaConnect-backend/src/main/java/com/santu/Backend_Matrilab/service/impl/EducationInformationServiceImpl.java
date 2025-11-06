package com.santu.Backend_Matrilab.service.impl;

import com.santu.Backend_Matrilab.dto.request.EducationInformationDTO;
import com.santu.Backend_Matrilab.dto.response.EducationInformationResponse;
import com.santu.Backend_Matrilab.entities.EducationInformation;
import com.santu.Backend_Matrilab.entities.User;
import com.santu.Backend_Matrilab.repository.EducationInformationRepository;
import com.santu.Backend_Matrilab.repository.UserRepository;
import com.santu.Backend_Matrilab.service.interfac.EducationInformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EducationInformationServiceImpl implements EducationInformationService {

    @Autowired
    private EducationInformationRepository educationInformationRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public EducationInformationResponse saveEducationInformation(EducationInformationDTO requestDTO) {
        Long userId = requestDTO.getUserId();
        if (userId == null) {
            throw new RuntimeException("User ID is required to save education information.");
        }

        // Fetch user by userId and handle error if not found
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        EducationInformation educationInformation = mapDTOToEntity(requestDTO, new EducationInformation());
        educationInformation.setUser(user);  // Set the User object in the entity

        // Save and return the response
        EducationInformation savedEntity = educationInformationRepository.save(educationInformation);
        return mapEntityToResponse(savedEntity);
    }

    @Override
    public List<EducationInformationResponse> getAllEducationInformation() {
        return educationInformationRepository.findAll().stream()
                .map(this::mapEntityToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public EducationInformationResponse updateEducationInformation(Long id, EducationInformationDTO requestDTO) {
        EducationInformation educationInformation = educationInformationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("EducationInformation not found with ID: " + id));

        mapDTOToEntity(requestDTO, educationInformation);
        EducationInformation updatedEntity = educationInformationRepository.save(educationInformation);

        return mapEntityToResponse(updatedEntity);
    }

    @Override
    public void deleteEducationInformation(Long id) {
        educationInformationRepository.deleteById(id);
    }

//    @Override
//    public EducationInformationResponse getEducationInformationById(Long id) {
//        EducationInformation educationInformation = educationInformationRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("EducationInformation not found with ID: " + id));
//
//        return mapEntityToResponse(educationInformation);
//    }

    @Override
    public List<EducationInformationResponse> getEducationInformationByUserId(Long userId) {
        List<EducationInformation> educationList = educationInformationRepository.findByUserId(userId);

        // If no education information exists, return an empty list instead of throwing an error
        if (educationList.isEmpty()) {
            return Collections.emptyList();
        }

        return educationList.stream()
                .map(this::mapEntityToResponse)
                .collect(Collectors.toList());
    }



    // Helper methods for mapping DTO to entity
    private EducationInformation mapDTOToEntity(EducationInformationDTO dto, EducationInformation entity) {
        entity.setInstitute(dto.getInstitute());
        entity.setDegree(dto.getDegree());
        entity.setFieldOfStudy(dto.getFieldOfStudy());
        entity.setRegistrationNumber(dto.getRegistrationNumber());
        entity.setRollNumber(dto.getRollNumber());
        entity.setStartYear(dto.getStartYear());
        entity.setEndYear(dto.getEndYear());
        entity.setResult(dto.getResult());
        return entity;
    }

    // Helper method for mapping entity to response
    private EducationInformationResponse mapEntityToResponse(EducationInformation entity) {
        Long userId = entity.getUser() != null ? entity.getUser().getId() : null;
        return new EducationInformationResponse(
                entity.getId(),
                userId,
                entity.getInstitute(),
                entity.getDegree(),
                entity.getFieldOfStudy(),
                entity.getRegistrationNumber(),
                entity.getRollNumber(),
                entity.getStartYear(),
                entity.getEndYear(),
                entity.getResult()
        );
    }
}
