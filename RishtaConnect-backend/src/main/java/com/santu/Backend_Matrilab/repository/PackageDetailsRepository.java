package com.santu.Backend_Matrilab.repository;


import com.santu.Backend_Matrilab.entities.PackageDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PackageDetailsRepository extends JpaRepository<PackageDetails, Long> {
}