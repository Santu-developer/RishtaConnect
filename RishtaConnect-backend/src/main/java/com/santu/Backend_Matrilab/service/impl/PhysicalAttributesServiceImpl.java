package com.santu.Backend_Matrilab.service.impl;



import com.santu.Backend_Matrilab.dto.request.PhysicalAttributesDTO;
import com.santu.Backend_Matrilab.dto.response.PhysicalAttributesResponse;
import com.santu.Backend_Matrilab.entities.PhysicalAttributes;
import com.santu.Backend_Matrilab.entities.User;
import com.santu.Backend_Matrilab.repository.PhysicalAttributesRepository;
import com.santu.Backend_Matrilab.repository.UserRepository;
import com.santu.Backend_Matrilab.service.interfac.PhysicalAttributesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PhysicalAttributesServiceImpl implements PhysicalAttributesService {

    @Autowired
    private PhysicalAttributesRepository physicalAttributesRepository;

    @Autowired
    private UserRepository userRepository;
    @Override
    public PhysicalAttributesResponse savePhysicalAttributes(PhysicalAttributesDTO requestDTO) {
        // Assume userId is sent programmatically from frontend or derived from the logged-in context
        Long userId = requestDTO.getUserId();
        if (userId == null) {
            throw new RuntimeException("User ID is required to save physical attributes.");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        PhysicalAttributes physicalAttributes = mapDTOToEntity(requestDTO, new PhysicalAttributes());
        physicalAttributes.setUser(user);
        PhysicalAttributes savedEntity = physicalAttributesRepository.save(physicalAttributes);

        return mapEntityToResponse(savedEntity);
    }


    @Override
    public List<PhysicalAttributesResponse> getAllPhysicalAttributes() {
        return physicalAttributesRepository.findAll().stream()
                .map(this::mapEntityToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public PhysicalAttributesResponse updatePhysicalAttributes(Long id, PhysicalAttributesDTO requestDTO) {
        PhysicalAttributes physicalAttributes = physicalAttributesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("PhysicalAttributes not found with ID: " + id));

        mapDTOToEntity(requestDTO, physicalAttributes);
        PhysicalAttributes updatedEntity = physicalAttributesRepository.save(physicalAttributes);

        return mapEntityToResponse(updatedEntity);
    }

    @Override
//    public PhysicalAttributesResponse getPhysicalAttributesById(Long id) {
//        PhysicalAttributes physicalAttributes = physicalAttributesRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("PhysicalAttributes not found with ID: " + id));
//
//        return mapEntityToResponse(physicalAttributes);
//    }

    public PhysicalAttributesResponse getPhysicalAttributesByUserId(Long userId) {
        PhysicalAttributes physicalAttributes = physicalAttributesRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Physical Attributes not found for user ID: " + userId));

        return mapEntityToResponse(physicalAttributes);
    }


    // Helper methods for mapping
    private PhysicalAttributes mapDTOToEntity(PhysicalAttributesDTO dto, PhysicalAttributes entity) {
        entity.setComplexion(dto.getComplexion());
        entity.setHeight(dto.getHeight());
        entity.setWeight(dto.getWeight());
        entity.setEyeColor(dto.getEyeColor());
        entity.setHairColor(dto.getHairColor());
        entity.setDisability(dto.getDisability());
        return entity;
    }

    private PhysicalAttributesResponse mapEntityToResponse(PhysicalAttributes entity) {
        return new PhysicalAttributesResponse(
                entity.getId(),
                entity.getComplexion(),
                entity.getHeight(),
                entity.getWeight(),
                entity.getEyeColor(),
                entity.getHairColor(),
                entity.getDisability(),
                entity.getUser().getId()
        );
    }
}
