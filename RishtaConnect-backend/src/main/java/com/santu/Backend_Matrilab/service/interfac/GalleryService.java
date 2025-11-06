package com.santu.Backend_Matrilab.service.interfac;

import com.santu.Backend_Matrilab.entities.Gallery;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface GalleryService {
    Gallery uploadImage(MultipartFile file, Long userId, Boolean isProfilePicture);
    List<Gallery> uploadMultipleImages(MultipartFile[] files, Long userId);
    List<Gallery> getUserGallery(Long userId);
    Gallery getProfilePicture(Long userId);
    Gallery setAsProfilePicture(Long imageId);
    void deleteImage(Long imageId);
}
