package com.santu.Backend_Matrilab.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ShortlistRequest {

    @NotNull(message = "Shortlisted user ID is required")
    private Long shortlistedUserId;

    @Size(max = 500, message = "Notes cannot exceed 500 characters")
    private String notes;

    public ShortlistRequest() {
    }

    public ShortlistRequest(Long shortlistedUserId, String notes) {
        this.shortlistedUserId = shortlistedUserId;
        this.notes = notes;
    }

    public Long getShortlistedUserId() {
        return shortlistedUserId;
    }

    public void setShortlistedUserId(Long shortlistedUserId) {
        this.shortlistedUserId = shortlistedUserId;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
