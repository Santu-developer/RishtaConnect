package com.santu.Backend_Matrilab.repository;



import com.santu.Backend_Matrilab.entities.EducationInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EducationInformationRepository extends JpaRepository<EducationInformation, Long> {
//    List<EducationInformation> findByUserId(Long userId);
      @Query("SELECT e FROM EducationInformation e WHERE e.user.id = :userId")
      List<EducationInformation> findByUserId(@Param("userId") Long userId);

}