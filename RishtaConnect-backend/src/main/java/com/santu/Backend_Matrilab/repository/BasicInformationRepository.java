package com.santu.Backend_Matrilab.repository;

import java.util.Optional;
import com.santu.Backend_Matrilab.entities.BasicInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BasicInformationRepository extends JpaRepository<BasicInformation, Long> {

    // Find basic information by userId (using relationship path)
    Optional<BasicInformation> findByUser_Id(Long userId);

    // Find basic information by both id and userId
    Optional<BasicInformation> findByIdAndUser_Id(Long id, Long userId);
}