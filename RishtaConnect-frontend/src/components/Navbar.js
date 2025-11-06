import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/styles.css";
// import Logo from "../assets/mangala.PNG";
import icon from "../assets/Matrilab.png"
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initially false
  const location = useLocation();

  useEffect(() => {
    // Check login status when component mounts
    const userData = localStorage.getItem("userData");
    setIsLoggedIn(!!userData); // Convert to boolean

    // Event listener to detect changes in localStorage
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("userData"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Also update login state when the route changes (login sets localStorage in same tab)
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("userData"));
  }, [location]);

  const handleLogout = () => {
    // Clear all authentication data
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    localStorage.clear(); // Extra safety to clear everything
    setIsLoggedIn(false);
    
    // Force reload to clear all state
    window.location.href = "/";
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className="top-bar">
        <div className="top-bar-wrapper">
          <div className="contact-info">
            <div className="info-item">
              <i className="bi bi-envelope"></i>
              <span>rishtaconnect2025@gmail.com</span>
            </div>
            <div className="info-item">
              <i className="bi bi-telephone"></i>
              <span>+91 123456789</span>
            </div>
          </div>
          <div className="social-icons">
            <i className="bi bi-facebook"></i>
            <i className="bi bi-twitter"></i>
            <i className="bi bi-instagram"></i>
            <i className="bi bi-linkedin"></i>
          </div>
        </div>
      </div>

      
      <div className="main-navbar">
        <div className="container-max-width navbar-container">
          <div className="logo-section">
            <Link to="/">
              <img src={icon} alt="Logo" className="logo" />
            </Link>
          </div>
          <button className="menu-toggle" onClick={toggleMenu}>
            <i className={`bi ${menuOpen ? "bi-x" : "bi-list"}`}></i>
          </button>
          <nav className={`nav-links ${menuOpen ? "show" : ""}`}>
            <Link
              to="/"
              className="nav-item"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/packages"
              className="nav-item"
              onClick={() => setMenuOpen(false)}
            >
              Packages
            </Link>
            <Link
              to="/members"
              className="nav-item"
              onClick={() => setMenuOpen(false)}
            >
              Members
            </Link>
            <Link
              to="/stories"
              className="nav-item"
              onClick={() => setMenuOpen(false)}
            >
              Stories
            </Link>
            <Link
              to="/contact"
              className="nav-item"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>

            <div className="actions">
              <select className="language-select">
                <option>English</option>
                <option>Hindi</option>
              </select>
              <ThemeToggle />
              {isLoggedIn ? (
                <>
                  <Link to="/user/dashboard">
                    <button className="login-btn" onClick={() => setMenuOpen(false)}>
                      <i className="bi bi-speedometer2"></i> Dashboard
                    </button>
                  </Link>
                  <button className="login-btn" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right"></i> Logout
                  </button>
                </>
              ) : (
                <Link to="/login">
                  <button className="login-btn">
                    <i className="bi bi-person"></i> Login
                  </button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
