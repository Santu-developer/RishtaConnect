package com.santu.Backend_Matrilab.service.interfac;

import com.santu.Backend_Matrilab.dto.request.PackageDetailsDTO;
import com.santu.Backend_Matrilab.dto.response.PackageDetailsResponse;

import java.util.List;

public interface PackageDetailsService {

    PackageDetailsResponse createPackageDetails(PackageDetailsDTO packageDetailsDTO);
    PackageDetailsResponse getPackageDetailsById(Long id);
    List<PackageDetailsResponse> getAllPackageDetails();
    void deletePackageDetails(Long id);
}
