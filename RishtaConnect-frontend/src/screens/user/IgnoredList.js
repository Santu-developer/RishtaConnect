import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserDashboardLeftSection from "../../components/UserDashboardLeftSection";
import Footer from "../../components/Footer";
import ApiService from "../../services/ApiService";
import "../../styles/user/dashboard.css";
import "../../styles/styles.css";
import "react-toastify/dist/ReactToastify.css";

const IgnoredList = () => {
  const [ignoredData, setIgnoredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetchIgnoredList();
    } else {
      setError("User ID not found. Please login again.");
      setLoading(false);
    }
  }, [userId]);

  const fetchIgnoredList = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ApiService.getUserIgnoredList(userId);
      
      // Sort by ignored date (newest first)
      const sortedData = response.sort((a, b) => {
        return new Date(b.ignoredDate) - new Date(a.ignoredDate);
      });
      
      setIgnoredData(sortedData);
    } catch (err) {
      setError("Failed to fetch ignored list. Please try again later.");
      toast.error("Failed to load ignored profiles");
    } finally {
      setLoading(false);
    }
  };

  const handleUnignore = async (ignoredUserId) => {
    if (!window.confirm("Remove this user from your ignored list?")) {
      return;
    }

    try {
      await ApiService.removeFromIgnoredList(userId, ignoredUserId);
      toast.success("User removed from ignored list");
      fetchIgnoredList(); // Refresh the list
    } catch (err) {
      toast.error("Failed to remove user from ignored list");
    }
  };

  const handleViewProfile = (ignoredUserId) => {
    navigate(`/member-details/${ignoredUserId}`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="user-dashboard-container">
        <div className="container-max-width user-dashboard-wrapper">
          <UserDashboardLeftSection />
          <div className="dashboard-right-section hidden-scrollbar">
            <h5>Ignored Profiles</h5>
            <div className="loading-container" style={{ textAlign: "center", padding: "50px" }}>
              <p>Loading ignored profiles...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-dashboard-container">
        <div className="container-max-width user-dashboard-wrapper">
          <UserDashboardLeftSection />
          <div className="dashboard-right-section hidden-scrollbar">
            <h5>Ignored Profiles</h5>
            <div className="error-container" style={{ textAlign: "center", padding: "50px" }}>
              <p style={{ color: "red" }}>{error}</p>
              <button onClick={fetchIgnoredList} className="btn btn-primary">
                Retry
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="user-dashboard-container">
      <div className="container-max-width user-dashboard-wrapper">
        <UserDashboardLeftSection />
        <div className="dashboard-right-section hidden-scrollbar">
          <h5>Ignored Profiles</h5>
          <p className="section-description">
            Manage profiles you've ignored or blocked
          </p>

          <div className="table-container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
              <h5>Ignored Users ({ignoredData.length})</h5>
              <button 
                onClick={() => navigate("/member")} 
                className="btn btn-primary"
                style={{ padding: "8px 15px", fontSize: "14px" }}
              >
                Browse Members
              </button>
            </div>

            {ignoredData.length === 0 ? (
              <div className="empty-state" style={{ textAlign: "center", padding: "50px" }}>
                <p style={{ fontSize: "18px", color: "#666", marginBottom: "20px" }}>
                  You haven't ignored any profiles yet
                </p>
                <p style={{ fontSize: "14px", color: "#999" }}>
                  Ignored profiles won't appear in your search results
                </p>
              </div>
            ) : (
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User ID</th>
                    <th>Ignored On</th>
                    <th>Reason</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ignoredData.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>#{item.ignoredUserId}</td>
                      <td>{formatDate(item.ignoredDate)}</td>
                      <td>
                        {item.reason ? (
                          <span title={item.reason}>
                            {item.reason.length > 50 
                              ? `${item.reason.substring(0, 50)}...` 
                              : item.reason}
                          </span>
                        ) : (
                          <span style={{ color: "#999" }}>No reason provided</span>
                        )}
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: "10px" }}>
                          <button
                            onClick={() => handleViewProfile(item.ignoredUserId)}
                            className="action-button blue"
                            title="View Profile"
                          >
                            👁️
                          </button>
                          <button
                            onClick={() => handleUnignore(item.ignoredUserId)}
                            className="action-button green"
                            title="Remove from Ignored List"
                          >
                            ✅
                          </button>
                        </div>
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

export default IgnoredList;
