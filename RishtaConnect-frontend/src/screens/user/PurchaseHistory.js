import React, { useEffect, useState } from "react";
import UserDashboardLeftSection from "../../components/UserDashboardLeftSection";
import "../../styles/user/dashboard.css";
import "../../styles/styles.css";
import Footer from "../../components/Footer";
import ApiService from "../../services/ApiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function PurchaseHistory() {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPurchaseHistory();
  }, []);

  const fetchPurchaseHistory = async () => {
    try {
      setLoading(true);
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userId = userData?.user?.id || userData?.id;

      if (!userId) {
        toast.error("Please login to view purchase history");
        navigate("/login");
        return;
      }

      // Fetch purchase history for current user only (optimized)
      const userPurchases = await ApiService.getPurchaseHistoryByUserId(userId);
      
      // Sort by purchase date (newest first)
      const sortedPurchases = Array.isArray(userPurchases)
        ? userPurchases.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate))
        : [];

      setHistoryData(sortedPurchases);
    } catch (error) {
      toast.error("Failed to load purchase history", {
        position: "top-center",
        autoClose: 3000,
      });
      setHistoryData([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  const formatPrice = (price) => {
    if (price === 0 || price === "0") return "Free";
    return `₹${price}`;
  };

  const calculateExpiryDate = (purchaseDate, validityPeriod) => {
    if (!purchaseDate) return null;
    
    // Extract number of days from validityPeriod (e.g., "30 days" -> 30)
    const daysMatch = validityPeriod?.match(/(\d+)/);
    const days = daysMatch ? parseInt(daysMatch[1]) : 30;
    
    const date = new Date(purchaseDate);
    date.setDate(date.getDate() + days);
    
    return date;
  };

  const isPackageActive = (purchaseDate, validityPeriod, status) => {
    const statusUpper = status?.toUpperCase();
    if (statusUpper !== "COMPLETED" && statusUpper !== "PURCHASED") {
      return false;
    }

    const expiryDate = calculateExpiryDate(purchaseDate, validityPeriod);
    if (!expiryDate) return false;

    const now = new Date();
    return now <= expiryDate;
  };

  const getDaysRemaining = (purchaseDate, validityPeriod) => {
    const expiryDate = calculateExpiryDate(purchaseDate, validityPeriod);
    if (!expiryDate) return 0;

    const now = new Date();
    const diffTime = expiryDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 0;
  };

  const renderStatusBadge = (status) => {
    const statusUpper = status?.toUpperCase();
    if (statusUpper === "PENDING" || statusUpper === "PAYMENT PENDING")
      return <span className="status pending">Payment Pending</span>;
    if (statusUpper === "COMPLETED" || statusUpper === "PURCHASED")
      return <span className="status accepted">Purchased</span>;
    if (statusUpper === "FAILED")
      return <span className="status rejected">Failed</span>;
    return <span className="status pending">{status}</span>;
  };

  const renderActionButton = (item) => {
    const statusUpper = item.status?.toUpperCase();
    const isPurchased = statusUpper === "COMPLETED" || statusUpper === "PURCHASED";
    
    return (
      <button
        className={`action-button ${isPurchased ? "blue" : "pink"}`}
        title={isPurchased ? "View Details" : "Retry Payment"}
        onClick={() => handleAction(item)}
      >
        {isPurchased ? "👁️" : "🔄"}
      </button>
    );
  };

  const handleAction = (item) => {
    const statusUpper = item.status?.toUpperCase();
    if (statusUpper === "COMPLETED" || statusUpper === "PURCHASED") {
      const expiryDate = calculateExpiryDate(item.purchaseDate, item.validityPeriod);
      const daysRemaining = getDaysRemaining(item.purchaseDate, item.validityPeriod);
      const isActive = isPackageActive(item.purchaseDate, item.validityPeriod, item.status);
      
      toast.info(
        `📦 Package: ${item.packageName}\n` +
        `⏱️ Validity: ${item.validityPeriod}\n` +
        `📅 Purchase Date: ${formatDate(item.purchaseDate)}\n` +
        `🏁 Expiry Date: ${formatDate(expiryDate)}\n` +
        `${isActive ? `✅ Status: Active (${daysRemaining} days remaining)` : '❌ Status: Expired'}`,
        {
          position: "top-center",
          autoClose: 6000,
        }
      );
    } else {
      toast.info("Retry payment feature coming soon!", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  // Calculate statistics
  const totalPurchases = historyData.length;
  const activePurchases = historyData.filter(item => 
    isPackageActive(item.purchaseDate, item.validityPeriod, item.status)
  ).length;
  const totalSpent = historyData
    .filter(item => {
      const statusUpper = item.status?.toUpperCase();
      return statusUpper === "COMPLETED" || statusUpper === "PURCHASED";
    })
    .reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <>
      <div className="user-dashboard-container">
        <div className="container-max-width user-dashboard-wrapper">
          <UserDashboardLeftSection />
          <div className="dashboard-right-section hidden-scrollbar">
            <h5>Package Purchase History</h5>
            
            {/* Summary Statistics */}
            {!loading && historyData.length > 0 && (
              <div className="dashboard-counter-boxes-container" style={{ marginBottom: "20px" }}>
                <div className="counter-box emerald-bg-with-border">
                  <div className="counter-box-icon emerald-bg">
                    <i className="fa-solid fa-box" aria-hidden="true"></i>
                  </div>
                  <div className="counter-box-content">
                    <h4>{totalPurchases}</h4>
                    <span>Total Purchases</span>
                  </div>
                </div>

                <div className="counter-box lavender-bg-with-border">
                  <div className="counter-box-icon lavender-bg">
                    <i className="fa-solid fa-check-circle" aria-hidden="true"></i>
                  </div>
                  <div className="counter-box-content">
                    <h4>{activePurchases}</h4>
                    <span>Active Packages</span>
                  </div>
                </div>

                <div className="counter-box goldenrod-bg-with-border">
                  <div className="counter-box-icon goldenrod-bg">
                    <i className="fa-solid fa-rupee-sign" aria-hidden="true"></i>
                  </div>
                  <div className="counter-box-content">
                    <h4>₹{totalSpent}</h4>
                    <span>Total Spent</span>
                  </div>
                </div>
              </div>
            )}

            <div className="table-container">
              
              {loading ? (
                <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p style={{ marginTop: "10px" }}>Loading purchase history...</p>
                </div>
              ) : historyData.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
                  <i className="bi bi-cart-x" style={{ fontSize: "48px", marginBottom: "10px", display: "block" }}></i>
                  <p>No purchase history found</p>
                  <button 
                    className="btn btn-primary mt-3"
                    onClick={() => navigate("/packages")}
                  >
                    Browse Packages
                  </button>
                </div>
              ) : (
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Package</th>
                      <th>Validity Period</th>
                      <th>Price</th>
                      <th>Purchase Date</th>
                      <th>Expiry Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyData.map((item, index) => {
                      const isActive = isPackageActive(item.purchaseDate, item.validityPeriod, item.status);
                      const daysRemaining = getDaysRemaining(item.purchaseDate, item.validityPeriod);
                      const expiryDate = calculateExpiryDate(item.purchaseDate, item.validityPeriod);
                      
                      return (
                        <tr key={item.id} className={isActive ? "active-package-row" : ""}>
                          <td>{index + 1}</td>
                          <td>
                            {item.packageName || "N/A"}
                            {isActive && (
                              <span className="badge bg-success ms-2" style={{ fontSize: "10px" }}>
                                Active
                              </span>
                            )}
                          </td>
                          <td>{item.validityPeriod || "30 days"}</td>
                          <td>{formatPrice(item.price)}</td>
                          <td>{formatDate(item.purchaseDate)}</td>
                          <td>
                            {expiryDate ? formatDate(expiryDate) : "N/A"}
                            {isActive && daysRemaining <= 7 && (
                              <div style={{ fontSize: "11px", color: "orange", marginTop: "3px" }}>
                                {daysRemaining} days left
                              </div>
                            )}
                          </td>
                          <td>{renderStatusBadge(item.status)}</td>
                          <td className="table-action-column">
                            {renderActionButton(item)}
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
      </div>
      <Footer />
    </>
  );
}

export default PurchaseHistory;
