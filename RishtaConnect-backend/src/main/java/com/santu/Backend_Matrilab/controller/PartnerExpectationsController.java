package com.santu.Backend_Matrilab.controller;



import com.santu.Backend_Matrilab.dto.request.PartnerExpectationsDTO;
import com.santu.Backend_Matrilab.dto.response.PartnerExpectationsResponse;
import com.santu.Backend_Matrilab.service.interfac.PartnerExpectationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RestController
@RequestMapping("/api/partner-expectations")
public class PartnerExpectationsController {

    @Autowired
    private PartnerExpectationsService partnerExpectationsService;

    // Save Partner Expectations
    @PostMapping
    public ResponseEntity<PartnerExpectationsResponse> savePartnerExpectations(@RequestBody PartnerExpectationsDTO partnerExpectationsDTO) {
        PartnerExpectationsResponse response = partnerExpectationsService.savePartnerExpectations(partnerExpectationsDTO);
        return ResponseEntity.ok(response);
    }

    // Get all Partner Expectations
    @GetMapping
    public ResponseEntity<List<PartnerExpectationsResponse>> getAllPartnerExpectations() {
        List<PartnerExpectationsResponse> response = partnerExpectationsService.getAllPartnerExpectations();
        return ResponseEntity.ok(response);
    }

    // Get Partner Expectations by ID
//    @GetMapping("/{id}")
//    public ResponseEntity<PartnerExpectationsResponse> getPartnerExpectationsById(@PathVariable Long id) {
//        PartnerExpectationsResponse response = partnerExpectationsService.getPartnerExpectationsById(id);
//        return ResponseEntity.ok(response);
//    }

    // Get Partner Expectations by User ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<PartnerExpectationsResponse> getPartnerExpectationsByUserId(@PathVariable Long userId) {
        PartnerExpectationsResponse response = partnerExpectationsService.getPartnerExpectationsByUserId(userId);
        return ResponseEntity.ok(response);
    }


    // Update Partner Expectations
    @PutMapping("/{id}")
    public ResponseEntity<PartnerExpectationsResponse> updatePartnerExpectations(
            @PathVariable Long id,
            @RequestBody PartnerExpectationsDTO partnerExpectationsDTO) {
        PartnerExpectationsResponse response = partnerExpectationsService.updatePartnerExpectations(id, partnerExpectationsDTO);
        return ResponseEntity.ok(response);
    }
}
