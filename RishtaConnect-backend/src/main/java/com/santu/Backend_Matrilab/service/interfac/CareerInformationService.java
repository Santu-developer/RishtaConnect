package com.santu.Backend_Matrilab.service.interfac;
import com.santu.Backend_Matrilab.dto.request.CareerInformationDTO;
import com.santu.Backend_Matrilab.dto.response.CareerInformationResponse;


import java.util.List;

public interface CareerInformationService {

    CareerInformationResponse saveCareerInformation(CareerInformationDTO requestDTO);

    List<CareerInformationResponse> getAllCareerInformation();

    CareerInformationResponse updateCareerInformation(Long id, CareerInformationDTO requestDTO);

    public boolean deleteCareerInformation(Long id);

    List<CareerInformationResponse> getCareerInformationByUserId(Long userId);
}
