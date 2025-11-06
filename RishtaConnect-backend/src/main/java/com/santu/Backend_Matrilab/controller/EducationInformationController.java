package com.santu.Backend_Matrilab.controller;

import com.santu.Backend_Matrilab.dto.request.EducationInformationDTO;
import com.santu.Backend_Matrilab.dto.response.EducationInformationResponse;
import com.santu.Backend_Matrilab.service.interfac.EducationInformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RestController
@RequestMapping("/api/education")
public class EducationInformationController {

    @Autowired
    private EducationInformationService educationInformationService;

    @PostMapping
    public EducationInformationResponse saveEducationInformation(@RequestBody EducationInformationDTO requestDTO) {
        return educationInformationService.saveEducationInformation(requestDTO);
    }

    @GetMapping
    public List<EducationInformationResponse> getAllEducationInformation() {
        return educationInformationService.getAllEducationInformation();
    }

    @PutMapping("/update/{id}")
    public EducationInformationResponse updateEducationInformation(@PathVariable Long id, @RequestBody EducationInformationDTO requestDTO) {
        return educationInformationService.updateEducationInformation(id, requestDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEducationInformation(@PathVariable Long id) {
        educationInformationService.deleteEducationInformation(id);
        return ResponseEntity.ok("Education record deleted successfully");
    }



//    @GetMapping("/{id}")
//    public EducationInformationResponse getEducationInformationById(@PathVariable Long id) {
//        return educationInformationService.getEducationInformationById(id);
//    }

//    @GetMapping("/user/{userId}")
//    public EducationInformationResponse getEducationInformationByUserId(@PathVariable Long userId) {
//        return educationInformationService.getEducationInformationByUserId(userId);
//    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<EducationInformationResponse>> getEducationInformationByUserId(@PathVariable Long userId) {
        List<EducationInformationResponse> educationList = educationInformationService.getEducationInformationByUserId(userId);

        return ResponseEntity.ok(educationList); // Always return a list, even if empty
    }


}
