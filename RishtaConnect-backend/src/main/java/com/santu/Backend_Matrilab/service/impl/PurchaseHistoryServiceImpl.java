package com.santu.Backend_Matrilab.service.impl;
import com.santu.Backend_Matrilab.dto.request.PurchaseHistoryDTO;
import com.santu.Backend_Matrilab.dto.response.PackageDetailsResponse;
import com.santu.Backend_Matrilab.dto.response.PurchaseHistoryResponse;
import com.santu.Backend_Matrilab.entities.PackageDetails;
import com.santu.Backend_Matrilab.entities.PurchaseHistory;
import com.santu.Backend_Matrilab.entities.User;

import com.santu.Backend_Matrilab.repository.PurchaseHistoryRepository;
import com.santu.Backend_Matrilab.repository.UserRepository;


import com.santu.Backend_Matrilab.service.interfac.PurchaseHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PurchaseHistoryServiceImpl implements PurchaseHistoryService {

    @Autowired
    private PurchaseHistoryRepository purchaseHistoryRepository;

    @Autowired
    private UserRepository userRepository;

    private PurchaseHistoryResponse mapToResponse(PurchaseHistory purchaseHistory) {
        PurchaseHistoryResponse response = new PurchaseHistoryResponse();
        response.setId(purchaseHistory.getId());
        response.setUserId(purchaseHistory.getUser().getId());
        response.setPackageName(purchaseHistory.getPackageName());
        response.setValidityPeriod(purchaseHistory.getValidityPeriod());
        response.setPrice(purchaseHistory.getPrice());
        response.setPurchaseDate(purchaseHistory.getPurchaseDate());
        response.setStatus(purchaseHistory.getStatus());

        if (purchaseHistory.getPackageDetails() != null) {
            PackageDetails packageDetails = purchaseHistory.getPackageDetails();
            PackageDetailsResponse packageResponse = new PackageDetailsResponse();
            packageResponse.setId(packageDetails.getId());
            packageResponse.setInterestExpressLimit(packageDetails.getInterestExpressLimit());
            packageResponse.setContactViewLimit(packageDetails.getContactViewLimit());
            packageResponse.setImageUploadLimit(packageDetails.getImageUploadLimit());
            packageResponse.setValidityPeriod(packageDetails.getValidityPeriod());
            packageResponse.setPaymentVia(packageDetails.getPaymentVia());
            response.setPackageDetails(packageResponse);
        }

        return response;
    }

    private PurchaseHistory mapToEntity(PurchaseHistoryDTO dto) {
        PurchaseHistory entity = new PurchaseHistory();
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + dto.getUserId()));
        entity.setUser(user);
        entity.setPackageName(dto.getPackageName());
        entity.setValidityPeriod(dto.getValidityPeriod());
        entity.setPrice(dto.getPrice());
        entity.setPurchaseDate(dto.getPurchaseDate());
        entity.setStatus(dto.getStatus());
        return entity;
    }

    @Override
    public PurchaseHistoryResponse createPurchaseHistory(PurchaseHistoryDTO purchaseHistoryDTO) {
        PurchaseHistory purchaseHistory = mapToEntity(purchaseHistoryDTO);
        PurchaseHistory savedPurchaseHistory = purchaseHistoryRepository.save(purchaseHistory);
        return mapToResponse(savedPurchaseHistory);
    }

    @Override
    public PurchaseHistoryResponse getPurchaseHistoryById(Long id) {
        PurchaseHistory purchaseHistory = purchaseHistoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Purchase History not found with ID: " + id));
        return mapToResponse(purchaseHistory);
    }

    @Override
    public List<PurchaseHistoryResponse> getAllPurchaseHistories() {
        List<PurchaseHistory> purchaseHistories = purchaseHistoryRepository.findAll();
        return purchaseHistories.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public void deletePurchaseHistory(Long id) {
        purchaseHistoryRepository.deleteById(id);
    }
}
