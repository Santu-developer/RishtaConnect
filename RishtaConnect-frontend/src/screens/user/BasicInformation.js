import React, { useState, useEffect } from "react";
import { State, City } from "country-state-city";
import "../../styles/user/dashboard.css";
import "../../styles/styles.css";
import "../../styles/user/profileSetting.css";
import { useNavigate } from "react-router-dom";
import {
  getBasicInformationByUserId,
  fetchUserInformation,
  postBasicInformation,
  updateBasicInformation,
} from "../../services/ApiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BasicInformation = ({ id }) => {
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const [basicInfo, setBasicInfo] = useState(null);

  // Helper function to format date for input[type="date"]
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    
    return `${year}-${month}-${day}`;
  };

  // Location state management
  const [statesList, setStatesList] = useState([]);
  const [districtsList, setDistrictsList] = useState([]);
  const [selectedStateCode, setSelectedStateCode] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    religion: "",
    gender: "",
    maritalStatus: "",
    language: "",
    profession: "",
    bloodGroup: "",
    presentAddress: "",
    financialCondition: "",
    smokingHabits: "",
    drinkingStatus: "",
    state: "",
    district: "",
    zipCode: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBasicData = async () => {
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
      
      try {
        
        // Fetch basic information from the dedicated endpoint
        const basicInfoResponse = await getBasicInformationByUserId(userId);

        // Load India states first
        const states = State.getStatesOfCountry("IN") || [];
        setStatesList(states);

        if (basicInfoResponse && basicInfoResponse.id) {
          // BasicInformationResponse object received directly
          setBasicInfo(basicInfoResponse);
          setIsEditing(true);
          setEditId(basicInfoResponse.id);


          // Populate form with saved basic information
          setFormData({
            firstName: basicInfoResponse.firstName || "",
            lastName: basicInfoResponse.lastName || "",
            dateOfBirth: basicInfoResponse.dateOfBirth ? formatDateForInput(basicInfoResponse.dateOfBirth) : "",
            religion: basicInfoResponse.religion || "",
            gender: basicInfoResponse.gender || "",
            maritalStatus: basicInfoResponse.maritalStatus || "",
            language: basicInfoResponse.language || "",
            profession: basicInfoResponse.profession || "",
            bloodGroup: basicInfoResponse.bloodGroup || "",
            presentAddress: basicInfoResponse.presentAddress || "",
            financialCondition: basicInfoResponse.financialCondition || "",
            smokingHabits: basicInfoResponse.smokingHabits || "",
            drinkingStatus: basicInfoResponse.drinkingStatus || "",
            state: basicInfoResponse.state || "",
            district: basicInfoResponse.district || "",
            zipCode: basicInfoResponse.zipCode || "",
          });


          // If there's a saved state, pre-load districts
          if (basicInfoResponse.state) {
            const stateObj = states.find((s) => s.name === basicInfoResponse.state);
            if (stateObj && stateObj.isoCode) {
              setSelectedStateCode(stateObj.isoCode);
              const cities = City.getCitiesOfState("IN", stateObj.isoCode) || [];
              setDistrictsList(cities);
            }
          }

          // Set selected district
          if (basicInfoResponse.district) {
            setSelectedDistrict(basicInfoResponse.district);
          }
        } else {
          // No basic information saved yet, populate with user's registration data
          setIsEditing(false);
          setEditId(null);
          setFormData({
            firstName: userData.user?.firstName || "",
            lastName: userData.user?.lastName || "",
            dateOfBirth: "",
            religion: "",
            gender: "",
            maritalStatus: "",
            language: "",
            profession: "",
            bloodGroup: "",
            presentAddress: "",
            financialCondition: "",
            smokingHabits: "",
            drinkingStatus: "",
            state: "",
            district: "",
            zipCode: "",
          });
        }
      } catch (error) {
        
        // If no basic info exists, that's okay - user can create it
        if (error.response?.status === 404) {
          setIsEditing(false);
          setEditId(null);
          
          // Load states for dropdown
          const states = State.getStatesOfCountry("IN") || [];
          setStatesList(states);
        } else {
          toast.error("Error loading basic information.");
        }
      }
    };

    fetchBasicData();
  }, [navigate]);

  const toggleSection = () => {
    setIsSectionOpen(!isSectionOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle State selection
  const handleStateChange = (e) => {
    const stateCode = e.target.value;
    setSelectedStateCode(stateCode);

    // Find state name from isoCode
    const stateObj = statesList.find((s) => s.isoCode === stateCode);
    const stateName = stateObj ? stateObj.name : "";

    // Load cities/districts for selected state
    if (stateCode) {
      const cities = City.getCitiesOfState("IN", stateCode) || [];
      setDistrictsList(cities);
    } else {
      setDistrictsList([]);
    }

    setSelectedDistrict("");
    setFormData((prev) => ({
      ...prev,
      state: stateName,
      district: "",
    }));
  };

  // Handle District selection
  const handleDistrictSelection = (e) => {
    const districtName = e.target.value;
    setSelectedDistrict(districtName);
    setFormData((prev) => ({
      ...prev,
      district: districtName,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const storedUserData = localStorage.getItem("userData");
    const userId = storedUserData ? JSON.parse(storedUserData).user.id : null;

    if (!userId) {
      toast.error("User ID is missing. Please log in again.");
      return;
    }

    const dataToSubmit = { ...formData, userId };

    // Validation: Check if state is selected
    if (!dataToSubmit.state || dataToSubmit.state.trim() === "") {
      toast.error("Please select a State");
      return;
    }

    // Validation: Check if district is selected
    if (!dataToSubmit.district || dataToSubmit.district.trim() === "") {
      toast.error("Please select a District");
      return;
    }

    try {
      let response;
      

      if (isEditing && editId) {
        // Update existing basic information
        response = await updateBasicInformation(editId, dataToSubmit);
        toast.success("Basic Information updated successfully!");
      } else {
        // Create new basic information
        response = await postBasicInformation(dataToSubmit);
        toast.success("Basic Information added successfully!");
        
        // Set editing mode after creation
        if (response && response.id) {
          setIsEditing(true);
          setEditId(response.id);
        }
      }

      // Refresh the form with saved data
      if (response) {
        const refreshedData = await getBasicInformationByUserId(userId);
        if (refreshedData && refreshedData.id) {
          setBasicInfo(refreshedData);
          setFormData({
            firstName: refreshedData.firstName || "",
            lastName: refreshedData.lastName || "",
            dateOfBirth: refreshedData.dateOfBirth ? formatDateForInput(refreshedData.dateOfBirth) : "",
            religion: refreshedData.religion || "",
            gender: refreshedData.gender || "",
            maritalStatus: refreshedData.maritalStatus || "",
            language: refreshedData.language || "",
            profession: refreshedData.profession || "",
            bloodGroup: refreshedData.bloodGroup || "",
            presentAddress: refreshedData.presentAddress || "",
            financialCondition: refreshedData.financialCondition || "",
            smokingHabits: refreshedData.smokingHabits || "",
            drinkingStatus: refreshedData.drinkingStatus || "",
            state: refreshedData.state || "",
            district: refreshedData.district || "",
            zipCode: refreshedData.zipCode || "",
          });
        }
      }
    } catch (error) {
      toast.error("Failed to submit basic information. " + (error.message || ""));
    }
  };

  return (
    <>
      <div className="collapsible-section">
        <div className="section-header" onClick={toggleSection}>
          <h5 className={`section-title ${isSectionOpen ? "open" : "closed"}`}>
            Basic Information
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
          <form className="basic-information-form" onSubmit={handleFormSubmit}>
            <div className="section personal-details">
              <div className="form-group">
                <label>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="section personal-details">
              <div className="form-group">
                <label>Date of Birth *</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Religion *</label>
                <select
                  className="property-select"
                  name="religion"
                  value={formData.religion}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Muslim">Muslim</option>
                  <option value="Christian">Christian</option>
                  <option value="Sikh">Sikh</option>
                  <option value="Buddhist">Buddhist</option>
                  <option value="Jain">Jain</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="section personal-details">
              <div className="form-group">
                <label>Gender *</label>
                <select
                  className="property-select"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="form-group">
                <label>Marital Status *</label>
                <select
                  className="property-select"
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="Unmarried">Unmarried</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widow">Widow</option>
                  <option value="Widower">Widower</option>
                </select>
              </div>
            </div>

            <div className="section personal-details">
              <div className="form-group">
                <label>Language *</label>
                <input
                  type="text"
                  name="language"
                  placeholder="e.g., Hindi, English"
                  value={formData.language}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Profession *</label>
                <input
                  type="text"
                  name="profession"
                  placeholder="e.g., Software Engineer"
                  value={formData.profession}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="section personal-details">
              <div className="form-group">
                <label>Smoking Habits *</label>
                <select
                  className="property-select"
                  name="smokingHabits"
                  value={formData.smokingHabits}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="non-smoker">Non-Smoker</option>
                  <option value="occasional">Occasional</option>
                  <option value="regular">Regular</option>
                </select>
              </div>
              <div className="form-group">
                <label>Drinking Status *</label>
                <select
                  className="property-select"
                  name="drinkingStatus"
                  value={formData.drinkingStatus}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="non-drinker">Non-Drinker</option>
                  <option value="occasional">Occasional</option>
                  <option value="regular">Regular</option>
                </select>
              </div>
            </div>

            <div className="section personal-details">
              <div className="form-group">
                <label>Financial Condition *</label>
                <input
                  type="text"
                  name="financialCondition"
                  placeholder="e.g., Middle Class, Upper Class"
                  value={formData.financialCondition}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Blood Group *</label>
                <select
                  className="property-select"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>

            <div className="section personal-details">
              <div className="form-group">
                <label>Address *</label>
                <input
                  type="text"
                  name="presentAddress"
                  placeholder="Enter your full address"
                  value={formData.presentAddress}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="section personal-details">
              <div className="form-group">
                <label>State *</label>
                <select
                  name="state"
                  value={selectedStateCode}
                  onChange={handleStateChange}
                  className="property-select"
                  required
                >
                  <option value="">Select State</option>
                  {statesList.map((state) => (
                    <option key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>District *</label>
                <select
                  name="district"
                  value={selectedDistrict}
                  onChange={handleDistrictSelection}
                  className="property-select"
                  required
                  disabled={!selectedStateCode}
                >
                  <option value="">Select District</option>
                  {districtsList.map((city) => (
                    <option key={city.name} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="section contact-details">
              <div className="form-group">
                <label>Zip Code *</label>
                <input
                  type="text"
                  name="zipCode"
                  placeholder="Enter 6-digit PIN code"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  maxLength="6"
                  pattern="[0-9]{6}"
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-submit">
                Submit
              </button>
            </div>
          </form>
        )}
      </div>

      
    </>
  );
};

export default BasicInformation;

