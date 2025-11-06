package com.santu.Backend_Matrilab.dto.request;

import java.time.LocalDate;

public class PurchaseHistoryDTO {
    private Long id; // Unique identifier for the purchase history record
    private Long userId; // Link to the User entity
    private String packageName;
    private String validityPeriod;
    private Double price;
    private LocalDate purchaseDate;
    private String status;
    private PackageDetailsDTO packageDetails;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getPackageName() {
        return packageName;
    }

    public void setPackageName(String packageName) {
        this.packageName = packageName;
    }

    public String getValidityPeriod() {
        return validityPeriod;
    }

    public void setValidityPeriod(String validityPeriod) {
        this.validityPeriod = validityPeriod;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public LocalDate getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(LocalDate purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public PackageDetailsDTO getPackageDetails() {
        return packageDetails;
    }

    public void setPackageDetails(PackageDetailsDTO packageDetails) {
        this.packageDetails = packageDetails;
    }

    public PurchaseHistoryDTO() {
    }

    public PurchaseHistoryDTO(Long id, Long userId, String packageName, String validityPeriod, Double price, LocalDate purchaseDate, String status, PackageDetailsDTO packageDetails) {
        this.id = id;
        this.userId = userId;
        this.packageName = packageName;
        this.validityPeriod = validityPeriod;
        this.price = price;
        this.purchaseDate = purchaseDate;
        this.status = status;
        this.packageDetails = packageDetails;
    }
}
