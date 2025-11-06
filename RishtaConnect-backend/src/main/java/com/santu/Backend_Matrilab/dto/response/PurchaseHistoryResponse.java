package com.santu.Backend_Matrilab.dto.response;

import java.time.LocalDate;

public class PurchaseHistoryResponse {
    private Long id; // Unique identifier for the purchase history record
    private Long userId; // Link to the User entity
    private String packageName;
    private String validityPeriod;
    private Double price;
    private LocalDate purchaseDate;
    private String status;
    private PackageDetailsResponse packageDetails;

    public PurchaseHistoryResponse() {
    }

    public PurchaseHistoryResponse(Long id, Long userId, String packageName, String validityPeriod, Double price, LocalDate purchaseDate, String status, PackageDetailsResponse packageDetails) {
        this.id = id;
        this.userId = userId;
        this.packageName = packageName;
        this.validityPeriod = validityPeriod;
        this.price = price;
        this.purchaseDate = purchaseDate;
        this.status = status;
        this.packageDetails = packageDetails;
    }

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

    public PackageDetailsResponse getPackageDetails() {
        return packageDetails;
    }

    public void setPackageDetails(PackageDetailsResponse packageDetails) {
        this.packageDetails = packageDetails;
    }
}
