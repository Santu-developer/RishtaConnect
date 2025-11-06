package com.santu.Backend_Matrilab.service.impl;

import com.santu.Backend_Matrilab.dto.request.FamilyInformationDTO;
import com.santu.Backend_Matrilab.dto.response.FamilyInformationResponse;
import com.santu.Backend_Matrilab.entities.FamilyInformation;
import com.santu.Backend_Matrilab.entities.User;
import com.santu.Backend_Matrilab.repository.FamilyInformationRepository;
import com.santu.Backend_Matrilab.repository.UserRepository;
import com.santu.Backend_Matrilab.service.interfac.FamilyInformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FamilyInformationServiceImpl implements FamilyInformationService {

    @Autowired
    private FamilyInformationRepository familyInformationRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public FamilyInformationResponse saveFamilyInformation(FamilyInformationDTO requestDTO) {
        // Extract userId from the DTO
        Long userId = requestDTO.getUserId();
        if (userId == null) {
            throw new RuntimeException("User ID is required to save family information.");
        }

        // Check if family information already exists for this user
        Optional<FamilyInformation> existingFamily = familyInformationRepository.findByUserId(userId);
        if (existingFamily.isPresent()) {
            throw new RuntimeException("Family information already exists for this user. Please use update instead.");
        }

        // Find the user by ID
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        // Map DTO to entity
        FamilyInformation familyInformation = mapDTOToEntity(requestDTO, new FamilyInformation());
        familyInformation.setUser(user);

        // Save the entity
        FamilyInformation savedEntity = familyInformationRepository.save(familyInformation);

        // Return response
        return mapEntityToResponse(savedEntity);
    }

    @Override
    public List<FamilyInformationResponse> getAllFamilyInformation() {
        return familyInformationRepository.findAll().stream()
                .map(this::mapEntityToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public FamilyInformationResponse updateFamilyInformation(Long id, FamilyInformationDTO requestDTO) {
        // Fetch the existing FamilyInformation by ID
        FamilyInformation familyInformation = familyInformationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Family Information not found with ID: " + id));

        // Map DTO to entity and update it
        mapDTOToEntity(requestDTO, familyInformation);
        FamilyInformation updatedEntity = familyInformationRepository.save(familyInformation);

        // Return response
        return mapEntityToResponse(updatedEntity);
    }

//    @Override
//    public FamilyInformationResponse getFamilyInformationById(Long id) {
//        // Fetch the FamilyInformation by ID
//        FamilyInformation familyInformation = familyInformationRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Family Information not found with ID: " + id));
//
//        // Return response
//        return mapEntityToResponse(familyInformation);
//    }

    @Override
    public FamilyInformationResponse getFamilyInformationByUserId(Long userId) {
        FamilyInformation familyInfo = familyInformationRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Family Information not found for user ID: " + userId));

        return mapEntityToResponse(familyInfo);
    }


    // Helper methods for mapping DTO to entity
    private FamilyInformation mapDTOToEntity(FamilyInformationDTO dto, FamilyInformation entity) {
        // Ensure that fields that should be Long or Integer are correctly mapped
        entity.setFathersName(dto.getFathersName());
        entity.setFathersProfession(dto.getFathersProfession());
        entity.setFathersContact(dto.getFathersContact());
        entity.setMothersName(dto.getMothersName());
        entity.setMothersProfession(dto.getMothersProfession());
        entity.setMothersContact(dto.getMothersContact());
        entity.setTotalBrother(dto.getTotalBrother());
        entity.setTotalSister(dto.getTotalSister());


        return entity;
    }

    // Helper method for mapping entity to response
    private FamilyInformationResponse mapEntityToResponse(FamilyInformation entity) {
        return new FamilyInformationResponse(
                entity.getId(),
                entity.getUser().getId(),
                entity.getFathersName(),
                entity.getFathersProfession(),
                entity.getFathersContact(),
                entity.getMothersName(),
                entity.getMothersProfession(),
                entity.getMothersContact(),
                entity.getTotalBrother(),
                entity.getTotalSister()
        );
    }
}
