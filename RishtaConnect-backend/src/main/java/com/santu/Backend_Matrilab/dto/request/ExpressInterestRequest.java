package com.santu.Backend_Matrilab.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ExpressInterestRequest {

    @NotNull(message = "Interested user ID is required")
    private Long interestedUserId;

    @Size(max = 1000, message = "Message cannot exceed 1000 characters")
    private String message;

    public ExpressInterestRequest() {
    }

    public ExpressInterestRequest(Long interestedUserId, String message) {
        this.interestedUserId = interestedUserId;
        this.message = message;
    }

    public Long getInterestedUserId() {
        return interestedUserId;
    }

    public void setInterestedUserId(Long interestedUserId) {
        this.interestedUserId = interestedUserId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
