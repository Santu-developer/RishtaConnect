package com.santu.Backend_Matrilab.controller;


import com.santu.Backend_Matrilab.dto.request.PhysicalAttributesDTO;
import com.santu.Backend_Matrilab.dto.response.PhysicalAttributesResponse;
import com.santu.Backend_Matrilab.service.interfac.PhysicalAttributesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RestController
@RequestMapping("/api/physical-attributes")
public class PhysicalAttributesController {

    @Autowired
    private PhysicalAttributesService physicalAttributesService;

    // Create new physical attributes
    @PostMapping
    public ResponseEntity<PhysicalAttributesResponse> createPhysicalAttributes(@RequestBody PhysicalAttributesDTO requestDTO) {
        PhysicalAttributesResponse response = physicalAttributesService.savePhysicalAttributes(requestDTO);
        return ResponseEntity.ok(response);
    }


//    @PostMapping
//    public ResponseEntity<PhysicalAttributesResponse> createPhysicalAttributes(
//            @RequestBody PhysicalAttributesDTO requestDTO,
//            @RequestHeader("userId") Long userId) {
//
//        requestDTO.setUserId(userId);
//        PhysicalAttributesResponse response = physicalAttributesService.savePhysicalAttributes(requestDTO);
//        return ResponseEntity.ok(response);
//    }


    // Get all physical attributes
    @GetMapping
    public ResponseEntity<List<PhysicalAttributesResponse>> getAllPhysicalAttributes() {
        List<PhysicalAttributesResponse> responses = physicalAttributesService.getAllPhysicalAttributes();
        return ResponseEntity.ok(responses);
    }

    // Get physical attributes by ID
//    @GetMapping("/{id}")
//    public ResponseEntity<PhysicalAttributesResponse> getPhysicalAttributesById(@PathVariable Long id) {
//        PhysicalAttributesResponse response = physicalAttributesService.getPhysicalAttributesById(id);
//        return ResponseEntity.ok(response);
//    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getPhysicalAttributesByUserId(@PathVariable Long userId) {
        try {
            PhysicalAttributesResponse response = physicalAttributesService.getPhysicalAttributesByUserId(userId);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status (HttpStatus.NOT_FOUND).body("No Physical Attributes found for user ID: " + userId);
        }
    }



    // Update physical attributes
    @PutMapping("/{id}")
    public ResponseEntity<PhysicalAttributesResponse> updatePhysicalAttributes(
            @PathVariable Long id,
            @RequestBody PhysicalAttributesDTO requestDTO) {
        PhysicalAttributesResponse response = physicalAttributesService.updatePhysicalAttributes(id, requestDTO);
        return ResponseEntity.ok(response);
    }
}
