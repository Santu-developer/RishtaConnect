package com.santu.Backend_Matrilab.controller;



import com.santu.Backend_Matrilab.entities.PackageDetails;
import com.santu.Backend_Matrilab.entities.PurchaseHistory;
import com.santu.Backend_Matrilab.repository.PackageDetailsRepository;

import com.santu.Backend_Matrilab.repository.PurchaseHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class PurchaseHistoryController {

    @Autowired
    private PurchaseHistoryRepository purchaseHistoryRepository;

    @Autowired
    private PackageDetailsRepository packageDetailsRepository;

    // Get all purchase history
    @GetMapping("/purchase-history")
    public ResponseEntity<List<PurchaseHistory>> getAllPurchaseHistory() {
        List<PurchaseHistory> purchaseHistories = purchaseHistoryRepository.findAll();
        return ResponseEntity.ok(purchaseHistories);
    }

    // Get purchase history by ID
    @GetMapping("/purchase-history/{id}")
    public ResponseEntity<PurchaseHistory> getPurchaseHistoryById(@PathVariable Long id) {
        Optional<PurchaseHistory> purchaseHistory = purchaseHistoryRepository.findById(id);
        return purchaseHistory.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Get purchase history by user ID
    @GetMapping("/purchase-history/user/{userId}")
    public ResponseEntity<List<PurchaseHistory>> getPurchaseHistoryByUserId(@PathVariable Long userId) {
        List<PurchaseHistory> purchaseHistories = purchaseHistoryRepository.findByUser_Id(userId);
        return ResponseEntity.ok(purchaseHistories);
    }

    // Create or update purchase history (requires associated PackageDetails)
    @PostMapping("/purchase-history")
    public ResponseEntity<PurchaseHistory> createOrUpdatePurchaseHistory(@RequestBody PurchaseHistory purchaseHistory) {
        if (purchaseHistory.getPackageDetails() == null || purchaseHistory.getPackageDetails().getId() == null) {
            return ResponseEntity.badRequest().body(null);
        }

        Optional<PackageDetails> packageDetails = packageDetailsRepository.findById(purchaseHistory.getPackageDetails().getId());
        if (packageDetails.isPresent()) {
            purchaseHistory.setPackageDetails(packageDetails.get());
            PurchaseHistory savedPurchaseHistory = purchaseHistoryRepository.save(purchaseHistory);
            return ResponseEntity.ok(savedPurchaseHistory);
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Get all package details
    @GetMapping("/package-details")
    public ResponseEntity<List<PackageDetails>> getAllPackageDetails() {
        List<PackageDetails> packageDetailsList = packageDetailsRepository.findAll();
        return ResponseEntity.ok(packageDetailsList);
    }

    // Get package details by ID
    @GetMapping("/package-details/{id}")
    public ResponseEntity<PackageDetails> getPackageDetailsById(@PathVariable Long id) {
        Optional<PackageDetails> packageDetails = packageDetailsRepository.findById(id);
        return packageDetails.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Create or update package details
    @PostMapping("/package-details")
    public ResponseEntity<PackageDetails> createOrUpdatePackageDetails(@RequestBody PackageDetails packageDetails) {
        PackageDetails savedPackageDetails = packageDetailsRepository.save(packageDetails);
        return ResponseEntity.ok(savedPackageDetails);
    }

    // Delete purchase history by ID
    @DeleteMapping("/purchase-history/{id}")
    public ResponseEntity<Void> deletePurchaseHistory(@PathVariable Long id) {
        if (purchaseHistoryRepository.existsById(id)) {
            purchaseHistoryRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete package details by ID
    @DeleteMapping("/package-details/{id}")
    public ResponseEntity<Void> deletePackageDetails(@PathVariable Long id) {
        if (packageDetailsRepository.existsById(id)) {
            packageDetailsRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
