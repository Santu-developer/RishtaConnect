
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  postFamilyInformation,
  updateFamilyInformation,
  fetchFamilyInformation,
} from "../../services/ApiService";
import "../../styles/user/dashboard.css";
import "../../styles/styles.css";
import "../../styles/user/profileSetting.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FamilyInformation = () => {
  const navigate = useNavigate();
  
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading while checking cache/backend
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const [formData, setFormData] = useState({
    fathersName: "",
    fathersProfession: "",
    fathersContact: "",
    mothersName: "",
    mothersProfession: "",
    mothersContact: "",
    totalBrother: 0,
    totalSister: 0,
  });

  // Hybrid fetch: Check localStorage first, then backend
  useEffect(() => {
    const loadFamilyInformation = async () => {
      try {
        
        // Get userId
        const storedUserData = localStorage.getItem("userData");
        if (!storedUserData) {
          setIsLoading(false);
          return;
        }
        
        const parsedUserData = JSON.parse(storedUserData);
        const userId = parsedUserData.user?.id;
        
        if (!userId) {
          setIsLoading(false);
          return;
        }

        // 1. Check localStorage first
        const cachedData = localStorage.getItem(`familyInformation_${userId}`);
        if (cachedData) {
          const parsed = JSON.parse(cachedData);
          setFormData({
            fathersName: parsed.fathersName || "",
            fathersProfession: parsed.fathersProfession || "",
            fathersContact: parsed.fathersContact || "",
            mothersName: parsed.mothersName || "",
            mothersProfession: parsed.mothersProfession || "",
            mothersContact: parsed.mothersContact || "",
            totalBrother: parsed.totalBrother || 0,
            totalSister: parsed.totalSister || 0,
          });
          setIsEditing(true);
          setEditId(parsed.id);
          setIsLoading(false);
          return; // Early exit - data found in cache
        }

        // 2. Fetch from backend if not in cache
        const response = await fetchFamilyInformation(userId);
        
        if (response && response.id) {
          
          // Save to localStorage for next time
          localStorage.setItem(`familyInformation_${userId}`, JSON.stringify(response));
          
          setFormData({
            fathersName: response.fathersName || "",
            fathersProfession: response.fathersProfession || "",
            fathersContact: response.fathersContact || "",
            mothersName: response.mothersName || "",
            mothersProfession: response.mothersProfession || "",
            mothersContact: response.mothersContact || "",
            totalBrother: response.totalBrother || 0,
            totalSister: response.totalSister || 0,
          });
          setIsEditing(true);
          setEditId(response.id);
        } else {
        }
        
      } catch (error) {
        
        if (error.response?.status === 404) {
        } else if (error.response?.status === 403) {
          toast.error("Unauthorized. Please login again.");
          navigate("/login");
        } else {
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadFamilyInformation();
  }, [navigate])
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    
    // Convert to number for numeric fields
    const finalValue = type === "number" ? (value === "" ? 0 : parseInt(value, 10)) : value;
    
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: finalValue,
    }));
  };

  // Toggle collapsible section
  const toggleSection = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  // Validate form data
  const validateForm = () => {
    const errors = [];

    if (!formData.fathersName?.trim()) {
      errors.push("Father's name is required");
    }
    if (!formData.fathersProfession?.trim()) {
      errors.push("Father's profession is required");
    }
    if (!formData.fathersContact?.trim()) {
      errors.push("Father's contact is required");
    } else if (formData.fathersContact.length < 10) {
      errors.push("Father's contact must be at least 10 digits");
    }
    
    if (!formData.mothersName?.trim()) {
      errors.push("Mother's name is required");
    }
    if (!formData.mothersProfession?.trim()) {
      errors.push("Mother's profession is required");
    }
    if (!formData.mothersContact?.trim()) {
      errors.push("Mother's contact is required");
    } else if (formData.mothersContact.length < 10) {
      errors.push("Mother's contact must be at least 10 digits");
    }

    if (formData.totalBrother < 0) {
      errors.push("Total brothers cannot be negative");
    }
    if (formData.totalSister < 0) {
      errors.push("Total sisters cannot be negative");
    }

    if (errors.length > 0) {
      errors.forEach(error => toast.error(error));
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Get user ID
    const storedUserData = localStorage.getItem("userData");
    const userId = storedUserData ? JSON.parse(storedUserData).user?.id : null;

    if (!userId) {
      toast.error("User ID is missing. Please log in again.");
      return;
    }

    // Prepare data to submit
    const dataToSubmit = { 
      ...formData, 
      userId,
      totalBrother: parseInt(formData.totalBrother, 10) || 0,
      totalSister: parseInt(formData.totalSister, 10) || 0,
    };

    try {
      setIsSubmitting(true);
      let response;

      if (isEditing && editId) {
        // Update existing record
        response = await updateFamilyInformation(editId, dataToSubmit);
        toast.success("✅ Family Information updated successfully!");
      } else {
        // Create new record
        response = await postFamilyInformation(dataToSubmit);
        toast.success("✅ Family Information added successfully!");
      }


      // Save to localStorage and update state
      if (response && response.id) {
        
        // Save to localStorage for persistence
        localStorage.setItem(`familyInformation_${userId}`, JSON.stringify(response));
        
        // Update form state
        setFormData({
          fathersName: response.fathersName || "",
          fathersProfession: response.fathersProfession || "",
          fathersContact: response.fathersContact || "",
          mothersName: response.mothersName || "",
          mothersProfession: response.mothersProfession || "",
          mothersContact: response.mothersContact || "",
          totalBrother: response.totalBrother || 0,
          totalSister: response.totalSister || 0,
        });
        setIsEditing(true);
        setEditId(response.id);
      }
      
    } catch (error) {
      
      // Parse error message
      let errorMessage = "Failed to submit family information.";
      
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.data.error) {
          errorMessage = error.response.data.error;
        }
      }
      
      // Specific error handling
      if (error.response?.status === 409 || errorMessage.toLowerCase().includes("duplicate") || errorMessage.toLowerCase().includes("already exists")) {
        toast.error("⚠️ Family information already exists. Use Update button instead.");
      } else if (error.response?.status === 400) {
        toast.error("⚠️ Invalid data: " + errorMessage);
      } else if (error.response?.status === 404) {
        toast.error("❌ User not found. Please login again.");
      } else {
        toast.error("❌ " + errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="collapsible-section">
        <div className="section-header" onClick={toggleSection}>
          <h5 className={`section-title ${isOpen ? "open" : "closed"}`}>
            Family Information
          </h5>
          <span>
            {isOpen ? (
              <i className="fa-solid fa-angle-up"></i>
            ) : (
              <i className="fa-solid fa-angle-down"></i>
            )}
          </span>
        </div>

        {isOpen && (
          <>
            {isLoading ? (
              <div style={{ padding: "20px", textAlign: "center" }}>
                <i className="fa fa-spinner fa-spin" style={{ fontSize: "24px" }}></i>
                <p>Loading family information...</p>
              </div>
            ) : (
              <form className="basic-information-form" onSubmit={handleFormSubmit}>
                {/* Father's Information */}
                <div className="section personal-details">
                  <div className="form-group">
                    <label>Father's Name*</label>
                    <input
                      type="text"
                      name="fathersName"
                      value={formData.fathersName}
                      onChange={handleInputChange}
                      placeholder="Enter father's name"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="section personal-details">
                  <div className="form-group">
                    <label>Father's Profession*</label>
                    <input
                      type="text"
                      name="fathersProfession"
                      value={formData.fathersProfession}
                      onChange={handleInputChange}
                      placeholder="Enter father's profession"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="form-group">
                    <label>Father's Contact*</label>
                    <input
                      type="tel"
                      name="fathersContact"
                      value={formData.fathersContact}
                      onChange={handleInputChange}
                      placeholder="Enter father's contact number"
                      pattern="[0-9]{10,15}"
                      title="Please enter a valid phone number (10-15 digits)"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Mother's Information */}
                <div className="section personal-details">
                  <div className="form-group">
                    <label>Mother's Name*</label>
                    <input
                      type="text"
                      name="mothersName"
                      value={formData.mothersName}
                      onChange={handleInputChange}
                      placeholder="Enter mother's name"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="section personal-details">
                  <div className="form-group">
                    <label>Mother's Profession*</label>
                    <input
                      type="text"
                      name="mothersProfession"
                      value={formData.mothersProfession}
                      onChange={handleInputChange}
                      placeholder="Enter mother's profession"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="form-group">
                    <label>Mother's Contact*</label>
                    <input
                      type="tel"
                      name="mothersContact"
                      value={formData.mothersContact}
                      onChange={handleInputChange}
                      placeholder="Enter mother's contact number"
                      pattern="[0-9]{10,15}"
                      title="Please enter a valid phone number (10-15 digits)"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Siblings Information */}
                <div className="section personal-details">
                  <div className="form-group">
                    <label>Total Brothers</label>
                    <input
                      type="number"
                      name="totalBrother"
                      value={formData.totalBrother}
                      onChange={handleInputChange}
                      min="0"
                      max="20"
                      placeholder="0"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="form-group">
                    <label>Total Sisters</label>
                    <input
                      type="number"
                      name="totalSister"
                      value={formData.totalSister}
                      onChange={handleInputChange}
                      min="0"
                      max="20"
                      placeholder="0"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="form-actions">
                  <button 
                    type="submit" 
                    className="btn-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fa fa-spinner fa-spin" style={{ marginRight: "5px" }}></i>
                        {isEditing ? "Updating..." : "Submitting..."}
                      </>
                    ) : (
                      isEditing ? "Update Family Information" : "Submit Family Information"
                    )}
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default FamilyInformation;

