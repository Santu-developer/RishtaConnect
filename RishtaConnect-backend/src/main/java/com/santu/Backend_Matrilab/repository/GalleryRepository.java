package com.santu.Backend_Matrilab.repository;

import com.santu.Backend_Matrilab.entities.Gallery;
import com.santu.Backend_Matrilab.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GalleryRepository extends JpaRepository<Gallery, Long> {

    List<Gallery> findByUserId(Long userId);

    List<Gallery> findByUserOrderByUploadDateDesc(User user);

    List<Gallery> findByUserAndIsProfilePicture(User user, Boolean isProfilePicture);

    Optional<Gallery> findByUserIdAndIsProfilePictureTrue(Long userId);

    void deleteByUserId(Long userId);

    long countByUserId(Long userId);
}
