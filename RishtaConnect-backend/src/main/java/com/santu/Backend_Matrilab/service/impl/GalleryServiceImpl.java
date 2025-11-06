package com.santu.Backend_Matrilab.service.impl;

import com.santu.Backend_Matrilab.entities.Gallery;
import com.santu.Backend_Matrilab.entities.User;
import com.santu.Backend_Matrilab.repository.GalleryRepository;
import com.santu.Backend_Matrilab.repository.UserRepository;
import com.santu.Backend_Matrilab.service.interfac.GalleryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class GalleryServiceImpl implements GalleryService {

    @Autowired
    private GalleryRepository galleryRepository;

    @Autowired
    private UserRepository userRepository;

    @Value("${file.upload-dir:uploads/gallery}")
    private String uploadDir;

    @Value("${file.base-url:http://localhost:8080}")
    private String baseUrl;

    @Override
    @Transactional
    public Gallery uploadImage(MultipartFile file, Long userId, Boolean isProfilePicture) {
        // Validate user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, 
                    "User not found with ID: " + userId));

        // Validate file
        if (file.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "File is empty");
        }

        // Validate file type
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
                "Only image files are allowed");
        }

        try {
            // Create upload directory if not exists
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Generate unique filename
            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename != null && originalFilename.contains(".") 
                ? originalFilename.substring(originalFilename.lastIndexOf(".")) 
                : "";
            String filename = UUID.randomUUID().toString() + extension;

            // Save file
            Path filePath = uploadPath.resolve(filename);
            Files.copy(file.getInputStream(), filePath);
            
            System.out.println("===== FILE UPLOAD SUCCESS =====");
            System.out.println("Original filename: " + originalFilename);
            System.out.println("Saved as: " + filename);
            System.out.println("Full path: " + filePath.toAbsolutePath());
            System.out.println("File exists: " + Files.exists(filePath));
            System.out.println("File size: " + Files.size(filePath) + " bytes");
            System.out.println("================================");

            // Create gallery entity
            Gallery gallery = new Gallery();
            gallery.setUser(user);
            gallery.setImageUrl("/uploads/gallery/" + filename); // Store relative path
            gallery.setImageType(contentType);
            gallery.setIsProfilePicture(isProfilePicture);
            gallery.setUploadDate(LocalDateTime.now());
            
            System.out.println("Storing in DB - Image URL: " + gallery.getImageUrl());

            // If setting as profile picture, remove from others
            if (Boolean.TRUE.equals(isProfilePicture)) {
                galleryRepository.findByUserAndIsProfilePicture(user, true)
                    .forEach(g -> {
                        g.setIsProfilePicture(false);
                        galleryRepository.save(g);
                    });
            }

            return galleryRepository.save(gallery);

        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, 
                "Failed to upload file: " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public List<Gallery> uploadMultipleImages(MultipartFile[] files, Long userId) {
        List<Gallery> galleries = new ArrayList<>();
        for (MultipartFile file : files) {
            galleries.add(uploadImage(file, userId, false));
        }
        return galleries;
    }

    @Override
    public List<Gallery> getUserGallery(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, 
                    "User not found with ID: " + userId));
        return galleryRepository.findByUserOrderByUploadDateDesc(user);
    }

    @Override
    public Gallery getProfilePicture(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, 
                    "User not found with ID: " + userId));
        return galleryRepository.findByUserAndIsProfilePicture(user, true)
                .stream()
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, 
                    "Profile picture not found for user ID: " + userId));
    }

    @Override
    @Transactional
    public Gallery setAsProfilePicture(Long imageId) {
        Gallery gallery = galleryRepository.findById(imageId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, 
                    "Image not found with ID: " + imageId));

        // Remove profile picture flag from other images
        galleryRepository.findByUserAndIsProfilePicture(gallery.getUser(), true)
            .forEach(g -> {
                g.setIsProfilePicture(false);
                galleryRepository.save(g);
            });

        // Set this image as profile picture
        gallery.setIsProfilePicture(true);
        return galleryRepository.save(gallery);
    }

    @Override
    @Transactional
    public void deleteImage(Long imageId) {
        Gallery gallery = galleryRepository.findById(imageId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, 
                    "Image not found with ID: " + imageId));

        // Delete physical file
        try {
            String imageUrl = gallery.getImageUrl();
            String filename = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
            Path filePath = Paths.get(uploadDir, filename);
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            // Log error but continue with database deletion
            System.err.println("Failed to delete physical file: " + e.getMessage());
        }

        galleryRepository.delete(gallery);
    }
}
