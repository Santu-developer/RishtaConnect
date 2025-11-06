package com.santu.Backend_Matrilab.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

@Entity
@Table(name = "purchase_history", indexes = {
    @Index(name = "idx_purchase_user_id", columnList = "user_id"),
    @Index(name = "idx_purchase_status", columnList = "status"),
    @Index(name = "idx_purchase_date", columnList = "purchase_date")
})
public class PurchaseHistory extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonBackReference
    @NotNull(message = "User is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotBlank(message = "Package name is required")
    @Size(max = 100, message = "Package name cannot exceed 100 characters")
    @Column(name = "package_name", length = 100)
    private String packageName;

    @Size(max = 50, message = "Validity period cannot exceed 50 characters")
    @Column(name = "validity_period", length = 50)
    private String validityPeriod;

    @NotNull(message = "Price is required")
    @Min(value = 0, message = "Price cannot be negative")
    private Double price;

    @NotNull(message = "Purchase date is required")
    @Column(name = "purchase_date", nullable = false)
    private LocalDate purchaseDate;

    @NotBlank(message = "Status is required")
    @Size(max = 20, message = "Status cannot exceed 20 characters")
    @Column(length = 20)
    private String status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "package_details_id")
    private PackageDetails packageDetails;

    @Column(name = "profile_view_limit")
    private Integer profileViewLimit; // -1 for unlimited, 0+ for limited views

    @Column(name = "profile_view_count")
    private Integer profileViewCount = 0; // Current count of profiles viewed

    @Size(max = 100, message = "Payment ID cannot exceed 100 characters")
    @Column(name = "payment_id", length = 100)
    private String paymentId; // Razorpay payment ID

    @Size(max = 100, message = "Order ID cannot exceed 100 characters")
    @Column(name = "order_id", length = 100)
    private String orderId; // Razorpay order ID

    @Size(max = 255, message = "Signature cannot exceed 255 characters")
    @Column(name = "signature", length = 255)
    private String signature; // Razorpay signature

    public PurchaseHistory() {
    }

    public PurchaseHistory(Long id, User user, String packageName, String validityPeriod, Double price,
                          LocalDate purchaseDate, String status, PackageDetails packageDetails) {
        this.id = id;
        this.user = user;
        this.packageName = packageName;
        this.validityPeriod = validityPeriod;
        this.price = price;
        this.purchaseDate = purchaseDate;
        this.status = status;
        this.packageDetails = packageDetails;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    // Helper method to get userId for JSON serialization
    @JsonProperty("userId")
    public Long getUserId() {
        return user != null ? user.getId() : null;
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

    public PackageDetails getPackageDetails() {
        return packageDetails;
    }

    public void setPackageDetails(PackageDetails packageDetails) {
        this.packageDetails = packageDetails;
    }

    public Integer getProfileViewLimit() {
        return profileViewLimit;
    }

    public void setProfileViewLimit(Integer profileViewLimit) {
        this.profileViewLimit = profileViewLimit;
    }

    public Integer getProfileViewCount() {
        return profileViewCount;
    }

    public void setProfileViewCount(Integer profileViewCount) {
        this.profileViewCount = profileViewCount;
    }

    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }
}
