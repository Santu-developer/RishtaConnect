package com.santu.Backend_Matrilab.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "package_details", indexes = {
    @Index(name = "idx_package_name", columnList = "package_name")
})
public class PackageDetails extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Package name is required")
    @Size(max = 100, message = "Package name cannot exceed 100 characters")
    @Column(name = "package_name", nullable = false, unique = true, length = 100)
    private String packageName;

    @JsonIgnore
    @OneToMany(mappedBy = "packageDetails", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<PurchaseHistory> purchaseHistories = new ArrayList<>();

    @Size(max = 50, message = "Interest express limit cannot exceed 50 characters")
    @Column(name = "interest_express_limit", length = 50)
    private String interestExpressLimit;

    @Size(max = 50, message = "Contact view limit cannot exceed 50 characters")
    @Column(name = "contact_view_limit", length = 50)
    private String contactViewLimit;

    @Size(max = 50, message = "Image upload limit cannot exceed 50 characters")
    @Column(name = "image_upload_limit", length = 50)
    private String imageUploadLimit;

    @Size(max = 50, message = "Validity period cannot exceed 50 characters")
    @Column(name = "validity_period", length = 50)
    private String validityPeriod;

    @Min(value = 0, message = "Price cannot be negative")
    @Column(name = "price")
    private Double price;

    @Size(max = 100, message = "Payment via cannot exceed 100 characters")
    @Column(name = "payment_via", length = 100)
    private String paymentVia;

    public PackageDetails() {
    }

    public PackageDetails(Long id, String packageName, String interestExpressLimit,
                         String contactViewLimit, String imageUploadLimit, String validityPeriod,
                         Double price, String paymentVia) {
        this.id = id;
        this.packageName = packageName;
        this.interestExpressLimit = interestExpressLimit;
        this.contactViewLimit = contactViewLimit;
        this.imageUploadLimit = imageUploadLimit;
        this.validityPeriod = validityPeriod;
        this.price = price;
        this.paymentVia = paymentVia;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPackageName() {
        return packageName;
    }

    public void setPackageName(String packageName) {
        this.packageName = packageName;
    }

    public List<PurchaseHistory> getPurchaseHistories() {
        return purchaseHistories;
    }

    public void setPurchaseHistories(List<PurchaseHistory> purchaseHistories) {
        this.purchaseHistories = purchaseHistories;
    }

    public String getInterestExpressLimit() {
        return interestExpressLimit;
    }

    public void setInterestExpressLimit(String interestExpressLimit) {
        this.interestExpressLimit = interestExpressLimit;
    }

    public String getContactViewLimit() {
        return contactViewLimit;
    }

    public void setContactViewLimit(String contactViewLimit) {
        this.contactViewLimit = contactViewLimit;
    }

    public String getImageUploadLimit() {
        return imageUploadLimit;
    }

    public void setImageUploadLimit(String imageUploadLimit) {
        this.imageUploadLimit = imageUploadLimit;
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

    public String getPaymentVia() {
        return paymentVia;
    }

    public void setPaymentVia(String paymentVia) {
        this.paymentVia = paymentVia;
    }
}
