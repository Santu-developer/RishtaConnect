import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Footer from "../../components/Footer";
import UserDashboardLeftSection from "../../components/UserDashboardLeftSection";
import {
  uploadMultipleImages,
  getGalleryByUserId,
  deleteGalleryImage,
  setAsProfilePicture,
  getPurchaseHistoryByUserId,
} from "../../services/ApiService";
import "../../styles/user/UserGalleryNew.css"; // Modern gallery styling
import "../../styles/user/dashboard.css";
import "../../styles/styles.css";

function UserGallery() {
  const [newImages, setNewImages] = useState([]); // Files to upload
  const [galleryImages, setGalleryImages] = useState([]); // Existing gallery from backend
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [galleryLimit, setGalleryLimit] = useState(5); // Default limit

  // Get userId from userData object in localStorage
  const getUserId = () => {
    const storedUserData = localStorage.getItem("userData");
    if (!storedUserData) return null;
    
    try {
      const parsedUserData = JSON.parse(storedUserData);
      return parsedUserData.user?.id || null;
    } catch (e) {
      return null;
    }
  };

  const userId = getUserId();

  // Load existing gallery on mount
  useEffect(() => {
    if (userId) {
      loadGallery();
      loadGalleryLimit();
    } else {
      setError("User ID not found. Please login again.");
    }
  }, []);

  const loadGalleryLimit = async () => {
    try {
      const purchases = await getPurchaseHistoryByUserId(userId);
      
      // Find active package
      const activePurchases = purchases
        .filter(p => {
          const statusUpper = p.status?.toUpperCase();
          return statusUpper === "COMPLETED" || statusUpper === "PURCHASED";
        })
        .sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
      
      if (activePurchases.length > 0 && activePurchases[0].galleryImageLimit) {
        setGalleryLimit(activePurchases[0].galleryImageLimit);
      }
    } catch (err) {
      // Use default limit of 5
      setGalleryLimit(5);
    }
  };

  const loadGallery = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getGalleryByUserId(userId);
      setGalleryImages(response || []);
    } catch (err) {
      setError("Failed to load gallery images");
    } finally {
      setLoading(false);
    }
  };

  const onDrop = (acceptedFiles) => {
    const uploadedImages = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setNewImages([...newImages, ...uploadedImages]);
    setError(null);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"] },
    maxSize: 10485760, // 10MB
  });

  const handleUpload = async () => {
    if (newImages.length === 0) {
      setError("Please select at least one image to upload");
      return;
    }

    if (!userId) {
      setError("User ID not found. Please login again.");
      return;
    }

    // Check gallery limit
    const totalAfterUpload = galleryImages.length + newImages.length;
    if (totalAfterUpload > galleryLimit) {
      setError(`Gallery limit exceeded! You can upload maximum ${galleryLimit} images. Current: ${galleryImages.length}, Trying to add: ${newImages.length}`);
      return;
    }

    try {
      setUploading(true);
      setError(null);
      setSuccess(null);

      await uploadMultipleImages(newImages, userId);

      setSuccess(`Successfully uploaded ${newImages.length} image(s)`);
      setNewImages([]); // Clear preview
      await loadGallery(); // Refresh gallery

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload images");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (imageId) => {
    if (!window.confirm("Are you sure you want to delete this image?")) {
      return;
    }

    try {
      setError(null);
      await deleteGalleryImage(imageId);
      setSuccess("Image deleted successfully");
      await loadGallery();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete image");
    }
  };

  const handleSetProfilePicture = async (imageId) => {
    try {
      setError(null);
      await setAsProfilePicture(imageId);
      setSuccess("Profile picture updated successfully");
      await loadGallery();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to set profile picture");
    }
  };

  const removeFromPreview = (index) => {
    setNewImages(newImages.filter((_, i) => i !== index));
  };

  const formatUploadDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 30) return `${diffDays} days ago`;
    
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  return (
    <div className="user-dashboard-container">
      <div className="container-max-width user-dashboard-wrapper">
        <UserDashboardLeftSection />
        <div className="dashboard-right-section hidden-scrollbar">
          <div className="gallery-header">
            <h5>My Gallery</h5>
            <p className="gallery-subtitle">
              Upload and manage your photos ({galleryImages.length}/{galleryLimit} images used)
              {galleryImages.length >= galleryLimit && (
                <span style={{ color: 'red', marginLeft: '10px' }}>⚠️ Limit Reached</span>
              )}
            </p>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="alert alert-danger">
              <i className="fas fa-exclamation-circle"></i> {error}
            </div>
          )}
          {success && (
            <div className="alert alert-success">
              <i className="fas fa-check-circle"></i> {success}
            </div>
          )}

          {/* Upload Section */}
          <div className="upload-section">
            <div className="drag-drop-container" {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="drag-drop-content">
                <i className="fas fa-cloud-upload-alt upload-icon"></i>
                <p className="drag-text">Drag & Drop files here or click to browse</p>
                <p className="drag-subtext">Supports: JPG, PNG, GIF, WEBP (Max 10MB each)</p>
              </div>
            </div>

            {/* Preview New Images */}
            {newImages.length > 0 && (
              <div className="new-images-preview">
                <h6 className="preview-title">
                  Ready to Upload ({newImages.length})
                </h6>
                <div className="image-preview-grid">
                  {newImages.map((image, index) => (
                    <div key={index} className="image-preview-card">
                      <img
                        src={image.preview}
                        alt={`upload-preview-${index}`}
                        className="preview-image"
                      />
                      <button
                        className="remove-preview-btn"
                        onClick={() => removeFromPreview(index)}
                        title="Remove"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  className="upload-btn"
                  onClick={handleUpload}
                  disabled={uploading}
                >
                  {uploading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Uploading...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-upload"></i> Upload {newImages.length} Image(s)
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Existing Gallery */}
          <div className="existing-gallery">
            <h6 className="gallery-title">
              Your Gallery ({galleryImages.length})
            </h6>

            {loading ? (
              <div className="loading-container">
                <i className="fas fa-spinner fa-spin fa-3x"></i>
                <p>Loading gallery...</p>
              </div>
            ) : galleryImages.length === 0 ? (
              <div className="empty-gallery">
                <i className="fas fa-images fa-3x"></i>
                <p>No images in your gallery yet</p>
                <p className="empty-subtext">Upload your first image above!</p>
              </div>
            ) : (
              <div className="gallery-grid">
                {galleryImages.map((image) => {
                  // Handle both full URLs and relative paths
                  const imageUrl = image.imageUrl.startsWith('http') 
                    ? image.imageUrl 
                    : `http://localhost:8080${image.imageUrl}`;
                  
                  return (
                  <div key={image.id} className="gallery-card">
                    <div className="gallery-image-wrapper">
                      <img
                        src={imageUrl}
                        alt="gallery"
                        className="gallery-image"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x300?text=Image+Not+Found';
                        }}
                      />
                      {image.isProfilePicture && (
                        <span className="profile-badge">
                          <i className="fas fa-star"></i> Profile Picture
                        </span>
                      )}
                    </div>
                    <div className="gallery-image-info">
                      <small className="upload-date">
                        <i className="far fa-clock"></i> {formatUploadDate(image.uploadDate)}
                      </small>
                    </div>
                    <div className="gallery-actions">
                      {!image.isProfilePicture && (
                        <button
                          className="action-btn set-profile-btn"
                          onClick={() => handleSetProfilePicture(image.id)}
                          title="Set as Profile Picture"
                        >
                          <i className="fas fa-star"></i> Set as Profile
                        </button>
                      )}
                      <button
                        className="action-btn delete-btn"
                        onClick={() => handleDelete(image.id)}
                        title="Delete Image"
                      >
                        <i className="fas fa-trash-alt"></i> Delete
                      </button>
                    </div>
                  </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UserGallery;
