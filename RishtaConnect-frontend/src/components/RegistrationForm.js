import React, { useState } from "react";
import "../styles/registrationForm.css";
import "../styles/styles.css"; // Keeping styles for the form
import ApiService from "../services/ApiService";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast notifications


function RegistrationForm() {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Ensure formData is valid before submitting
  if (!formData.email || !formData.password || !formData.confirmPassword) {
    toast.error("⚠️ Please fill in all fields.", {
      position: "top-right",
      autoClose: 3000,
    });
    return;
  }

  // Check if passwords match
  if (formData.password !== formData.confirmPassword) {
    toast.error("🔒 Passwords do not match. Please try again.", {
      position: "top-right",
      autoClose: 3000,
    });
    return;
  }

  try {
    // Submit the registration form using the API service
    const response = await ApiService.register(formData);
    
    // Show success toast notification
    toast.success("🎉 Registration successful! Redirecting to login...", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    // Navigate to the login page after a short delay
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  } catch (error) {
    // Handle error and display appropriate message
    toast.error(error.response?.data?.message || "Failed to submit the form. Please try again.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
};


  return (
    <>
    <div className="registration-container">
      <form onSubmit={handleSubmit} className="registration-form simple-registration">
        <h2>Create an account</h2>
        <p className="subheading">Please Provide your valid informations to register!</p>

        <div className="row">
          <div className="form-group col-50">
            <input
              type="text"
              name="firstName"
              placeholder="First Name *"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-50">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name *"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group full-width">
          <input
            type="email"
            name="email"
            placeholder="E-Mail Address *"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row">
          <div className="form-group col-50">
            <input
              type="password"
              name="password"
              placeholder="Password *"
              value={formData.password}
              onChange={handleChange}
              minLength={6}
              required
            />
          </div>
          <div className="form-group col-50">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password *"
              value={formData.confirmPassword}
              onChange={handleChange}
              minLength={6}
              required
            />
          </div>
        </div>

        {/* reCAPTCHA removed on request */}

        <div className="accept-terms">
          <div>
            <input type="checkbox" required className="accept-terms-checkbox" />
          </div>
          <p>
            I agree with
            <a className="policy-link" href="/privacy"> Privacy Policy</a>
            ,
            <a className="policy-link" href="/terms"> Terms of Service</a>
            ,
            <a className="policy-link" href="/purchase"> Purchase Policy</a>
          </p>
        </div>

  <button type="submit" className="register-btn">Register</button>
  <div className="have-account">Have an account? <Link to="/login" className="login-link">Login</Link></div>
        <div style={{height:12}}></div>
        <div style={{borderTop:'1px solid #f1f1f1', marginTop:14, paddingTop:14, textAlign:'center', color:'#b3b3b3'}}>Or Register with</div>
        <div className="social-register">
          <button type="button" className="social-btn" aria-label="google" title="Google" style={{background:'#2b8be6'}}>
            <i className="bi bi-google" style={{color:'#fff'}}></i>
          </button>
          <button type="button" className="social-btn" aria-label="facebook" title="Facebook" style={{background:'#1877f2'}}>
            <i className="bi bi-facebook" style={{color:'#fff'}}></i>
          </button>
          <button type="button" className="social-btn" aria-label="linkedin" title="LinkedIn" style={{background:'#0a66c2'}}>
            <i className="bi bi-linkedin" style={{color:'#fff'}}></i>
          </button>
        </div>
      </form>
    </div>

    
    </>
  );
}

export default RegistrationForm;
