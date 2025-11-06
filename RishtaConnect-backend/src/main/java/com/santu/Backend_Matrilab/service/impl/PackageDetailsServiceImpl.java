package com.santu.Backend_Matrilab.service.impl;

import com.santu.Backend_Matrilab.dto.request.PackageDetailsDTO;
import com.santu.Backend_Matrilab.dto.response.PackageDetailsResponse;
import com.santu.Backend_Matrilab.entities.PackageDetails;
import com.santu.Backend_Matrilab.repository.PackageDetailsRepository;
import com.santu.Backend_Matrilab.service.interfac.PackageDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PackageDetailsServiceImpl implements PackageDetailsService {

    @Autowired
    private PackageDetailsRepository packageDetailsRepository;

    private PackageDetailsResponse mapToResponse(PackageDetails packageDetails) {
        PackageDetailsResponse response = new PackageDetailsResponse();
        response.setId(packageDetails.getId());
        response.setInterestExpressLimit(packageDetails.getInterestExpressLimit());
        response.setContactViewLimit(packageDetails.getContactViewLimit());
        response.setImageUploadLimit(packageDetails.getImageUploadLimit());
        response.setValidityPeriod(packageDetails.getValidityPeriod());
        response.setPaymentVia(packageDetails.getPaymentVia());
        return response;
    }

    private PackageDetails mapToEntity(PackageDetailsDTO dto) {
        PackageDetails entity = new PackageDetails();
        entity.setInterestExpressLimit(dto.getInterestExpressLimit());
        entity.setContactViewLimit(dto.getContactViewLimit());
        entity.setImageUploadLimit(dto.getImageUploadLimit());
        entity.setValidityPeriod(dto.getValidityPeriod());
        entity.setPaymentVia(dto.getPaymentVia());
        return entity;
    }

    @Override
    public PackageDetailsResponse createPackageDetails(PackageDetailsDTO packageDetailsDTO) {
        // Convert DTO to entity
        PackageDetails packageDetails = mapToEntity(packageDetailsDTO);

        // Save entity to repository
        PackageDetails savedEntity = packageDetailsRepository.save(packageDetails);

        // Convert saved entity to response
        return mapToResponse(savedEntity);
    }

    @Override
    public PackageDetailsResponse getPackageDetailsById(Long id) {
        // Retrieve entity by ID
        Optional<PackageDetails> optionalPackageDetails = packageDetailsRepository.findById(id);

        // Convert entity to response if present
        return optionalPackageDetails.map(this::mapToResponse)
                .orElseThrow(() -> new RuntimeException("PackageDetails not found for ID: " + id));
    }

    @Override
    public List<PackageDetailsResponse> getAllPackageDetails() {
        // Retrieve all entities from repository
        List<PackageDetails> packageDetailsList = packageDetailsRepository.findAll();

        // Convert list of entities to list of responses
        return packageDetailsList.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void deletePackageDetails(Long id) {
        // Verify if the entity exists
        if (!packageDetailsRepository.existsById(id)) {
            throw new RuntimeException("PackageDetails not found for ID: " + id);
        }

        // Delete entity
        packageDetailsRepository.deleteById(id);
    }
}
