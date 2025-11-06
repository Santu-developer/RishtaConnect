import React, { useState, useEffect } from "react";
import "../../styles/user/dashboard.css";
import "../../styles/styles.css";
import "../../styles/user/profileSetting.css";
import {
  careerInformationForm,
  fetchCareerData,
  deleteCareerInformation,
} from "../../services/ApiService";

// Import Toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CareerInformation = () => {
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading while checking cache/backend
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [careerData, setCareerData] = useState([]); // Stores data fetched from the backend
  const [formData, setFormData] = useState({
    company: "",
    designation: "",
    startYear: "",
    endYear: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null); // To track editing ID

  // Hybrid fetch: Check localStorage first, then backend (multi-entry - array)
  useEffect(() => {
    const loadCareerInformation = async () => {
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
        const cachedData = localStorage.getItem(`careerInformation_${userId}`);
        if (cachedData) {
          const parsed = JSON.parse(cachedData);
          setCareerData(Array.isArray(parsed) ? parsed : []);
          setIsLoading(false);
          return; // Early exit - data found in cache
        }

        // 2. Fetch from backend if not in cache
        const response = await fetchCareerData(userId);
        
        if (response && Array.isArray(response) && response.length > 0) {
          
          // Save to localStorage for next time
          localStorage.setItem(`careerInformation_${userId}`, JSON.stringify(response));
          
          setCareerData(response);
        } else {
          setCareerData([]);
        }
        
      } catch (error) {
        
        if (error.response?.status === 404) {
          setCareerData([]);
        } else if (error.response?.status === 403) {
          toast.error("Unauthorized. Please login again.");
        } else {
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadCareerInformation();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedUserData = localStorage.getItem("userData");
    const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
    const userId = parsedUserData?.user?.id;

    if (!userId) {
      toast.error("User ID is missing. Please log in again.");
      return;
    }

    // Extract year from date fields (backend expects 4-digit year)
    const extractYear = (dateString) => {
      if (!dateString) return "";
      // If it's already a 4-digit year, return as is
      if (/^\d{4}$/.test(dateString)) return dateString;
      // If it's a date format (YYYY-MM-DD), extract year
      const year = new Date(dateString).getFullYear();
      return year.toString();
    };

    const dataToSubmit = { 
      company: formData.company,
      designation: formData.designation,
      startYear: extractYear(formData.startYear),
      endYear: extractYear(formData.endYear),
      userId 
    };

    try {
      setIsSubmitting(true);
      let response;

      if (isEditing) {
        response = await careerInformationForm({ ...dataToSubmit, id: editId }, "PUT");
        // response is already the data object (not response.data)
        setCareerData((prevData) =>
          prevData.map((item) => (item.id === editId ? response : item))
        );
        toast.success("✅ Career Information updated successfully!");
      } else {
        response = await careerInformationForm(dataToSubmit, "POST");
        // response is already the data object (not response.data)
        setCareerData((prevData) => [...prevData, response]);
        toast.success("✅ Career Information added successfully!");
      }

      // Refresh data from backend and save to localStorage
      const userId = parsedUserData?.user?.id;
      if (userId) {
        try {
          const updatedData = await fetchCareerData(userId);
          if (updatedData && Array.isArray(updatedData)) {
            
            // Save to localStorage for persistence
            localStorage.setItem(`careerInformation_${userId}`, JSON.stringify(updatedData));
            
            setCareerData(updatedData);
          }
        } catch (err) {
          
          // Even if refresh fails, save current careerData to cache
          const currentData = isEditing 
            ? careerData.map((item) => (item.id === editId ? response : item))
            : [...careerData, response];
          localStorage.setItem(`careerInformation_${userId}`, JSON.stringify(currentData));
        }
      }

      // Reset Form
      setFormData({
        company: "",
        designation: "",
        startYear: "",
        endYear: "",
      });
      setIsEditing(false);
      setEditId(null);
      setShowAlert(false);
    } catch (error) {
      
      // Better error handling
      let errorMessage = "Failed to submit career information.";
      
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.data.error) {
          errorMessage = error.response.data.error;
        }
      }
      
      toast.error("❌ " + errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Edit
  const handleEdit = (id) => {
    const itemToEdit = careerData.find((item) => item.id === id);
    if (itemToEdit) {
      // Convert year (YYYY) to date format (YYYY-01-01) for date input
      const yearToDate = (year) => {
        if (!year) return "";
        // If it's already a full date, return as is
        if (year.includes("-")) return year;
        // If it's just a year, convert to YYYY-01-01
        return `${year}-01-01`;
      };

      setFormData({
        company: itemToEdit?.company || "",
        designation: itemToEdit?.designation || "",
        startYear: yearToDate(itemToEdit?.startYear),
        endYear: yearToDate(itemToEdit?.endYear),
      });
      setIsEditing(true);
      setEditId(id);
      setShowAlert(true);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this career entry?")) {
      return;
    }
    
    try {
      await deleteCareerInformation(id);
      
      // Update local state
      const updatedData = careerData.filter((item) => item.id !== id);
      setCareerData(updatedData);
      
      // Update localStorage
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        const userId = parsedUserData?.user?.id;
        if (userId) {
          localStorage.setItem(`careerInformation_${userId}`, JSON.stringify(updatedData));
        }
      }
      
      toast.success("✅ Career entry deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete career entry. Please try again.");
    }
  };

  // Close Modal
  const handleAlertClose = () => {
    setShowAlert(false);
  };

  // Toggle Section
  const toggleSection = () => {
    setIsSectionOpen(!isSectionOpen);
  };

  return (
    <>
      <div className="collapsible-section">
        <div className="section-header" onClick={toggleSection}>
          <h5 className={`section-title ${isSectionOpen ? "open" : "closed"}`}>Career Information</h5>
          <span>{isSectionOpen ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>}</span>
        </div>
        {isSectionOpen && (
          <div>
            {isLoading ? (
              <div style={{ padding: "20px", textAlign: "center" }}>
                <i className="fa fa-spinner fa-spin" style={{ fontSize: "24px" }}></i>
                <p>Loading career information...</p>
              </div>
            ) : (
              <>
                <button type="button" className="add-new-button" onClick={() => setShowAlert(true)}>
                  <i style={{ marginRight: "5px" }} className="fa fa-plus" aria-hidden="true"></i>Add New
                </button>

                <table className="education-table">
                  <thead>
                    <tr>
                      <th>S.N</th>
                      <th>Company</th>
                      <th>Designation</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {careerData.length === 0 ? (
                      <tr>
                        <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                          No career information added yet. Click "Add New" to add your first entry.
                        </td>
                      </tr>
                    ) : (
                      careerData
                        .filter((item) => item != null)
                        .map((item, index) => (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.company || "N/A"}</td>
                            <td>{item.designation || "N/A"}</td>
                            <td>{item.startYear || "N/A"}</td>
                            <td>{item.endYear || "N/A"}</td>
                            <td>
                              <button className="action-button edit-button" onClick={() => handleEdit(item?.id)}>✏️</button>
                              <button className="action-button delete-button" onClick={() => handleDelete(item?.id)}>🗑️</button>
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </>
            )}
          </div>
        )}

        {showAlert && (
          <div className="confirmation-alert">
            <div className="education-information-dialog">
              <div className="dialog-header">
                <h4>{isEditing ? "Edit Career Information" : "Add Career Information"}</h4>
                <button className="cross-button" onClick={handleAlertClose} disabled={isSubmitting}>
                  <i className="bi bi-x cross-icon"></i>
                </button>
              </div>
              <form className="education-form" onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  name="company" 
                  value={formData.company} 
                  placeholder="Company *" 
                  onChange={handleChange} 
                  required 
                  disabled={isSubmitting}
                />
                <input 
                  type="text" 
                  name="designation" 
                  value={formData.designation} 
                  placeholder="Designation *" 
                  onChange={handleChange} 
                  required 
                  disabled={isSubmitting}
                />
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  <label style={{ fontSize: "12px", color: "#666" }}>Start Date *</label>
                  <input 
                    type="date" 
                    name="startYear" 
                    value={formData.startYear} 
                    onChange={handleChange} 
                    required 
                    disabled={isSubmitting}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  <label style={{ fontSize: "12px", color: "#666" }}>End Date (Leave empty if current job)</label>
                  <input 
                    type="date" 
                    name="endYear" 
                    value={formData.endYear} 
                    onChange={handleChange} 
                    disabled={isSubmitting}
                  />
                </div>
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <i className="fa fa-spinner fa-spin" style={{ marginRight: "5px" }}></i>
                      {isEditing ? "Updating..." : "Submitting..."}
                    </>
                  ) : (
                    isEditing ? "Update" : "Submit"
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      
    </>
  );
};

export default CareerInformation;
