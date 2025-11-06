import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  // Check if token is expired
  const isTokenExpired = () => {
    const userData = localStorage.getItem("userData");
    if (!userData) return true;
    
    try {
      const parsedData = JSON.parse(userData);
      const token = parsedData.token;
      
      if (!token) return true;
      
      // Decode JWT token to check expiry
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiryTime = payload.exp * 1000; // Convert to milliseconds
      const currentTime = Date.now();
      
      return currentTime >= expiryTime;
    } catch (error) {
      // Handle token parsing errors
      return true;
    }
  };

  useEffect(() => {
    // Check token expiry on every route change
    if (isTokenExpired()) {
      localStorage.removeItem("userData");
      localStorage.removeItem("token");
      localStorage.clear();
    }
  }, [location]);

  const userData = localStorage.getItem("userData");
  const isAuthenticated = userData && !isTokenExpired();

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
