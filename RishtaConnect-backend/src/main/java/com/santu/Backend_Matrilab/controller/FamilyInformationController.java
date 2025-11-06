package com.santu.Backend_Matrilab.controller;

import com.santu.Backend_Matrilab.dto.request.FamilyInformationDTO;
import com.santu.Backend_Matrilab.dto.response.FamilyInformationResponse;
import com.santu.Backend_Matrilab.service.interfac.FamilyInformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/family-information")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*") // Replace with your React app's URL
public class FamilyInformationController {

    @Autowired
    private FamilyInformationService familyInformationService;

    // Save Family Information
    @PostMapping
    public FamilyInformationResponse saveFamilyInformation(@RequestBody FamilyInformationDTO requestDTO) {
        return familyInformationService.saveFamilyInformation(requestDTO);
    }

    // Get All Family Information
    @GetMapping
    public List<FamilyInformationResponse> getAllFamilyInformation() {
        return familyInformationService.getAllFamilyInformation();
    }

    // Get Family Information by ID
//    @GetMapping("/{id}")
//    public FamilyInformationResponse getFamilyInformationById(@PathVariable Long id) {
//        return familyInformationService.getFamilyInformationById(id);
//    }

      @GetMapping("/user/{userId}")
      public ResponseEntity<FamilyInformationResponse> getFamilyInformationByUserId(@PathVariable("userId") Long userId) {
        FamilyInformationResponse response = familyInformationService.getFamilyInformationByUserId(userId);
        return ResponseEntity.ok(response);
      }

    // Update Family Information
    @PutMapping("/{id}")
    public FamilyInformationResponse updateFamilyInformation(
            @PathVariable Long id,
            @RequestBody FamilyInformationDTO requestDTO) {
        return familyInformationService.updateFamilyInformation(id, requestDTO);
    }
}
