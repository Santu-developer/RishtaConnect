import React from "react";
import "../styles/styles.css";
import "../styles/aboutUsSection.css";
import AboutImg from "../assets/AboutImg.jpg";

const AboutUsSection = () => {
  return (
    <section className="about-us">
      <div className="container-max-width about-us-container">
        <div className="about-us-image">
          <img src={AboutImg} alt="Couple" />
          <div className="play-button">
            <i className="fa fa-play"></i>
          </div>
        </div>
        <div className="about-us-content">
          <h2>About Us</h2>
          <p>
            RishtaConnect is India's leading matrimonial platform, dedicated to helping individuals find their perfect life partner. 
            With thousands of verified profiles across all communities, religions, and castes, we make it easy for you to connect 
            with compatible matches. Our platform combines traditional Indian values with modern technology to deliver a safe, 
            secure, and trustworthy matchmaking experience. Whether you're looking for a partner from your own community or 
            exploring inter-caste alliances, RishtaConnect provides comprehensive search filters and personalized matchmaking services 
            to help you find your soulmate.
          </p>

          <div className="about-us-features">
            <div className="feature">
              <div className="icon-container">
                <i className="fa fa-id-card-alt"></i>
              </div>
              <p>Verified Indian profiles with genuine details</p>
            </div>
            <div className="feature">
              <div className="icon-container">
                <i className="fa fa-comments"></i>
              </div>
              <p>Find matches based on caste, religion & horoscope</p>
            </div>
            <div className="feature">
              <div className="icon-container">
                <i className="fa fa-box-open"></i>
              </div>
              <p>100% privacy for your data and profile</p>
            </div>
            <div className="feature">
              <div className="icon-container">
                <i className="fa fa-shield-alt"></i>
              </div>
              <p>Trusted by millions of Indian families</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
