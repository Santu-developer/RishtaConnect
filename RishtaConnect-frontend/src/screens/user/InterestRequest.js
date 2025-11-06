import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserDashboardLeftSection from "../../components/UserDashboardLeftSection";
import Footer from "../../components/Footer";
import ApiService from "../../services/ApiService";
import "../../styles/user/dashboard.css";
import "../../styles/styles.css";

const InterestRequest = () => {
  const [interestRequests, setInterestRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetchInterestRequests();
    } else {
      setError("User ID not found. Please login again.");
      setLoading(false);
    }
  }, [userId]);

  const fetchInterestRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ApiService.getReceivedInterests(userId);
      
      // Sort by interest date (newest first)
      const sortedData = response.sort((a, b) => {
        return new Date(b.interestDate) - new Date(a.interestDate);
      });
      
      setInterestRequests(sortedData);
    } catch (err) {
      setError("Failed to fetch interest requests. Please try again later.");
      toast.error("Failed to load interest requests");
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (interestId) => {
    try {
      await ApiService.updateInterestStatus(interestId, "ACCEPTED");
      toast.success("Interest accepted successfully!");
      fetchInterestRequests(); // Refresh the list
    } catch (err) {
      toast.error("Failed to accept interest. Please try again.");
    }
  };

  const handleReject = async (interestId) => {
    if (!window.confirm("Are you sure you want to reject this interest?")) {
      return;
    }

    try {
      await ApiService.updateInterestStatus(interestId, "REJECTED");
      toast.success("Interest rejected");
      fetchInterestRequests(); // Refresh the list
    } catch (err) {
      toast.error("Failed to reject interest. Please try again.");
    }
  };

  const handleViewProfile = (senderId) => {
    navigate(`/member-details/${senderId}`);
  };

  const handleSendMessage = (senderId) => {
    toast.info("Messaging feature coming soon!");
    // navigate(`/user/messages?userId=${senderId}`);
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
            <h5>Interest Requests</h5>
            <div className="loading-container" style={{ textAlign: "center", padding: "50px" }}>
              <p>Loading interest requests...</p>
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
            <h5>Interest Requests</h5>
            <div className="error-container" style={{ textAlign: "center", padding: "50px" }}>
              <p style={{ color: "red" }}>{error}</p>
              <button onClick={fetchInterestRequests} className="btn btn-primary">
                Retry
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Separate by status for better UX
  const pendingRequests = interestRequests.filter(req => req.status?.toUpperCase() === "PENDING");
  const acceptedRequests = interestRequests.filter(req => req.status?.toUpperCase() === "ACCEPTED");
  const rejectedRequests = interestRequests.filter(req => req.status?.toUpperCase() === "REJECTED");

  return (
    <div className="user-dashboard-container">
      <div className="container-max-width user-dashboard-wrapper">
        <UserDashboardLeftSection />
        <div className="dashboard-right-section hidden-scrollbar">
          <h5>Interest Requests</h5>
          <p className="section-description">
            Manage interest requests you've received from other members
          </p>

          {/* Summary Cards */}
          <div style={{ display: "flex", gap: "15px", marginBottom: "20px", flexWrap: "wrap" }}>
            <div className="counter-box goldenrod-bg-with-border" style={{ flex: 1, minWidth: "150px" }}>
              <h4>{pendingRequests.length}</h4>
              <span>Pending</span>
            </div>
            <div className="counter-box emerald-bg-with-border" style={{ flex: 1, minWidth: "150px" }}>
              <h4>{acceptedRequests.length}</h4>
              <span>Accepted</span>
            </div>
            <div className="counter-box lavender-bg-with-border" style={{ flex: 1, minWidth: "150px" }}>
              <h4>{rejectedRequests.length}</h4>
              <span>Rejected</span>
            </div>
          </div>

          <div className="table-container">
            <h5>All Requests ({interestRequests.length})</h5>

            {interestRequests.length === 0 ? (
              <div className="empty-state" style={{ textAlign: "center", padding: "50px" }}>
                <p style={{ fontSize: "18px", color: "#666", marginBottom: "20px" }}>
                  You haven't received any interest requests yet
                </p>
                <p style={{ fontSize: "14px", color: "#999" }}>
                  Complete your profile to attract more matches!
                </p>
              </div>
            ) : (
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>From User</th>
                    <th>Received On</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {interestRequests.map((item, index) => {
                    const isPending = item.status?.toUpperCase() === "PENDING";
                    const isAccepted = item.status?.toUpperCase() === "ACCEPTED";
                    const isRejected = item.status?.toUpperCase() === "REJECTED";

                    return (
                      <tr key={item.id} style={{ 
                        backgroundColor: isAccepted ? "#f0fff4" : isRejected ? "#fff5f5" : "transparent" 
                      }}>
                        <td>{index + 1}</td>
                        <td>#{item.user?.id || "N/A"}</td>
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
                          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                            <button
                              onClick={() => handleViewProfile(item.user?.id)}
                              className="action-button blue"
                              title="View Profile"
                            >
                              👁️
                            </button>
                            
                            {isPending && (
                              <>
                                <button
                                  onClick={() => handleAccept(item.id)}
                                  className="action-button green"
                                  title="Accept Interest"
                                >
                                  ✅
                                </button>
                                <button
                                  onClick={() => handleReject(item.id)}
                                  className="action-button red"
                                  title="Reject Interest"
                                >
                                  ❌
                                </button>
                              </>
                            )}
                            
                            {isAccepted && (
                              <button
                                onClick={() => handleSendMessage(item.user?.id)}
                                className="action-button green"
                                title="Send Message"
                              >
                                ✉️
                              </button>
                            )}

                            {isRejected && (
                              <span style={{ fontSize: "12px", color: "#999" }}>
                                No actions available
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
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

export default InterestRequest;
