import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {postPhysicalAttributes, updatePhysicalAttributes, fetchPhysicalAttributesData} from "../../services/ApiService";
import "../../styles/user/dashboard.css";
import "../../styles/styles.css";
import "../../styles/user/profileSetting.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PhysicalAttributes = () => {
  const [isOpen, setIsOpen] = useState(false); // Manage collapsible section
  const [isLoading, setIsLoading] = useState(true); // Loading while checking cache/backend
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    complexion: "",
    height: "",
    weight: "",
    eyeColor: "",
    hairColor: "",
    disability: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null); // To track editing ID

  const navigate = useNavigate();

  // Hybrid fetch: Check localStorage first, then backend
  useEffect(() => {
    const loadPhysicalAttributes = async () => {
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
        const cachedData = localStorage.getItem(`physicalAttributes_${userId}`);
        if (cachedData) {
          const parsed = JSON.parse(cachedData);
          setFormData({
            complexion: parsed.complexion || "",
            height: parsed.height || "",
            weight: parsed.weight || "",
            eyeColor: parsed.eyeColor || "",
            hairColor: parsed.hairColor || "",
            disability: parsed.disability || "",
          });
          setIsEditing(true);
          setEditId(parsed.id);
          setIsLoading(false);
          return; // Early exit - data found in cache
        }

        // 2. Fetch from backend if not in cache
        const response = await fetchPhysicalAttributesData(userId);
        
        if (response && response.id) {
          
          // Save to localStorage for next time
          localStorage.setItem(`physicalAttributes_${userId}`, JSON.stringify(response));
          
          setFormData({
            complexion: response.complexion || "",
            height: response.height || "",
            weight: response.weight || "",
            eyeColor: response.eyeColor || "",
            hairColor: response.hairColor || "",
            disability: response.disability || "",
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

    loadPhysicalAttributes();
  }, [navigate]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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

    const dataToSubmit = { ...formData, userId }; // Include userId in the form data

    try {
      setIsSubmitting(true);
      let response;
      
      if (isEditing) {
        // When editing, update the existing record (PUT)
        response = await updatePhysicalAttributes(editId, dataToSubmit);
        toast.success("Physical Attributes updated successfully!");
      } else {
        // When creating new, post the data (POST)
        response = await postPhysicalAttributes(dataToSubmit);
        toast.success("Physical Attributes added successfully!");
      }


      // Save to localStorage and update state
      if (response && response.id) {
        
        // Save to localStorage for persistence
        localStorage.setItem(`physicalAttributes_${userId}`, JSON.stringify(response));
        
        // Update form state
        setFormData({
          complexion: response.complexion || "",
          height: response.height || "",
          weight: response.weight || "",
          eyeColor: response.eyeColor || "",
          hairColor: response.hairColor || "",
          disability: response.disability || "",
        });
        setIsEditing(true);
        setEditId(response.id);
      }

    } catch (error) {
      
      let errorMessage = "Failed to submit physical attributes.";
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      }
      
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };


  // Toggle the collapsible section
  const toggleSection = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

 
  return (
    <>
      <div className="collapsible-section">
        {/* Collapsible Header */}
        <div className="section-header" onClick={toggleSection}>
          <h5 className={`section-title ${isOpen ? "open" : "closed"}`}>
            Physical Attributes
          </h5>
          <span>
            {isOpen ? (
              <i className="fa-solid fa-angle-up"></i>
            ) : (
              <i className="fa-solid fa-angle-down"></i>
            )}
          </span>
        </div>

        {/* Collapsible Content */}
        {isOpen && (
          <form className="basic-information-form" onSubmit={handleFormSubmit}>
            <div className="section personal-details">
              <div className="form-group">
                <label>Complexion*</label>
                <input
                  type="text"
                  name="complexion"
                  value={formData.complexion}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="section personal-details">
              <div className="form-group">
                <label>Height*</label>
                <input
                  type="text"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="section personal-details">
              <div className="form-group">
                <label>Weight*</label>
                <input
                  type="text"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="section personal-details">
              <div className="form-group">
                <label>Eye Color*</label>
                <input
                  type="text"
                  name="eyeColor"
                  value={formData.eyeColor}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="section personal-details">
              <div className="form-group">
                <label>Hair Color*</label>
                <input
                  type="text"
                  name="hairColor"
                  value={formData.hairColor}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="section personal-details">
              <div className="form-group">
                <label>Disability</label>
                <input
                  type="text"
                  name="disability"
                  value={formData.disability}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-submit">
                {isEditing ? "Update" : "Submit"}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default PhysicalAttributes;









































// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {postPhysicalAttributes, updatePhysicalAttributes, fetchPhysicalAttributesData} from "../../services/ApiService"; // Import post function
// // import updatePhysicalAttributes from "../../services/updatePhysicalAttributes"; // Import update function
// // import fetchPhysicalAttributesData from "../../services/fetchPhysicalAttributes"; // Import fetch function
// import "../../styles/user/dashboard.css";
// import "../../styles/styles.css";
// import "../../styles/user/profileSetting.css";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const PhysicalAttributes = () => {
//   const [formData, setFormData] = useState({
//     complexion: "",
//     height: "",
//     weight: "",
//     religion: "",
//     eyeColor: "",
//     hairColor: "",
//     disability: "",
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [editId, setEditId] = useState(null); // To track editing ID

//   const navigate = useNavigate();

//   useEffect(() => {
//     // Retrieve the stored user data from localStorage
//     const storedUserData = localStorage.getItem("userData");
//     if (storedUserData) {
//       const parsedUserData = JSON.parse(storedUserData);
//       const userId = parsedUserData.user.id;

//       // Fetch physical data if available
//       const fetchPhysicalData = async () => {
//         try {
//           const response = await fetchPhysicalAttributesData(userId); // Fetch data from the API
//           if (response && response.data && response.data.length > 0) {
//             const latestPhysicalData = response.data[0]; // Assuming the data is an array, take the first item
//             setFormData({
//               complexion: latestPhysicalData.complexion || "",
//               height: latestPhysicalData.height || "",
//               weight: latestPhysicalData.weight || "",
//               religion: latestPhysicalData.religion || "",
//               eyeColor: latestPhysicalData.eyeColor || "",
//               hairColor: latestPhysicalData.hairColor || "",
//               disability: latestPhysicalData.disability || "",
//             });
//             setIsEditing(true);
//             setEditId(latestPhysicalData.id); // Set ID for update
//           }
//         } catch (error) {
//           console.error("Error fetching physical attributes:", error);
//           toast.error("Error fetching physical attributes.");
//         }
//       };

//       fetchPhysicalData();
//     } else {
//       // Redirect to login if no user data is found
//       navigate("/matrilab/login");
//     }
//   }, [navigate]);

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   // Handle form submission (POST or PUT)
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     // Ensure user ID is available
//     const storedUserData = localStorage.getItem("userData");
//     const userId = storedUserData ? JSON.parse(storedUserData).user.id : null;

//     if (!userId) {
//       toast.error("User ID is missing. Please log in again.");
//       return;
//     }

//     const dataToSubmit = { ...formData, userId }; // Include userId in the form data

//     try {
//       let response;

//       if (isEditing) {
//         // When editing, update the existing record (PUT)
//         response = await updatePhysicalAttributes(editId, dataToSubmit);
//         toast.success("Physical Attributes updated successfully!");
//       } else {
//         // When creating new, post the data (POST)
//         response = await postPhysicalAttributes(dataToSubmit);
//         toast.success("Physical Attributes added successfully!");
//       }

//       // Reset the form after submission
//       setFormData({
//         complexion: "",
//         height: "",
//         weight: "",
//         religion: "",
//         eyeColor: "",
//         hairColor: "",
//         disability: "",
//       });

//       setIsEditing(false);
//       setEditId(null); // Reset edit ID

//     } catch (error) {
//       console.error("Error submitting form:", error);
//       toast.error("Failed to submit physical attributes.");
//     }
//   };

//   return (
//     <div className="physical-attributes-container">
//       {/* Form for adding or editing physical attributes */}
//       <form onSubmit={handleFormSubmit}>
//         <div>
//           <label>Complexion</label>
//           <input
//             type="text"
//             name="complexion"
//             value={formData.complexion}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label>Height</label>
//           <input
//             type="text"
//             name="height"
//             value={formData.height}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label>Weight</label>
//           <input
//             type="text"
//             name="weight"
//             value={formData.weight}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label>Religion</label>
//           <input
//             type="text"
//             name="religion"
//             value={formData.religion}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label>Eye Color</label>
//           <input
//             type="text"
//             name="eyeColor"
//             value={formData.eyeColor}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label>Hair Color</label>
//           <input
//             type="text"
//             name="hairColor"
//             value={formData.hairColor}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label>Disability</label>
//           <input
//             type="text"
//             name="disability"
//             value={formData.disability}
//             onChange={handleInputChange}
//           />
//         </div>

//         <button type="submit">
//           {isEditing ? "Update" : "Add"} Physical Attributes
//         </button>
//       </form>

//       <ToastContainer />
//     </div>
//   );
// };

// export default PhysicalAttributes;





