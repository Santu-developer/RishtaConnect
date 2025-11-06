package com.santu.Backend_Matrilab.controller;
import com.santu.Backend_Matrilab.dto.request.CareerInformationDTO;
import com.santu.Backend_Matrilab.dto.response.CareerInformationResponse;
import com.santu.Backend_Matrilab.service.interfac.CareerInformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RestController
@RequestMapping("/api/career")
public class CareerInformationController {

    @Autowired
    private CareerInformationService careerInformationService;

    /**
     * Save Career Information
     */
    @PostMapping
    public CareerInformationResponse saveCareerInformation(@RequestBody CareerInformationDTO requestDTO) {
        return careerInformationService.saveCareerInformation(requestDTO);
    }

    /**
     * Get all Career Information
     */
    @GetMapping
    public List<CareerInformationResponse> getAllCareerInformation() {
        return careerInformationService.getAllCareerInformation();
    }

    /**
     * Update Career Information by ID
     */
    @PutMapping("/update/{id}")
    public CareerInformationResponse updateCareerInformation(@PathVariable Long id, @RequestBody CareerInformationDTO requestDTO) {
        return careerInformationService.updateCareerInformation(id, requestDTO);
    }

    /**
     * Delete Career Information by ID
     */
    @DeleteMapping("/{id}")
    public String deleteCareerInformation(@PathVariable Long id) {
        boolean isDeleted = careerInformationService.deleteCareerInformation(id);
        if (isDeleted) {
            return "Career information deleted successfully";
        } else {
            return "Career information not found";
        }
    }


    /**
     * Get Career Information by User ID (Returns List of all career entries)
     */
    @GetMapping("/user/{userId}")
    public List<CareerInformationResponse> getCareerInformationByUserId(@PathVariable Long userId) {
        return careerInformationService.getCareerInformationByUserId(userId);
    }

}
