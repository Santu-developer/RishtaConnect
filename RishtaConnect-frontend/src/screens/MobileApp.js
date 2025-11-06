import React from 'react';
import '../styles/styles.css';
import "../styles/mobileApp.css";
import GooglePlay from "../assets/GooglePlay.png";
import AppleStore from "../assets/AppleStore.png";
import AppMobile from "../assets/MobileApp.png";

function MobileApp() {
  return (
    <div className="mobile-app-container">
      <div className="mobile-app-download-section">
        <h2 className="mobile-app-download-header">Download Mobile App</h2>
        <p className="mobile-app-download-text">
          Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien libero venenatis faucibus. Nullam quis ante.
        </p>
        <p className="mobile-app-download-text">
          Posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, consectetuer.
        </p>
        <div className="mobile-app-download-buttons">
          <a href="javascript:void(0)" className="mobile-app-google-play-button">
            <img src={GooglePlay} alt="Google Play" />
          </a>
          <a href="javascript:void(0)" className="mobile-app-app-store-button">
            <img src={AppleStore} alt="App Store" />
          </a>
        </div>
      </div>
      <div className="mobile-app-phone-mockup">
        <div className="mobile-app-phone-screen">
          <img src={AppMobile} alt="App Logo" />
        </div>

      </div>
    </div>
  );
}

export default MobileApp;
