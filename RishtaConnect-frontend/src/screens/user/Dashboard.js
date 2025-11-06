import React, { useEffect, useState } from "react";
import "../../styles/user/dashboard.css";
import "../../styles/matrimonialPackage.css";
import "../../styles/styles.css";
import ContactImg from "../../assets/ContactImg.png";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import UserDashboardLeftSection from "../../components/UserDashboardLeftSection";
import ApiService from "../../services/ApiService";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [currentPackage, setCurrentPackage] = useState(null);
  const [loadingPackage, setLoadingPackage] = useState(true);
  const [dashboardStats, setDashboardStats] = useState({
    unreadMessages: 0,
    galleryImages: 0,
    profileCompletion: 0,
    totalContacts: 0,
    shortlisted: 0,
    interests: 0
  });
  const [latestInterests, setLatestInterests] = useState([]);
  const [interestRequests, setInterestRequests] = useState([]);
  const [loadingInterests, setLoadingInterests] = useState(true);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the stored user data from localStorage
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
      fetchCurrentPackage();
      fetchDashboardStats();
      fetchLatestInterests();
      fetchInterestRequests();
    } else {
      // Redirect to login if no user data is found
      navigate("/login");
    }
  }, [navigate]);

  const fetchDashboardStats = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userId = userData?.user?.id || userData?.id;

      if (!userId) return;

      // Fetch dashboard statistics
      const [galleryResponse, messagesResponse, interestResponse, shortlistResponse] = await Promise.allSettled([
        ApiService.getGalleryByUserId(userId),
        ApiService.getUnreadMessageCount(userId),
        ApiService.getInterestCount(userId),
        ApiService.getShortlistCount(userId)
      ]);

      const stats = {
        unreadMessages: messagesResponse.status === 'fulfilled' ? messagesResponse.value : 0,
        galleryImages: galleryResponse.status === 'fulfilled' ? galleryResponse.value.length : 0,
        profileCompletion: await calculateProfileCompletion(userId),
        totalContacts: 0, // Will be implemented when contacts API is ready
        shortlisted: shortlistResponse.status === 'fulfilled' ? shortlistResponse.value : 0,
        interests: interestResponse.status === 'fulfilled' ? interestResponse.value : 0
      };

      setDashboardStats(stats);
    } catch (error) {
      // Stats fetch failed - continue with zeros
    }
  };

  const calculateProfileCompletion = async (userId) => {
    try {
      let completedSections = 0;
      const totalSections = 6; // Basic, Physical, Education, Career, Family, Partner

      // Check each section
      const [basic, physical, education, career, family, partner] = await Promise.allSettled([
        ApiService.getBasicInformationByUserId(userId),
        ApiService.getPhysicalAttributesByUserId(userId),
        ApiService.getEducationInformationByUserId(userId),
        ApiService.getCareerInformationByUserId(userId),
        ApiService.getFamilyInformationByUserId(userId),
        ApiService.getPartnerExpectationsByUserId(userId)
      ]);

      if (basic.status === 'fulfilled' && basic.value?.id) completedSections++;
      if (physical.status === 'fulfilled' && physical.value?.id) completedSections++;
      if (education.status === 'fulfilled' && education.value?.length > 0) completedSections++;
      if (career.status === 'fulfilled' && career.value?.length > 0) completedSections++;
      if (family.status === 'fulfilled' && family.value?.id) completedSections++;
      if (partner.status === 'fulfilled' && partner.value?.id) completedSections++;

      return Math.round((completedSections / totalSections) * 100);
    } catch (error) {
      return 0;
    }
  };

  const fetchCurrentPackage = async () => {
    try {
      setLoadingPackage(true);
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userId = userData?.user?.id || userData?.id;

      if (!userId) {
        setLoadingPackage(false);
        return;
      }

      // Fetch user-specific purchase history (optimized)
      const userPurchases = await ApiService.getPurchaseHistoryByUserId(userId);
      
      // Filter and sort completed purchases
      const activePurchases = Array.isArray(userPurchases)
        ? userPurchases
            .filter(p => p.status === "COMPLETED" || p.status === "Purchased")
            .sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate))
        : [];

      if (activePurchases.length > 0) {
        setCurrentPackage(activePurchases[0]);
      } else {
        setCurrentPackage(null);
      }
    } catch (error) {
      setCurrentPackage(null);
    } finally {
      setLoadingPackage(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  const calculateExpiryDate = (purchaseDate, validityPeriod) => {
    if (!purchaseDate) return "N/A";
    
    // Extract number of days from validityPeriod (e.g., "30 days" -> 30)
    const daysMatch = validityPeriod?.match(/(\d+)/);
    const days = daysMatch ? parseInt(daysMatch[1]) : 30;
    
    const date = new Date(purchaseDate);
    date.setDate(date.getDate() + days);
    
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  const fetchLatestInterests = async () => {
    try {
      setLoadingInterests(true);
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userId = userData?.user?.id || userData?.id;

      if (!userId) {
        setLoadingInterests(false);
        return;
      }

      // Fetch user's interests (interests they sent)
      const interests = await ApiService.getMyInterests(userId);
      
      // Take only latest 10, sorted by date (newest first)
      const sortedInterests = interests
        .sort((a, b) => new Date(b.interestDate) - new Date(a.interestDate))
        .slice(0, 10);
      
      setLatestInterests(sortedInterests);
    } catch (error) {
      setLatestInterests([]);
    } finally {
      setLoadingInterests(false);
    }
  };

  const fetchInterestRequests = async () => {
    try {
      setLoadingRequests(true);
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userId = userData?.user?.id || userData?.id;

      if (!userId) {
        setLoadingRequests(false);
        return;
      }

      // Fetch interests received by user (where they are the target)
      const requests = await ApiService.getReceivedInterests(userId);
      
      // Take only latest 10, sorted by date (newest first)
      const sortedRequests = requests
        .sort((a, b) => new Date(b.interestDate) - new Date(a.interestDate))
        .slice(0, 10);
      
      setInterestRequests(sortedRequests);
    } catch (error) {
      setInterestRequests([]);
    } finally {
      setLoadingRequests(false);
    }
  };

  const renderStatusBadge = (status) => {
    const statusUpper = status?.toUpperCase() || "PENDING";
    if (statusUpper === "PENDING")
      return <span className="status pending">Pending</span>;
    if (statusUpper === "ACCEPTED")
      return <span className="status accepted">Accepted</span>;
    if (statusUpper === "REJECTED")
      return <span className="status rejected">Rejected</span>;
    return <span className="status pending">{status}</span>;
  };

  const renderActionButton = (status) => {
    const statusUpper = status?.toUpperCase() || "PENDING";
    return (
      <button
        className={`action-button ${statusUpper === "ACCEPTED" ? "blue" : "pink"}`}
        title="Action"
      >
        {statusUpper === "ACCEPTED" ? "✉" : "📧"}
      </button>
    );
  };

  const formatInterestDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  };

  return (
    <div className="user-dashboard-container">
      <div className="container-max-width user-dashboard-wrapper">
        
        < UserDashboardLeftSection/>
        <div className="dashboard-right-section hidden-scrollbar">
          <h5>Dashboard</h5>
          <div className="dashboard-counter-boxes-container">
            <div className="counter-box rosso-bg-with-border">
              <div className="counter-box-icon rosso-bg">
                <i className="fa-solid fa-user-check" aria-hidden="true"></i>
              </div>
              <div className="counter-box-content">
                <h4>{dashboardStats.profileCompletion}%</h4>
                <span>Profile Completion</span>
              </div>
            </div>

            <div className="counter-box goldenrod-bg-with-border">
              <div className="counter-box-icon goldenrod-bg">
                <i className="fa-solid fa-envelope" aria-hidden="true"></i>
              </div>
              <div className="counter-box-content">
                <h4>{dashboardStats.unreadMessages}</h4>
                <span>Unread Messages</span>
              </div>
            </div>
            
            <div className="counter-box emerald-bg-with-border">
              <div className="counter-box-icon emerald-bg">
                <i className="fa-solid fa-image" aria-hidden="true"></i>
              </div>
              <div className="counter-box-content">
                <h4>{dashboardStats.galleryImages}/{currentPackage?.galleryImageLimit || '5'}</h4>
                <span>Gallery Images</span>
              </div>
            </div>
            
            <div className="counter-box lavender-bg-with-border">
              <div className="counter-box-icon lavender-bg">
                <i className="fa-solid fa-heart" aria-hidden="true"></i>
              </div>
              <div className="counter-box-content">
                <h4>{dashboardStats.interests}</h4>
                <span>My Interests</span>
              </div>
            </div>
            
            <div className="counter-box rosso-bg-with-border">
              <div className="counter-box-icon rosso-bg">
                <i className="fa-solid fa-star" aria-hidden="true"></i>
              </div>
              <div className="counter-box-content">
                <h4>{dashboardStats.shortlisted}</h4>
                <span>Shortlisted Profiles</span>
              </div>
            </div>
            
            <div className="counter-box goldenrod-bg-with-border">
              <div className="counter-box-icon goldenrod-bg">
                <i className="fa-solid fa-eye" aria-hidden="true"></i>
              </div>
              <div className="counter-box-content">
                <h4>{currentPackage?.profileViewLimit || '10'}/Month</h4>
                <span>Profile View Limit</span>
              </div>
            </div>
          </div>

          <div className="pacakage-detail-container">
            <div className="current-pkg-container">
              <h5>Current Package</h5>
            </div>

            {loadingPackage ? (
              <div style={{ textAlign: "center", padding: "30px", color: "var(--text-muted)" }}>
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p style={{ marginTop: "10px", fontSize: "14px" }}>Loading package info...</p>
              </div>
            ) : currentPackage ? (
              <div className="current-pkg-wrapper dashboard-package-card">
                <div className="plan">
                  <div className="plan__head">
                    <div className="plan__head-content">
                      <h4 className="text--white mt-0 mb-0 text-center">{currentPackage.packageName || "Unknown Package"}</h4>
                    </div>
                  </div>
                  <div className="plan__body">
                    <div className="text-center">
                      <h5 className="plan__body-price m-0 text-center">
                        {currentPackage.price === 0 ? "Free" : `₹${currentPackage.price}`}
                      </h5>
                    </div>

                    <ul className="list list--base">
                      <li>
                        <i className="text--base fas fa-check"></i>
                        <span className="feature-title">Validity Period:</span> {currentPackage.validityPeriod || "30 days"}
                      </li>
                      <li>
                        <i className="text--base fas fa-check"></i>
                        <span className="feature-title">Purchase Date:</span> {formatDate(currentPackage.purchaseDate)}
                      </li>
                      <li>
                        <i className="text--base fas fa-check"></i>
                        <span className="feature-title">Expiry Date:</span> {calculateExpiryDate(currentPackage.purchaseDate, currentPackage.validityPeriod)}
                      </li>
                      <li>
                        <i className="text--base fas fa-check"></i>
                        <span className="feature-title">Profile View Limit:</span> {currentPackage.profileViewLimit || "10"}/month
                      </li>
                      <li>
                        <i className="text--base fas fa-check"></i>
                        <span className="feature-title">Status:</span> 
                        <span className="status accepted" style={{ marginLeft: "8px" }}>
                          Active
                        </span>
                      </li>
                    </ul>
                    <div className="mt-3 text-center">
                      <Link to="/packages" className="buy-now-card-btn dashboard-upgrade-btn">
                        <i className="fas fa-arrow-up" style={{ marginRight: "5px" }}></i>
                        Upgrade Plan
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="current-pkg-wrapper" style={{ textAlign: "center", padding: "30px" }}>
                <i className="bi bi-box-seam" style={{ fontSize: "48px", color: "var(--text-muted)", marginBottom: "15px", display: "block" }}></i>
                <h6 style={{ color: "var(--text-muted)", marginBottom: "15px" }}>No Active Package</h6>
                <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "20px" }}>
                  Please refresh the page. If the issue persists, logout and login again to activate your free package.
                </p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="buy-now-card-btn"
                  style={{ marginRight: "10px" }}
                >
                  Refresh Page
                </button>
                <Link to="/packages" className="buy-now-card-btn">
                  Browse Packages
                </Link>
              </div>
            )}
          </div>

          <div className="interest-info-section-container">
            <div className="my-interest-container">
              <h5>My Interest</h5>
            </div>
          </div>
          
          <div className="table-container">
            <h5>Latest Interests (Sent by You)</h5>
            {loadingInterests ? (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : latestInterests.length > 0 ? (
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>S.N</th>
                    <th>Name</th>
                    <th>User ID</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {latestInterests.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td className="name-cell">
                        <span className="avatar">👤</span>
                        {item.user?.firstName || "N/A"} {item.user?.lastName || ""}
                      </td>
                      <td>#{item.interestedUserId}</td>
                      <td>{formatInterestDate(item.interestDate)}</td>
                      <td>{renderStatusBadge(item.status)}</td>
                      <td>{renderActionButton(item.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ textAlign: "center", padding: "30px", color: "var(--text-muted)" }}>
                <p>No interests sent yet. Browse profiles to express interest!</p>
              </div>
            )}
          </div>

          <div className="table-container interest-request-table">
            <h5>Latest Interest Requests (Received by You)</h5>
            {loadingRequests ? (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : interestRequests.length > 0 ? (
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>S.N</th>
                    <th>From User</th>
                    <th>User ID</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Message</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {interestRequests.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td className="name-cell">
                        <span className="avatar">👤</span>
                        {item.user?.firstName || "N/A"} {item.user?.lastName || ""}
                      </td>
                      <td>#{item.user?.id || "N/A"}</td>
                      <td>{formatInterestDate(item.interestDate)}</td>
                      <td>{renderStatusBadge(item.status)}</td>
                      <td style={{ maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {item.message || "No message"}
                      </td>
                      <td>{renderActionButton(item.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ textAlign: "center", padding: "30px", color: "var(--text-muted)" }}>
                <p>No interest requests received yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
