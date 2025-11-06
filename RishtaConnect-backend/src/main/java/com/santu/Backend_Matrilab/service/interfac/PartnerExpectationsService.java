package com.santu.Backend_Matrilab.service.interfac;

import com.santu.Backend_Matrilab.dto.request.PartnerExpectationsDTO;
import com.santu.Backend_Matrilab.dto.response.PartnerExpectationsResponse;

import java.util.List;

public interface PartnerExpectationsService {
    PartnerExpectationsResponse savePartnerExpectations(PartnerExpectationsDTO requestDTO);
    List<PartnerExpectationsResponse> getAllPartnerExpectations();
    PartnerExpectationsResponse updatePartnerExpectations(Long id, PartnerExpectationsDTO requestDTO);
    PartnerExpectationsResponse getPartnerExpectationsByUserId(Long userId);
}