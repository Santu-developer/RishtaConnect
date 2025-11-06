import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/user/dashboard.css";
import "../../styles/styles.css";
import "../../styles/user/profileSetting.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  postPartnerExpectations,
  updatePartnerExpectations,
  fetchPartnerExpectations,
} from "../../services/ApiService";

const PartnerExpectations = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    generalRequirement: "",
    preferredMinAge: "",
    preferredMaxAge: "",
    preferredMinHeight: "",
    preferredMaxHeight: "",
    preferredMaxWeight: "",
    preferredComplexion: "",
    preferredEducation: "",
    preferredOccupation: "",
    preferredLanguages: "",
    preferredPersonality: "",
    preferredFamilyValues: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch saved data on mount (from localStorage or backend)
  useEffect(() => {
    const loadPartnerExpectations = async () => {
      const storedUserData = localStorage.getItem("userData");
      if (!storedUserData) {
        navigate("/login");
        return;
      }

      const userData = JSON.parse(storedUserData);
      const userId = userData.user?.id || userData.id;
      
      if (!userId) {
        toast.error("User ID not found. Please login again.");
        navigate("/login");
        return;
      }

      // Check localStorage first
      const cachedData = localStorage.getItem(`partnerExpectations_${userId}`);
      if (cachedData) {
        try {
          const parsed = JSON.parse(cachedData);
          setFormData({
            generalRequirement: parsed.generalRequirement || "",
            preferredMinAge: parsed.preferredMinAge || "",
            preferredMaxAge: parsed.preferredMaxAge || "",
            preferredMinHeight: parsed.preferredMinHeight || "",
            preferredMaxHeight: parsed.preferredMaxHeight || "",
            preferredMaxWeight: parsed.preferredMaxWeight || "",
            preferredComplexion: parsed.preferredComplexion || "",
            preferredEducation: parsed.preferredEducation || "",
            preferredOccupation: parsed.preferredOccupation || "",
            preferredLanguages: parsed.preferredLanguages || "",
            preferredPersonality: parsed.preferredPersonality || "",
            preferredFamilyValues: parsed.preferredFamilyValues || "",
          });
          setIsEditing(true);
          setEditId(parsed.id);
          setIsLoading(false);
          return;
        } catch (err) {
        }
      }

      // Fetch from backend if not in cache
      try {
        const response = await fetchPartnerExpectations(userId);
        
        if (response && response.id) {
          
          // Save to localStorage
          localStorage.setItem(`partnerExpectations_${userId}`, JSON.stringify(response));
          
          // Populate form
          setFormData({
            generalRequirement: response.generalRequirement || "",
            preferredMinAge: response.preferredMinAge || "",
            preferredMaxAge: response.preferredMaxAge || "",
            preferredMinHeight: response.preferredMinHeight || "",
            preferredMaxHeight: response.preferredMaxHeight || "",
            preferredMaxWeight: response.preferredMaxWeight || "",
            preferredComplexion: response.preferredComplexion || "",
            preferredEducation: response.preferredEducation || "",
            preferredOccupation: response.preferredOccupation || "",
            preferredLanguages: response.preferredLanguages || "",
            preferredPersonality: response.preferredPersonality || "",
            preferredFamilyValues: response.preferredFamilyValues || "",
          });
          setIsEditing(true);
          setEditId(response.id);
        } else {
        }
      } catch (error) {
        if (error.response?.status === 404) {
        } else {
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadPartnerExpectations();
  }, [navigate]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Ensure numbers are properly formatted
    const formattedValue = ["preferredMinAge", "preferredMaxAge", "preferredMaxWeight"].includes(name)
        ? value.replace(/\D/g, "") // Allow only digits
        : ["preferredMinHeight", "preferredMaxHeight"].includes(name)
        ? value.replace(/[^0-9.]/g, "") // Allow numbers and a single dot
        : value; // Leave other fields unchanged

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const toggleSection = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  // Handle form submission (POST or PUT)
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Ensure user ID is available
    const storedUserData = localStorage.getItem("userData");
    const userId = storedUserData ? JSON.parse(storedUserData).user.id : null;

    if (!userId) {
      toast.error("User ID is missing. Please log in again.");
      return;
    }

    // Data to be submitted (Including userId)
    const dataToSubmit = { 
      ...formData, 
      userId,
      preferredMinAge: formData.preferredMinAge ? parseInt(formData.preferredMinAge, 10) : null,
      preferredMaxAge: formData.preferredMaxAge ? parseInt(formData.preferredMaxAge, 10) : null,
      preferredMinHeight: formData.preferredMinHeight ? parseFloat(formData.preferredMinHeight) : null,
      preferredMaxHeight: formData.preferredMaxHeight ? parseFloat(formData.preferredMaxHeight) : null,
      preferredMaxWeight: formData.preferredMaxWeight ? parseInt(formData.preferredMaxWeight, 10) : null
    };

    try {
      let response;
      

      if (isEditing && editId) {
        // Update existing record
        response = await updatePartnerExpectations(editId, dataToSubmit);
        toast.success("Partner Expectations updated successfully!");
      } else {
        // Create new record
        response = await postPartnerExpectations(dataToSubmit);
        toast.success("Partner Expectations added successfully!");
      }

      // Save to localStorage and update state
      if (response && response.id) {
        
        // Save to localStorage for persistence
        localStorage.setItem(`partnerExpectations_${userId}`, JSON.stringify(response));
        
        // Update form state
        setFormData({
          generalRequirement: response.generalRequirement || "",
          preferredMinAge: response.preferredMinAge || "",
          preferredMaxAge: response.preferredMaxAge || "",
          preferredMinHeight: response.preferredMinHeight || "",
          preferredMaxHeight: response.preferredMaxHeight || "",
          preferredMaxWeight: response.preferredMaxWeight || "",
          preferredComplexion: response.preferredComplexion || "",
          preferredEducation: response.preferredEducation || "",
          preferredOccupation: response.preferredOccupation || "",
          preferredLanguages: response.preferredLanguages || "",
          preferredPersonality: response.preferredPersonality || "",
          preferredFamilyValues: response.preferredFamilyValues || "",
        });
        setIsEditing(true);
        setEditId(response.id);
      }

    } catch (error) {
      
      let errorMessage = "Failed to submit partner expectations.";
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      }
      
      toast.error(errorMessage);
    }
  };

  return (
    
    <>
      <div className="collapsible-section">
        <div className="section-header" onClick={toggleSection}>
          <h5 className={`section-title ${isOpen ? "open" : "closed"}`}>
            Partner Expectations
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
          <form className="basic-information-form" onSubmit={handleFormSubmit}>
            {/* General Requirement */}
            <div className="section personal-details">
              <div className="form-group">
                <textarea
                  name="generalRequirement"
                  placeholder="General Requirement"
                  value={formData.generalRequirement}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Age Section */}
            <div className="section personal-details">
              <div className="form-group">
                <label>Preferred Minimum Age</label>
                <input
                  type="number"
                  name="preferredMinAge"
                  value={formData.preferredMinAge}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Preferred Maximum Age</label>
                <input
                  type="number"
                  name="preferredMaxAge"
                  value={formData.preferredMaxAge}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Height Section */}
            <div className="section personal-details">
              <div className="form-group">
                <label>Preferred Minimum Height</label>
                <input
                  type="number"
                  name="preferredMinHeight"
                  value={formData.preferredMinHeight}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Preferred Maximum Height</label>
                <input
                  type="number"
                  name="preferredMaxHeight"
                  value={formData.preferredMaxHeight}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Weight Section */}
            <div className="section personal-details">
              <div className="form-group">
                <label>Preferred Maximum Weight</label>
                <input
                  type="number"
                  name="preferredMaxWeight"
                  value={formData.preferredMaxWeight}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Preferred Complexion</label>
                <input
                  type="text"
                  name="preferredComplexion"
                  value={formData.preferredComplexion}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Education and Occupation */}
            <div className="section personal-details">
              <div className="form-group">
                <label>Preferred Education</label>
                <input
                  type="text"
                  name="preferredEducation"
                  value={formData.preferredEducation}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Preferred Occupation</label>
                <input
                  type="text"
                  name="preferredOccupation"
                  value={formData.preferredOccupation}
                  onChange={handleInputChange}
                  placeholder="e.g., Doctor, Engineer, Teacher"
                />
              </div>
            </div>

            {/* Languages and Personality */}
            <div className="section personal-details">
              <div className="form-group">
                <label>Preferred Languages</label>
                <input
                  type="text"
                  name="preferredLanguages"
                  value={formData.preferredLanguages}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Preferred Personality</label>
                <input
                  type="text"
                  name="preferredPersonality"
                  value={formData.preferredPersonality}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Family Values */}
            <div className="section personal-details">
              <div className="form-group">
                <label>Preferred Family Values</label>
                <input
                  type="text"
                  name="preferredFamilyValues"
                  value={formData.preferredFamilyValues}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-submit">
                Save Partner Expectations
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default PartnerExpectations;
