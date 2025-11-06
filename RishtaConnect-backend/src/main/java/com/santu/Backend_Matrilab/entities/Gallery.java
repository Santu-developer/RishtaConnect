package com.santu.Backend_Matrilab.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

@Entity
@Table(name = "gallery", indexes = {
    @Index(name = "idx_gallery_user_id", columnList = "user_id"),
    @Index(name = "idx_gallery_profile_pic", columnList = "is_profile_picture")
})
public class Gallery extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonBackReference
    @NotNull(message = "User is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotBlank(message = "Image URL is required")
    @Size(max = 500, message = "Image URL cannot exceed 500 characters")
    @Column(name = "image_url", nullable = false, length = 500)
    private String imageUrl;

    @Size(max = 50, message = "Image type cannot exceed 50 characters")
    @Column(name = "image_type", length = 50)
    private String imageType;

    @Column(name = "is_profile_picture")
    private Boolean isProfilePicture = false;

    @Column(name = "upload_date")
    private LocalDateTime uploadDate;

    @PrePersist
    protected void onGalleryCreate() {
        if (uploadDate == null) {
            uploadDate = LocalDateTime.now();
        }
    }

    public Gallery() {
    }

    public Gallery(Long id, User user, String imageUrl, String imageType, Boolean isProfilePicture) {
        this.id = id;
        this.user = user;
        this.imageUrl = imageUrl;
        this.imageType = imageType;
        this.isProfilePicture = isProfilePicture != null ? isProfilePicture : false;
        this.uploadDate = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getImageType() {
        return imageType;
    }

    public void setImageType(String imageType) {
        this.imageType = imageType;
    }

    public Boolean getIsProfilePicture() {
        return isProfilePicture;
    }

    public void setIsProfilePicture(Boolean isProfilePicture) {
        this.isProfilePicture = isProfilePicture;
    }

    public LocalDateTime getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(LocalDateTime uploadDate) {
        this.uploadDate = uploadDate;
    }
}
