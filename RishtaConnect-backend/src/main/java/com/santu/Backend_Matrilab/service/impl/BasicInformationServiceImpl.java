package com.santu.Backend_Matrilab.service.impl;

import com.santu.Backend_Matrilab.dto.request.BasicInformationDTO;
import com.santu.Backend_Matrilab.dto.response.BasicInformationResponse;
import com.santu.Backend_Matrilab.entities.BasicInformation;
import com.santu.Backend_Matrilab.entities.User;
import com.santu.Backend_Matrilab.repository.BasicInformationRepository;
import com.santu.Backend_Matrilab.repository.UserRepository;
import com.santu.Backend_Matrilab.service.interfac.BasicInformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BasicInformationServiceImpl implements BasicInformationService {

    @Autowired
    private BasicInformationRepository basicInformationRepository;

    @Autowired
    private UserRepository userRepository;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    @Override
    public BasicInformationResponse saveBasicInformation(BasicInformationDTO requestDTO) {
        Long userId = requestDTO.getUserId();
        if (userId == null) {
            throw new RuntimeException("User ID is required.");
        }

        // Check if user exists
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        // Check if basic information already exists for the user
        BasicInformation basicInformation = basicInformationRepository.findByUser_Id(userId).orElse(null);

        if (basicInformation != null) {
            // Update existing record
            mapDTOToEntity(requestDTO, basicInformation);
        } else {
            // Create new record
            basicInformation = mapDTOToEntity(requestDTO, new BasicInformation());
            basicInformation.setUser(user);
        }

        BasicInformation savedEntity = basicInformationRepository.save(basicInformation);
        return mapEntityToResponse(savedEntity);
    }

    @Override
    public BasicInformationResponse getBasicInformationById(Long id) {
        BasicInformation basicInformation = basicInformationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Basic Information not found with ID: " + id));
        return mapEntityToResponse(basicInformation);
    }

    @Override
    public List<BasicInformationResponse> getAllBasicInformation() {
        return basicInformationRepository.findAll().stream()
                .map(this::mapEntityToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public BasicInformationResponse updateBasicInformation(Long id, BasicInformationDTO requestDTO) {
        BasicInformation basicInformation = basicInformationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Basic Information not found with ID: " + id));

        // Ensure userId matches the one in the basic information record
        if (!basicInformation.getUser().getId().equals(requestDTO.getUserId())) {
            throw new RuntimeException("User ID mismatch.");
        }

        mapDTOToEntity(requestDTO, basicInformation);
        BasicInformation updatedEntity = basicInformationRepository.save(basicInformation);
        return mapEntityToResponse(updatedEntity);
    }

    // ✅ UPDATED: Fetch Basic Information using userId
    public BasicInformationResponse getBasicInformationByUserId(Long userId) {
        BasicInformation basicInformation = basicInformationRepository.findByUser_Id(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, 
                    "Basic Information not found for User ID: " + userId));
        return mapEntityToResponse(basicInformation);
    }

    private BasicInformation mapDTOToEntity(BasicInformationDTO dto, BasicInformation entity) {
        entity.setFirstName(dto.getFirstName());
        entity.setLastName(dto.getLastName());

        // Convert String to LocalDate
        if (dto.getDateOfBirth() != null && !dto.getDateOfBirth().isEmpty()) {
            try {
                entity.setDateOfBirth(LocalDate.parse(dto.getDateOfBirth(), DATE_FORMATTER));
            } catch (Exception e) {
                entity.setDateOfBirth(null);
            }
        } else {
            entity.setDateOfBirth(null);
        }

        entity.setReligion(dto.getReligion());
        entity.setGender(dto.getGender());
        entity.setMaritalStatus(dto.getMaritalStatus());
        entity.setLanguage(dto.getLanguage());
        entity.setProfession(dto.getProfession());
        entity.setPresentAddress(dto.getPresentAddress());
        entity.setFinancialCondition(dto.getFinancialCondition());
        entity.setSmokingHabits(dto.getSmokingHabits());
        entity.setDrinkingStatus(dto.getDrinkingStatus());
        entity.setState(dto.getState());
        entity.setDistrict(dto.getDistrict());
        entity.setZipCode(dto.getZipCode());
        entity.setBloodGroup(dto.getBloodGroup() != null ? dto.getBloodGroup() : "Unknown");

        return entity;
    }

    private BasicInformationResponse mapEntityToResponse(BasicInformation entity) {
        return new BasicInformationResponse(
                entity.getId(),
                entity.getUser().getId(),
                entity.getFirstName(),
                entity.getLastName(),
                entity.getDateOfBirth() != null ? entity.getDateOfBirth().format(DATE_FORMATTER) : null,
                entity.getReligion(),
                entity.getGender(),
                entity.getMaritalStatus(),
                entity.getLanguage(),
                entity.getProfession(),
                entity.getPresentAddress(),
                entity.getFinancialCondition(),
                entity.getSmokingHabits(),
                entity.getDrinkingStatus(),
                entity.getState(),
                entity.getDistrict(),
                entity.getZipCode(),
                entity.getBloodGroup()
        );
    }
}
