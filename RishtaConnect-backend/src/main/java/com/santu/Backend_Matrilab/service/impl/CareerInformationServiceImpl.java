package com.santu.Backend_Matrilab.service.impl;

import com.santu.Backend_Matrilab.dto.request.CareerInformationDTO;
import com.santu.Backend_Matrilab.dto.response.CareerInformationResponse;
import com.santu.Backend_Matrilab.entities.CareerInformation;
import com.santu.Backend_Matrilab.entities.User;
import com.santu.Backend_Matrilab.repository.CareerInformationRepository;
import com.santu.Backend_Matrilab.repository.UserRepository;
import com.santu.Backend_Matrilab.service.interfac.CareerInformationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CareerInformationServiceImpl implements CareerInformationService {

    @Autowired
    private CareerInformationRepository careerInformationRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public CareerInformationResponse saveCareerInformation(CareerInformationDTO requestDTO) {
        Long userId = requestDTO.getUserId();
        if (userId == null) {
            throw new RuntimeException("User ID is required to save career information.");
        }

        // Fetch user by userId and handle error if not found
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        CareerInformation careerInformation = mapDTOToEntity(requestDTO, new CareerInformation());
        careerInformation.setUser(user); // Set the User object in the entity

        // Save and return the response
        CareerInformation savedEntity = careerInformationRepository.save(careerInformation);
        return mapEntityToResponse(savedEntity);
    }

    @Override
    public List<CareerInformationResponse> getAllCareerInformation() {
        return careerInformationRepository.findAll().stream()
                .map(this::mapEntityToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public CareerInformationResponse updateCareerInformation(Long id, CareerInformationDTO requestDTO) {
        // Fetch the career information by ID
        CareerInformation careerInformation = careerInformationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("CareerInformation not found with ID: " + id));

        // Update the entity with new values from the DTO
        mapDTOToEntity(requestDTO, careerInformation);

        // Save the updated entity
        CareerInformation updatedEntity = careerInformationRepository.save(careerInformation);
        return mapEntityToResponse(updatedEntity);
    }

    @Override
    public boolean deleteCareerInformation(Long id) {
        Optional<CareerInformation> career = careerInformationRepository.findById(id);
        if (career.isPresent()) {
            careerInformationRepository.deleteById(id);
            return true;
        }
        return false;
    }


    @Override
//    public CareerInformationResponse getCareerInformationById(Long id) {
//        // Fetch the career information by ID
//        CareerInformation careerInformation = careerInformationRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("CareerInformation not found with ID: " + id));
//
//        return mapEntityToResponse(careerInformation);
//    }

    public List<CareerInformationResponse> getCareerInformationByUserId(Long userId) {
        List<CareerInformation> careerList = careerInformationRepository.findByUserId(userId);
        
        if (careerList.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No career information found for user ID: " + userId);
        }

        return careerList.stream()
                .map(this::mapEntityToResponse)
                .collect(Collectors.toList());
    }



    // Helper methods for mapping DTO to entity
//    private CareerInformation mapDTOToEntity(CareerInformationDTO dto, CareerInformation entity) {
//        entity.setCompanyName(dto.getCompanyName());
//        entity.setJobTitle(dto.getJobTitle());
//        entity.setJobLocation(dto.getJobLocation());
//        entity.setStartDate(dto.getStartDate());
//        entity.setEndDate(dto.getEndDate());
//        entity.setSalary(dto.getSalary());
//        return entity;
//    }
//
//    // Helper method for mapping entity to response
//    private CareerInformationResponse mapEntityToResponse(CareerInformation entity) {
//        Long userId = entity.getUser() != null ? entity.getUser().getId() : null;
//        return new CareerInformationResponse(
//                entity.getId(),
//                userId,
//                entity.getCompany(),
//                entity.getJobTitle(),
//                entity.getJobLocation(),
//                entity.getStartDate(),
//                entity.getEndDate(),
//                entity.getSalary()
//        );
//    }

    // Helper methods for mapping DTO to entity
    private CareerInformation mapDTOToEntity(CareerInformationDTO dto, CareerInformation entity) {
        entity.setCompany(dto.getCompany());
        entity.setDesignation(dto.getDesignation());
        entity.setStartYear(dto.getStartYear());
        entity.setEndYear(dto.getEndYear());
        return entity;
    }

    // Helper method for mapping entity to response
    private CareerInformationResponse mapEntityToResponse(CareerInformation entity) {
        Long userId = entity.getUser() != null ? entity.getUser().getId() : null;
        return new CareerInformationResponse(
                entity.getId(),
                userId,
                entity.getCompany(),
                entity.getDesignation(),
                entity.getStartYear(),
                entity.getEndYear()
        );
    }

}
