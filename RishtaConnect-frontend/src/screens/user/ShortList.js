import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserDashboardLeftSection from "../../components/UserDashboardLeftSection";
import Footer from "../../components/Footer";
import ApiService from "../../services/ApiService";
import { toast } from "react-toastify";
import "../../styles/user/dashboard.css";
import "../../styles/styles.css";

const ShortList = () => {
  const [shortlistData, setShortlistData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      setUserData(parsedData);
      fetchShortlist(parsedData.user?.id || parsedData.id);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const fetchShortlist = async (userId) => {
    try {
      setLoading(true);
      const response = await ApiService.getUserShortlist(userId);
      
      // Sort by shortlistDate (newest first)
      const sortedData = response.sort((a, b) => 
        new Date(b.shortlistDate) - new Date(a.shortlistDate)
      );
      
      setShortlistData(sortedData);
    } catch (error) {
      toast.error("Failed to load shortlist", {
        position: "top-center",
        autoClose: 3000,
      });
      setShortlistData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromShortlist = async (shortlistId) => {
    if (!window.confirm("Remove this profile from your shortlist?")) {
      return;
    }

    try {
      const userId = userData?.user?.id || userData?.id;
      await ApiService.removeFromShortlist(userId, shortlistId);
      
      toast.success("Profile removed from shortlist", {
        position: "top-center",
        autoClose: 2000,
      });
      
      // Refresh shortlist
      fetchShortlist(userId);
    } catch (error) {
      toast.error("Failed to remove from shortlist", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handleViewProfile = (shortlistedUserId) => {
    // Navigate to member details page
    navigate(`/member-details/${shortlistedUserId}`);
  };

  const handleSendMessage = (shortlistedUserId) => {
    toast.info("Messaging feature coming soon!", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 30) return `${diffDays} days ago`;
    
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  const renderActionButtons = (item) => {
    return (
      <div className="shortlist-action-button-container">
        <button 
          className="action-button blue" 
          title="View Profile"
          onClick={() => handleViewProfile(item.shortlistedUserId)}
        >
          👁️
        </button>
        <button 
          className="action-button pink" 
          title="Send Message"
          onClick={() => handleSendMessage(item.shortlistedUserId)}
        >
          ✉️
        </button>
        <button 
          className="action-button" 
          style={{ backgroundColor: '#dc3545' }}
          title="Remove from Shortlist"
          onClick={() => handleRemoveFromShortlist(item.id)}
        >
          🗑️
        </button>
      </div>
    );
  };

  return (
    <div className="user-dashboard-container">
      <div className="container-max-width user-dashboard-wrapper">
        <UserDashboardLeftSection />
        <div className="dashboard-right-section hidden-scrollbar">
          <div className="shortlist-header">
            <h5>Shortlisted Profiles</h5>
            <p className="shortlist-subtitle">
              Profiles you've added to your shortlist ({shortlistData.length})
            </p>
          </div>

          <div className="table-container">
            {loading ? (
              <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p style={{ marginTop: "10px" }}>Loading shortlist...</p>
              </div>
            ) : shortlistData.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
                <i className="bi bi-star" style={{ fontSize: "48px", marginBottom: "10px", display: "block" }}></i>
                <p>Your shortlist is empty</p>
                <button 
                  className="btn btn-primary mt-3"
                  onClick={() => navigate("/member")}
                >
                  Browse Profiles
                </button>
              </div>
            ) : (
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User ID</th>
                    <th>Added On</th>
                    <th>Notes</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {shortlistData.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>
                        <span className="avatar">👤</span>
                        User #{item.shortlistedUserId}
                      </td>
                      <td>{formatDate(item.shortlistDate)}</td>
                      <td style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {item.notes || "No notes"}
                      </td>
                      <td className="table-action-column">
                        {renderActionButtons(item)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShortList;
