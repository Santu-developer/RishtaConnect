package com.santu.Backend_Matrilab.service.interfac;
import com.santu.Backend_Matrilab.dto.request.EducationInformationDTO;
import com.santu.Backend_Matrilab.dto.response.EducationInformationResponse;

import java.util.List;

public interface EducationInformationService {

    EducationInformationResponse saveEducationInformation(EducationInformationDTO requestDTO);

    List<EducationInformationResponse> getAllEducationInformation();

    EducationInformationResponse updateEducationInformation(Long id, EducationInformationDTO requestDTO);

    void deleteEducationInformation(Long id);

    List<EducationInformationResponse> getEducationInformationByUserId(Long userId);
}
