package com.santu.Backend_Matrilab.dto.response;

public class PackageDetailsResponse {
    private Long id; // Unique identifier for the package details
    private String interestExpressLimit;
    private String contactViewLimit;
    private String imageUploadLimit;
    private String validityPeriod;
    private String paymentVia;

    public PackageDetailsResponse() {
    }

    public PackageDetailsResponse(Long id, String interestExpressLimit, String contactViewLimit, String imageUploadLimit, String validityPeriod, String paymentVia) {
        this.id = id;
        this.interestExpressLimit = interestExpressLimit;
        this.contactViewLimit = contactViewLimit;
        this.imageUploadLimit = imageUploadLimit;
        this.validityPeriod = validityPeriod;
        this.paymentVia = paymentVia;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getPaymentVia() {
        return paymentVia;
    }

    public void setPaymentVia(String paymentVia) {
        this.paymentVia = paymentVia;
    }
}
