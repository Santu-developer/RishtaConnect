package com.santu.Backend_Matrilab.service.impl;

import com.santu.Backend_Matrilab.dto.request.PartnerExpectationsDTO;
import com.santu.Backend_Matrilab.dto.response.PartnerExpectationsResponse;
import com.santu.Backend_Matrilab.entities.PartnerExpectations;
import com.santu.Backend_Matrilab.entities.User;
import com.santu.Backend_Matrilab.repository.PartnerExpectationsRepository;
import com.santu.Backend_Matrilab.repository.UserRepository;
import com.santu.Backend_Matrilab.service.interfac.PartnerExpectationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PartnerExpectationsServiceImpl implements PartnerExpectationsService {

    @Autowired
    private PartnerExpectationsRepository partnerExpectationsRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public PartnerExpectationsResponse savePartnerExpectations(PartnerExpectationsDTO requestDTO) {
        Long userId = requestDTO.getUserId();
        if (userId == null) {
            throw new RuntimeException("User ID is required to save partner expectations.");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        PartnerExpectations partnerExpectations = mapDTOToEntity(requestDTO, new PartnerExpectations());
        partnerExpectations.setUser(user);
        PartnerExpectations savedEntity = partnerExpectationsRepository.save(partnerExpectations);

        return mapEntityToResponse(savedEntity);
    }

    @Override
    public List<PartnerExpectationsResponse> getAllPartnerExpectations() {
        return partnerExpectationsRepository.findAll().stream()
                .map(this::mapEntityToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public PartnerExpectationsResponse updatePartnerExpectations(Long id, PartnerExpectationsDTO requestDTO) {
        PartnerExpectations partnerExpectations = partnerExpectationsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("PartnerExpectations not found with ID: " + id));

        mapDTOToEntity(requestDTO, partnerExpectations);
        PartnerExpectations updatedEntity = partnerExpectationsRepository.save(partnerExpectations);

        return mapEntityToResponse(updatedEntity);
    }

    @Override
    public PartnerExpectationsResponse getPartnerExpectationsByUserId(Long userId) {
        System.out.println("Fetching Partner Expectations for User ID: " + userId);

        PartnerExpectations entity = partnerExpectationsRepository.findByUserId(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, 
                    "Partner Expectations not found for user ID: " + userId));

        return mapEntityToResponse(entity);
    }


    // Helper methods for mapping
    private PartnerExpectations mapDTOToEntity(PartnerExpectationsDTO dto, PartnerExpectations entity) {
        entity.setGeneralRequirement(dto.getGeneralRequirement());
        entity.setPreferredMinAge(dto.getPreferredMinAge());
        entity.setPreferredMaxAge(dto.getPreferredMaxAge());
        entity.setPreferredMinHeight(dto.getPreferredMinHeight());
        entity.setPreferredMaxHeight(dto.getPreferredMaxHeight());
        entity.setPreferredMaxWeight(dto.getPreferredMaxWeight());
        entity.setPreferredComplexion(dto.getPreferredComplexion());
        entity.setPreferredEducation(dto.getPreferredEducation());
        entity.setPreferredOccupation(dto.getPreferredOccupation());
        entity.setPreferredLanguages(dto.getPreferredLanguages());
        entity.setPreferredPersonality(dto.getPreferredPersonality());
        entity.setPreferredFamilyValues(dto.getPreferredFamilyValues());
        return entity;
    }


    private PartnerExpectationsResponse mapEntityToResponse(PartnerExpectations entity) {
        Long userId = entity.getUser() != null ? entity.getUser().getId() : null;
        return new PartnerExpectationsResponse(
                entity.getId(),
                userId,
                entity.getGeneralRequirement(),
                entity.getPreferredMinAge(),
                entity.getPreferredMaxAge(),
                entity.getPreferredMinHeight(),
                entity.getPreferredMaxHeight(),
                entity.getPreferredMaxWeight(),
                entity.getPreferredComplexion(),
                entity.getPreferredEducation(),
                entity.getPreferredOccupation(),
                entity.getPreferredLanguages(),
                entity.getPreferredPersonality(),
                entity.getPreferredFamilyValues()
        );
    }
}


