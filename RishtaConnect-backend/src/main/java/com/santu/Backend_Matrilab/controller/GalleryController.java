package com.santu.Backend_Matrilab.controller;

import com.santu.Backend_Matrilab.entities.Gallery;
import com.santu.Backend_Matrilab.service.interfac.GalleryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/gallery")
@CrossOrigin(origins = "*")
public class GalleryController {

    @Autowired
    private GalleryService galleryService;

    // Test endpoint to check if static files are working
    @GetMapping("/test")
    public ResponseEntity<String> testStaticFiles() {
        return ResponseEntity.ok("Gallery API is working! Check http://localhost:8080/uploads/gallery/ for images.");
    }

    // Upload single image
    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam("userId") Long userId,
            @RequestParam(value = "isProfilePicture", defaultValue = "false") Boolean isProfilePicture) {
        try {
            Gallery gallery = galleryService.uploadImage(file, userId, isProfilePicture);
            return ResponseEntity.ok(gallery);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to upload image: " + e.getMessage());
        }
    }

    // Upload multiple images
    @PostMapping("/upload/multiple")
    public ResponseEntity<?> uploadMultipleImages(
            @RequestParam("files") MultipartFile[] files,
            @RequestParam("userId") Long userId) {
        try {
            System.out.println("===== UPLOAD MULTIPLE IMAGES =====");
            System.out.println("User ID: " + userId);
            System.out.println("Number of files: " + files.length);
            List<Gallery> galleries = galleryService.uploadMultipleImages(files, userId);
            System.out.println("Uploaded successfully. Image URLs:");
            for (Gallery g : galleries) {
                System.out.println("  - " + g.getImageUrl());
            }
            System.out.println("===================================");
            return ResponseEntity.ok(galleries);
        } catch (Exception e) {
            System.err.println("Upload failed: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to upload images: " + e.getMessage());
        }
    }

    // Get all images for a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Gallery>> getUserGallery(@PathVariable Long userId) {
        System.out.println("===== GET USER GALLERY =====");
        System.out.println("User ID: " + userId);
        List<Gallery> galleries = galleryService.getUserGallery(userId);
        System.out.println("Found " + galleries.size() + " images");
        for (Gallery g : galleries) {
            System.out.println("  Image ID: " + g.getId() + ", URL: " + g.getImageUrl());
        }
        System.out.println("============================");
        return ResponseEntity.ok(galleries);
    }

    // Get profile picture for a user
    @GetMapping("/profile-picture/{userId}")
    public ResponseEntity<?> getProfilePicture(@PathVariable Long userId) {
        try {
            Gallery profilePicture = galleryService.getProfilePicture(userId);
            return ResponseEntity.ok(profilePicture);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Profile picture not found");
        }
    }

    // Set image as profile picture
    @PutMapping("/set-profile-picture/{imageId}")
    public ResponseEntity<?> setProfilePicture(@PathVariable Long imageId) {
        try {
            Gallery gallery = galleryService.setAsProfilePicture(imageId);
            return ResponseEntity.ok(gallery);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to set profile picture: " + e.getMessage());
        }
    }

    // Delete image
    @DeleteMapping("/{imageId}")
    public ResponseEntity<?> deleteImage(@PathVariable Long imageId) {
        try {
            galleryService.deleteImage(imageId);
            return ResponseEntity.ok("Image deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to delete image: " + e.getMessage());
        }
    }
}
