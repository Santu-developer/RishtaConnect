package com.santu.Backend_Matrilab.service.interfac;

import com.santu.Backend_Matrilab.dto.request.PhysicalAttributesDTO;
import com.santu.Backend_Matrilab.dto.response.PhysicalAttributesResponse;

import java.util.List;

public interface PhysicalAttributesService {
    PhysicalAttributesResponse savePhysicalAttributes(PhysicalAttributesDTO requestDTO);
    List<PhysicalAttributesResponse> getAllPhysicalAttributes();
    PhysicalAttributesResponse updatePhysicalAttributes(Long id, PhysicalAttributesDTO requestDTO);
    PhysicalAttributesResponse getPhysicalAttributesByUserId(Long userId);
}