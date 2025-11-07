
import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import { loginUserForm } from "../services/ApiService";
import ApiService from "../services/ApiService";
import "../styles/loginForm.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast notifications


function LoginPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  
  const onSubmit = async (data) => {
    const { email, password } = data;
  
    // Ensure both fields are filled
    if (!email || !password) {
      toast.error("Please fill in all fields."); // Show error toast
      return;
    }
  
    try {
      // Login API call
  const response = await ApiService.login({ email, password });
  
      if (response) {
        // Store the entire response in localStorage
        localStorage.setItem("userData", JSON.stringify(response));
        localStorage.setItem("token", response.token);
  
        // Show success toast
        toast.success("Login successful!");
  
        // Delay navigation to allow toast to display
        setTimeout(() => {
          // Navigate to the dashboard after the toast message is displayed
          navigate("/user/dashboard", { replace: true });
        }, 2000); // Adjust the delay time as needed (2 seconds in this example)
      } else {
        toast.error("Invalid credentials. Please try again."); // Show error toast for invalid credentials
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || error.message || "Login failed. Please try again.";
  
      // Show error toast with the error message
      toast.error(errorMsg);
    }
  };
  
  return (
    <>
    <div className="login-container">
      <div className="login-form">
        <h2>Login to your account</h2>
        <p>Please input your username and password to access your dashboard.</p>
        <form onSubmit={handleSubmit(onSubmit)} method="post">
          <div className="form-group">
            <input
              type="email"
              placeholder="Username or Email *"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Please enter a valid email address",
                },
              })}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password *"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          <div className="form-group">
            <div className="remember-me-with-forgot-pwd">
              <div className="remember-me-container">
                <div className="remember-me-section">
                  <input type="checkbox" className="remember-me-checkbox" />
                </div>
                <p>Remember me</p>
              </div>
              <Link to="/reset" className="forgot-password">
                Forgot your password?
              </Link>
            </div>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" className="btn-login">
            Login
          </button>
        </form>

        <div className="signup">
          Haven't any account?{" "}
          <Link to="/register" className="signup-link">
            Sign Up
          </Link>
        </div>

        <div className="social-login">
          <p>Or Login with</p>
          <div className="social-btns">
            <i className="bi bi-google social-login-icons"></i>
            <i className="bi bi-facebook social-login-icons"></i>
            <i className="bi bi-linkedin social-login-icons"></i>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default LoginPage;
