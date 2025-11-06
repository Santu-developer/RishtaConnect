import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserDashboardLeftSection from "../../components/UserDashboardLeftSection";
import Footer from "../../components/Footer";
import ApiService from "../../services/ApiService";
import "../../styles/user/dashboard.css";
import "../../styles/styles.css";

const MyInterest = () => {
  const [interestData, setInterestData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetchMyInterests();
    } else {
      setError("User ID not found. Please login again.");
      setLoading(false);
    }
  }, [userId]);

  const fetchMyInterests = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ApiService.getMyInterests(userId);
      
      // Sort by interest date (newest first)
      const sortedData = response.sort((a, b) => {
        return new Date(b.interestDate) - new Date(a.interestDate);
      });
      
      setInterestData(sortedData);
    } catch (err) {
      setError("Failed to fetch interests. Please try again later.");
      toast.error("Failed to load interests");
    } finally {
      setLoading(false);
    }
  };

  const handleViewProfile = (interestedUserId) => {
    navigate(`/member-details/${interestedUserId}`);
  };

  const handleSendMessage = (interestedUserId) => {
    toast.info("Messaging feature coming soon!");
    // navigate(`/user/messages?userId=${interestedUserId}`);
  };

  const handleDeleteInterest = async (interestId) => {
    if (!window.confirm("Are you sure you want to withdraw this interest?")) {
      return;
    }

    try {
      await ApiService.deleteInterest(userId, interestId);
      toast.success("Interest withdrawn successfully");
      fetchMyInterests(); // Refresh the list
    } catch (err) {
      toast.error("Failed to withdraw interest. Please try again.");
    }
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

  const renderStatusBadge = (status) => {
    const normalizedStatus = status?.toUpperCase() || "PENDING";
    
    switch (normalizedStatus) {
      case "ACCEPTED":
        return <span className="status accepted">Accepted</span>;
      case "REJECTED":
        return <span className="status rejected">Rejected</span>;
      case "PENDING":
      default:
        return <span className="status pending">Pending</span>;
    }
  };

  if (loading) {
    return (
      <div className="user-dashboard-container">
        <div className="container-max-width user-dashboard-wrapper">
          <UserDashboardLeftSection />
          <div className="dashboard-right-section hidden-scrollbar">
            <h5>My Interest</h5>
            <div className="loading-container" style={{ textAlign: "center", padding: "50px" }}>
              <p>Loading your interests...</p>
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
            <h5>My Interest</h5>
            <div className="error-container" style={{ textAlign: "center", padding: "50px" }}>
              <p style={{ color: "red" }}>{error}</p>
              <button onClick={fetchMyInterests} className="btn btn-primary">
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
          <h5>My Interest</h5>
          <p className="section-description">
            Manage all the interests you've sent to other members
          </p>

          <div className="table-container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
              <h5>Interests Sent ({interestData.length})</h5>
              <button 
                onClick={() => navigate("/member")} 
                className="btn btn-primary"
                style={{ padding: "8px 15px", fontSize: "14px" }}
              >
                Browse Members
              </button>
            </div>

            {interestData.length === 0 ? (
              <div className="empty-state" style={{ textAlign: "center", padding: "50px" }}>
                <p style={{ fontSize: "18px", color: "#666", marginBottom: "20px" }}>
                  You haven't sent any interests yet
                </p>
                <button 
                  onClick={() => navigate("/member")} 
                  className="btn btn-primary"
                >
                  Browse Members
                </button>
              </div>
            ) : (
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User ID</th>
                    <th>Sent On</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {interestData.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>#{item.interestedUserId}</td>
                      <td>{formatDate(item.interestDate)}</td>
                      <td>
                        {item.message ? (
                          <span title={item.message}>
                            {item.message.length > 50 
                              ? `${item.message.substring(0, 50)}...` 
                              : item.message}
                          </span>
                        ) : (
                          <span style={{ color: "#999" }}>No message</span>
                        )}
                      </td>
                      <td>{renderStatusBadge(item.status)}</td>
                      <td>
                        <div style={{ display: "flex", gap: "10px" }}>
                          <button
                            onClick={() => handleViewProfile(item.interestedUserId)}
                            className="action-button blue"
                            title="View Profile"
                          >
                            👁️
                          </button>
                          <button
                            onClick={() => handleSendMessage(item.interestedUserId)}
                            className="action-button green"
                            title="Send Message"
                          >
                            ✉️
                          </button>
                          <button
                            onClick={() => handleDeleteInterest(item.id)}
                            className="action-button red"
                            title="Withdraw Interest"
                            disabled={item.status?.toUpperCase() === "ACCEPTED"}
                          >
                            🗑️
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

export default MyInterest;
