import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/user/dashboard.css";
import "../../styles/styles.css";
import "../../styles/user/profileSetting.css";
import {
  educationInformationForm,
  fetchEducationData,
  deleteEducationInformation,
} from "../../services/ApiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EducationInformation = () => {
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading while checking cache/backend
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [educationData, setEducationData] = useState([]); // Ensure it's always an array
  const [formData, setFormData] = useState({
    institute: "",
    degree: "",
    rollNumber: "",
    registrationNumber: "",
    fieldOfStudy: "",
    result: "",
    startYear: "",
    endYear: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null); // Track editing ID
  const navigate = useNavigate();

  // Hybrid fetch: Check localStorage first, then backend (multi-entry - array)
  useEffect(() => {
    const loadEducationInformation = async () => {
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
        const cachedData = localStorage.getItem(`educationInformation_${userId}`);
        if (cachedData) {
          const parsed = JSON.parse(cachedData);
          setEducationData(Array.isArray(parsed) ? parsed : []);
          setIsLoading(false);
          return; // Early exit - data found in cache
        }

        // 2. Fetch from backend if not in cache
        const response = await fetchEducationData(userId);
        
        if (response && Array.isArray(response) && response.length > 0) {
          
          // Save to localStorage for next time
          localStorage.setItem(`educationInformation_${userId}`, JSON.stringify(response));
          
          setEducationData(response);
        } else {
          setEducationData([]);
        }
        
      } catch (error) {
        
        if (error.response?.status === 404) {
          setEducationData([]);
        } else if (error.response?.status === 403) {
          toast.error("Unauthorized. Please login again.");
          navigate("/login");
        } else {
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadEducationInformation();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedUserData = localStorage.getItem("userData");
    const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
    const userId = parsedUserData?.user?.id;

    if (!userId) {
      toast.error("User ID is missing. Please log in again.");
      return;
    }

    // Extract year from date fields (backend may expect specific format)
    const extractYear = (dateString) => {
      if (!dateString) return "";
      // If it's already a 4-digit year, return as is
      if (/^\d{4}$/.test(dateString)) return dateString;
      // If it's a date format (YYYY-MM-DD), extract year
      const year = new Date(dateString).getFullYear();
      return year.toString();
    };

    const dataToSubmit = {
      institute: formData.institute,
      degree: formData.degree,
      rollNumber: formData.rollNumber,
      registrationNumber: formData.registrationNumber,
      fieldOfStudy: formData.fieldOfStudy,
      result: formData.result,
      startYear: extractYear(formData.startYear),
      endYear: extractYear(formData.endYear),
      userId
    };


    try {
      setIsSubmitting(true);
      let response;

      if (isEditing) {
        response = await educationInformationForm(
          { ...dataToSubmit, id: editId },
          "PUT"
        );
        toast.success("Education Information updated successfully!");
        
        setEducationData((prevData) =>
          prevData.map((item) => (item.id === editId ? response : item))
        );
      } else {
        response = await educationInformationForm(dataToSubmit, "POST");
        toast.success("Education Information added successfully!");
        setEducationData((prevData) => [...prevData, response]);
      }

      // Refresh data from backend and save to localStorage
      if (userId) {
        try {
          const updatedData = await fetchEducationData(userId);
          if (updatedData && Array.isArray(updatedData)) {
            
            // Save to localStorage for persistence
            localStorage.setItem(`educationInformation_${userId}`, JSON.stringify(updatedData));
            
            setEducationData(updatedData);
          }
        } catch (err) {
          
          // Even if refresh fails, save current educationData to cache
          const currentData = isEditing 
            ? educationData.map((item) => (item.id === editId ? response : item))
            : [...educationData, response];
          localStorage.setItem(`educationInformation_${userId}`, JSON.stringify(currentData));
        }
      }

      setFormData({
        institute: "",
        degree: "",
        rollNumber: "",
        registrationNumber: "",
        fieldOfStudy: "",
        result: "",
        startYear: "",
        endYear: "",
      });
      setIsEditing(false);
      setEditId(null);
      setShowAlert(false);
    } catch (error) {
      
      let errorMessage = "Failed to submit education information.";
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.data.error) {
          errorMessage = error.response.data.error;
        }
      }
      
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (id) => {
    const itemToEdit = educationData.find((item) => item.id === id);

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
        institute: itemToEdit?.institute || "",
        degree: itemToEdit?.degree || "",
        rollNumber: itemToEdit?.rollNumber || "",
        registrationNumber: itemToEdit?.registrationNumber || "",
        fieldOfStudy: itemToEdit?.fieldOfStudy || "",
        result: itemToEdit?.result || "",
        startYear: yearToDate(itemToEdit?.startYear),
        endYear: yearToDate(itemToEdit?.endYear),
      });
      setIsEditing(true);
      setEditId(id);
      setShowAlert(true);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this education entry?")) {
      return;
    }
    
    try {
      await deleteEducationInformation(id);
      
      // Update local state
      const updatedData = educationData.filter((item) => item.id !== id);
      setEducationData(updatedData);
      
      // Update localStorage
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        const userId = parsedUserData?.user?.id;
        if (userId) {
          localStorage.setItem(`educationInformation_${userId}`, JSON.stringify(updatedData));
        }
      }
      
      toast.success("Record deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete record.");
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const handleAddNewClick = () => {
    setShowAlert(true);
  };

  const toggleSection = () => {
    setIsSectionOpen(!isSectionOpen);
  };

  return (
    <>
      <div className="collapsible-section">
        <div className="section-header" onClick={toggleSection}>
          <h5 className={`section-title ${isSectionOpen ? "open" : "closed"}`}>
            Education Information
          </h5>
          <span>
            {isSectionOpen ? (
              <i className="fa-solid fa-angle-up"></i>
            ) : (
              <i className="fa-solid fa-angle-down"></i>
            )}
          </span>
        </div>

        {isSectionOpen && (
          <div className="">
            <button className="add-new-button" onClick={handleAddNewClick}>
              <i className="fa fa-plus" aria-hidden="true"></i> Add New
            </button>

            <table className="education-table">
              <thead>
                <tr>
                  <th>S.N</th>
                  <th>Degree</th>
                  <th>Institute</th>
                  <th>Field</th>
                  <th>Result</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {(Array.isArray(educationData) ? educationData : [])
                  .filter((item) => item)
                  .map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.degree || "N/A"}</td>
                      <td>{item.institute || "N/A"}</td>
                      <td>{item.fieldOfStudy || "N/A"}</td>
                      <td>{item.result || "N/A"}</td>
                      <td>{item.startYear || "N/A"}</td>
                      <td>{item.endYear || "N/A"}</td>
                      <td>
                        <button
                          className="action-button edit-button"
                          onClick={() => handleEdit(item.id)}
                        >
                          ✏️
                        </button>
                        <button
                          className="action-button delete-button"
                          onClick={() => handleDelete(item.id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Confirmation Alert */}
        {showAlert && (
          <div className="confirmation-alert">
            <div className="education-information-dialog">
              <div className="dialog-header">
                <h4>Add Education Information</h4>
                <button className="cross-button" onClick={handleAlertClose}>
                  <i className="bi bi-x cross-icon"></i>
                </button>
              </div>

              <form className="education-form" onSubmit={handleSubmit}>
                <h2>{isEditing ? "Edit Education" : "Add Education"}</h2>
                <div className="section personal-details">
                  <div className="form-group">
                    <input
                      type="text"
                      name="institute"
                      value={formData.institute}
                      placeholder="Institute *"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="degree"
                      value={formData.degree}
                      placeholder="Degree *"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="section personal-details">
                  <div className="form-group">
                    <input
                      type="text"
                      name="rollNumber"
                      value={formData.rollNumber}
                      placeholder="Roll Number *"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      name="registrationNumber"
                      value={formData.registrationNumber}
                      placeholder="Registration Number"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="section personal-details">
                  <div className="form-group">
                    <input
                      type="text"
                      name="fieldOfStudy"
                      value={formData.fieldOfStudy}
                      placeholder="Field Of Study *"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      name="result"
                      value={formData.result}
                      placeholder="Result"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="section personal-details">
                  <div className="form-group">
                    <input
                      type="date"
                      name="startYear"
                      placeholder="Starting Year"
                      value={formData.startYear}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="date"
                      name="endYear"
                      value={formData.endYear}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <button type="submit" className="submit-button">
                  {isEditing ? "Update" : "Submit"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      
    </>
  );
};

export default EducationInformation;
