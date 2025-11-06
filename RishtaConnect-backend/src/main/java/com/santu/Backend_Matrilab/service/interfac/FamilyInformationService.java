package com.santu.Backend_Matrilab.service.interfac;

import com.santu.Backend_Matrilab.dto.request.FamilyInformationDTO;
import com.santu.Backend_Matrilab.dto.response.FamilyInformationResponse;

import java.util.List;

public interface FamilyInformationService {
    FamilyInformationResponse saveFamilyInformation(FamilyInformationDTO requestDTO);
    List<FamilyInformationResponse> getAllFamilyInformation();
    FamilyInformationResponse updateFamilyInformation(Long id, FamilyInformationDTO requestDTO);
    FamilyInformationResponse getFamilyInformationByUserId(Long userId);
}
