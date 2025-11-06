import React, { useState, useEffect } from "react";
import { State, City } from "country-state-city";
import UserDashboardLeftSection from "../../components/UserDashboardLeftSection";
import Footer from "../../components/Footer";
import "../../styles/user/dashboard.css";
import "../../styles/styles.css";
import "../../styles/user/profileSetting.css";
import PhysicalAttributes from "./PhysicalAttributes";
import PartnerExpectations from "./PartnerExpectations";
import BasicInformation from "./BasicInformation";
import EducationInformation from "./EducationInformation";
import FamilyInformation from "./FamilyInformation";
import CareerInformation from "./CareerInformation";


const ProfileSetting = () => {
  // Note: sections, statesList, districtsList, and location handlers are no longer needed
  // Each form component manages its own state independently

  return (
    <div className="user-dashboard-container">
      <div className="container-max-width user-dashboard-wrapper">
        <UserDashboardLeftSection />
        <div className="dashboard-right-section hidden-scrollbar">
          <h5>Profile Setting</h5>

          {/* All forms manage their own state and submission */}
          <BasicInformation />
          <PartnerExpectations />
          <PhysicalAttributes />
          <FamilyInformation />
          <CareerInformation />
          <EducationInformation />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileSetting;