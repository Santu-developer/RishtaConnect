package com.santu.Backend_Matrilab.service.interfac;

import com.santu.Backend_Matrilab.dto.request.BasicInformationDTO;
import com.santu.Backend_Matrilab.dto.response.BasicInformationResponse;

import java.util.List;

public interface BasicInformationService {

    BasicInformationResponse getBasicInformationByUserId(Long userId);

    // Save basic information
    BasicInformationResponse saveBasicInformation(BasicInformationDTO requestDTO);

    // Get all basic information
    List<BasicInformationResponse> getAllBasicInformation();

    // Update basic information
    BasicInformationResponse updateBasicInformation(Long id, BasicInformationDTO requestDTO);

    // Get basic information by ID
    BasicInformationResponse getBasicInformationById(Long id);
}
