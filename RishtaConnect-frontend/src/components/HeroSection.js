import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/styles.css";
import "../styles/heroSection.css";
import Slider1 from "../assets/Slider1.jpg";
import Slider3 from "../assets/Slider2.jpg";
import Slider4 from "../assets/Slider4.jpg";
import Slider5 from "../assets/Slider5.jpg";

const HeroSection = () => {
  const images = [Slider1, Slider3, Slider4, Slider5];
  const navigate = useNavigate();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Search form state matching Member page filters
  const [searchFilters, setSearchFilters] = useState({
    gender: "",
    maritalStatus: "",
    religion: "",
    language: "",
    smokingHabits: "",
    drinkingStatus: "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Check if user is logged in
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    setIsLoggedIn(!!userData);
  }, []);

  // Check if user is logged in
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    setIsLoggedIn(!!userData);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    // Check if user is logged in
    if (!isLoggedIn) {
      toast.error("Please login to search for members");
      navigate("/login");
      return;
    }

    // Build query string from filters
    const params = new URLSearchParams();
    
    Object.entries(searchFilters).forEach(([key, value]) => {
      if (value && value !== "") {
        params.append(key, value);
      }
    });

    // Redirect to members page with filters
    navigate(`/members?${params.toString()}`);
    toast.success("Searching members with your criteria!");
  };

  return (
    <>
      <div
        className="hero-section"
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`,
        }}
      >
        <div className="content">
          <h4>
            <span id="content-h4">Welcome</span> To{" "}
            <span id="mang">RishtaConnect</span>
          </h4>

          <p>India's Most Trusted Matrimonial Platform - Find Your Ideal Life Partner</p>
          <button className="success-stories-button" onClick={() => navigate("/success-stories")}>Success Stories</button>
        </div>
        <div className="partner-form">
          <h2>Find Your Perfect Match</h2>

          {!isLoggedIn ? (
            <div style={{ textAlign: "center", padding: "30px" }}>
              <p style={{ fontSize: "16px", marginBottom: "20px", color: "#666" }}>
                Please login to search for members
              </p>
              <button 
                type="button"
                className="btn btn-primary search-button"
                onClick={() => navigate("/login")}
              >
                Login to Search
              </button>
            </div>
          ) : (
            <form onSubmit={handleSearchSubmit}>
              <div className="form-group">
                <label htmlFor="gender">Looking For (Gender)</label>
                <select 
                  id="gender" 
                  name="gender"
                  className="form-control"
                  value={searchFilters.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="form-row w-100">
                <div className="form-group w-48">
                  <label htmlFor="maritalStatus">Marital Status</label>
                  <select 
                    id="maritalStatus" 
                    name="maritalStatus"
                    className="form-control"
                    value={searchFilters.maritalStatus}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Status</option>
                    <option value="Unmarried">Unmarried</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widow">Widow</option>
                    <option value="Widower">Widower</option>
                  </select>
                </div>
                <div className="form-group w-48">
                  <label htmlFor="religion">Religion</label>
                  <select 
                    id="religion" 
                    name="religion"
                    className="form-control"
                    value={searchFilters.religion}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Religion</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Islam">Islam</option>
                    <option value="Christian">Christian</option>
                    <option value="Buddhist">Buddhist</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="language">Language</label>
                <input
                  type="text"
                  id="language"
                  name="language"
                  placeholder="e.g. Hindi, English"
                  className="form-control"
                  value={searchFilters.language}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-row w-100">
                <div className="form-group w-48">
                  <label htmlFor="smokingHabits">Smoking Habits</label>
                  <select 
                    id="smokingHabits" 
                    name="smokingHabits"
                    className="form-control"
                    value={searchFilters.smokingHabits}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Habit</option>
                    <option value="non-smoker">Non-Smoker</option>
                    <option value="occasional">Occasional</option>
                    <option value="regular">Regular</option>
                  </select>
                </div>
                <div className="form-group w-48">
                  <label htmlFor="drinkingStatus">Drinking Status</label>
                  <select 
                    id="drinkingStatus" 
                    name="drinkingStatus"
                    className="form-control"
                    value={searchFilters.drinkingStatus}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Status</option>
                    <option value="non-drinker">Non-Drinker</option>
                    <option value="occasional">Occasional</option>
                    <option value="regular">Regular</option>
                  </select>
                </div>
              </div>

              <div className="form-group col-lg-12 text-center">
                <button type="submit" className="btn btn-primary search-button">
                  Search Members
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
