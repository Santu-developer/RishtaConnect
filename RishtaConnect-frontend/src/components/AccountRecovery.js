import React, { useState } from "react";
import "../styles/styles.css";
import "../styles/accountRecovery.css";
import ReCAPTCHA from "react-google-recaptcha";
import Footer from "./Footer";

function AccountRecovery() {
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle CAPTCHA verification
  const handleCaptcha = (value) => {
    if (value) {
      setCaptchaVerified(true);
      setErrorMessage("");
    } else {
      setCaptchaVerified(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!captchaVerified) {
      setErrorMessage("Please complete the CAPTCHA to proceed.");
      return;
    }

    // Form submission logic
    alert("Form submitted successfully!");
  };

  return (
    <>
      <div className="account-recovery-container">
        <div className="account-recovery-form">
          <h2>Account Recovery</h2>
          <p>
            To recover your account, please provide your email or username to
            find your account.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" placeholder="Email or Username *" required />
            </div>
            <div className="recaptcha-group">
              <ReCAPTCHA
                sitekey="6LcDC5IqAAAAAEPMK9ko-cBr1-NIuhQhsSE7Mufc" // Replace this with your actual site key
                onChange={handleCaptcha}
              />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit" className="btn-submit">
              Submit
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AccountRecovery;
