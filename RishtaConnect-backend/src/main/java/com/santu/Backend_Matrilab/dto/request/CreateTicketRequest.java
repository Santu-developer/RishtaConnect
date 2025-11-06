package com.santu.Backend_Matrilab.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateTicketRequest {
    private String subject;
    private String description;
    private String priority; // LOW, MEDIUM, HIGH, URGENT
    private String category; // TECHNICAL, BILLING, ACCOUNT, PROFILE, OTHER
}
