import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ApiService from "../services/ApiService";
import "../styles/styles.css";
import "../styles/matrimonialPackage.css";

const MatrimonialPackage = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const navigate = useNavigate();

  // Default fallback packages if API is unavailable
  const fallbackPackages = [
    {
      name: "Basic",
      price: "₹49",
      features: [
        { title: "Express Interests", value: "50/month" },
        { title: "Contact View", value: "50/month" },
        { title: "Image Upload", value: "Up to 5" },
        { title: "Profile Views", value: "100/month" },
      ],
    },
    {
      name: "Premium",
      price: "₹99",
      features: [
        { title: "Express Interests", value: "150/month" },
        { title: "Contact View", value: "1500/month" },
        { title: "Image Upload", value: "Up to 15" },
        { title: "Profile Views", value: "300/month" },
      ],
    },
    {
      name: "Unlimited",
      price: "₹199",
      features: [
        { title: "Express Interests", value: "Unlimited" },
        { title: "Contact View", value: "Unlimited" },
        { title: "Image Upload", value: "Unlimited" },
        { title: "Profile Views", value: "Unlimited" },
      ],
    },
  ];

  // Fetch all packages when the component loads
  useEffect(() => {
    const run = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/packages");
        const data = Array.isArray(res.data) ? res.data : [];
        setPackages(data.length ? data : fallbackPackages);
      } catch (error) {
        // Fallback to default packages if API is unavailable
        setPackages(fallbackPackages);
      }
    };
    run();
  }, []);

  const handleBuyNowClick = (packageData) => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("userData");
    
    if (!token || !userData) {
      // User is not logged in - show login prompt
      setSelectedPackage(packageData);
      setShowAlert(true);
    } else {
      // User is logged in
      setSelectedPackage(packageData);
      
      // Extract price to check if it's a free package
      const priceString = packageData.price?.replace(/[^0-9.]/g, "") || "0";
      const price = parseFloat(priceString);
      
      // If free package, directly activate it without showing payment modal
      if (price === 0) {
        activateFreePurchase(packageData);
      } else {
        // Show payment modal for paid packages
        setShowPaymentModal(true);
      }
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
    setSelectedPackage(null);
  };

  const handleConfirmYes = () => {
    setShowAlert(false);
    // Redirect to login page and store intended package in sessionStorage
    sessionStorage.setItem("intendedPackage", JSON.stringify(selectedPackage));
    navigate("/login", { state: { from: "/packages", packageData: selectedPackage } });
  };

  const handlePaymentModalClose = () => {
    setShowPaymentModal(false);
    setPaymentMethod("card");
    setSelectedPackage(null);
  };

  // Function to directly activate free package (no modal)
  const activateFreePurchase = async (packageData) => {
    setIsProcessing(true);

    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userId = userData?.user?.id || userData?.id;

      if (!userId) {
        toast.error("Unable to identify user. Please login again.");
        navigate("/login");
        return;
      }

      const purchaseData = {
        userId: userId,
        packageName: packageData.name,
        price: 0,
        validityPeriod: "30 days",
        purchaseDate: new Date().toISOString().split("T")[0],
        status: "COMPLETED",
        profileViewLimit: 10, // Free package: 10 profile views per month
        profileViewCount: 0,
        packageDetails: {
          id: packageData.id || null,
        },
      };

      const response = await axios.post(
        "http://localhost:8080/api/purchase-history",
        purchaseData,
        { headers: ApiService.getHeader() }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success(`🎉 Successfully activated ${packageData.name} package!`, {
          position: "top-center",
          autoClose: 3000,
        });

        const updatedUserData = { ...userData, currentPackage: packageData.name };
        localStorage.setItem("userData", JSON.stringify(updatedUserData));

        setTimeout(() => {
          navigate("/user/dashboard");
        }, 2000);
      }
    } catch (error) {
      toast.error("Failed to activate package. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePurchaseConfirm = async () => {
    if (!selectedPackage) return;

    setIsProcessing(true);

    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userId = userData?.user?.id || userData?.id;

      if (!userId) {
        toast.error("Unable to identify user. Please login again.");
        navigate("/login");
        return;
      }

      // Extract price number from string (e.g., "₹29" -> 29)
      const priceString = selectedPackage.price?.replace(/[^0-9.]/g, "") || "0";
      const price = parseFloat(priceString);

      // If price is 0 (Free package), directly create purchase
      if (price === 0) {
        await createFreePurchase(userId, selectedPackage);
        return;
      }

      // Initialize Razorpay payment for paid packages
      await initiateRazorpayPayment(userId, selectedPackage, price);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Purchase failed. Please try again later.",
        {
          position: "top-center",
          autoClose: 4000,
        }
      );
      setIsProcessing(false);
    }
  };

  // Function to handle free package purchase
  const createFreePurchase = async (userId, packageData) => {
    try {
      const purchaseData = {
        userId: userId,
        packageName: packageData.name,
        price: 0,
        validityPeriod: "30 days",
        purchaseDate: new Date().toISOString().split("T")[0],
        status: "COMPLETED",
        profileViewLimit: 10, // Free package: 10 profile views per month
        profileViewCount: 0,
        packageDetails: {
          id: packageData.id || null,
        },
      };

      const response = await axios.post(
        "http://localhost:8080/api/purchase-history",
        purchaseData,
        { headers: ApiService.getHeader() }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success(`🎉 Successfully activated ${packageData.name} package!`, {
          position: "top-center",
          autoClose: 3000,
        });

        const userData = JSON.parse(localStorage.getItem("userData"));
        const updatedUserData = { ...userData, currentPackage: packageData.name };
        localStorage.setItem("userData", JSON.stringify(updatedUserData));

        setShowPaymentModal(false);
        setSelectedPackage(null);

        setTimeout(() => {
          navigate("/user/dashboard");
        }, 2000);
      }
    } catch (error) {
      toast.error("Failed to activate package. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Function to initiate Razorpay payment
  const initiateRazorpayPayment = async (userId, packageData, price) => {
    try {
      // Get user data for prefill
      const userData = JSON.parse(localStorage.getItem("userData"));
      
      // Load Razorpay script dynamically
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: "rzp_test_YOUR_KEY_HERE", // Replace with your Razorpay Key ID
          amount: price * 100, // Amount in paise (₹29 = 2900 paise)
          currency: "INR",
          name: "RishtaConnect",
          description: `${packageData.name} Package Purchase`,
          image: "/logo192.png", // Your logo
          handler: async function (response) {
            // Payment successful callback
            await handlePaymentSuccess(userId, packageData, price, response);
          },
          prefill: {
            name: userData?.user?.name || userData?.name || "",
            email: userData?.user?.email || userData?.email || "",
            contact: userData?.user?.phone || userData?.phone || "",
          },
          notes: {
            package_name: packageData.name,
            user_id: userId,
          },
          theme: {
            color: "#dc2300",
          },
          modal: {
            ondismiss: function () {
              setIsProcessing(false);
              toast.info("Payment cancelled by user", {
                position: "top-center",
                autoClose: 2000,
              });
            },
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      };

      script.onerror = () => {
        setIsProcessing(false);
        toast.error("Failed to load payment gateway. Please try again.");
      };
    } catch (error) {
      setIsProcessing(false);
      toast.error("Payment initialization failed. Please try again.");
    }
  };

  // Function to handle successful payment
  const handlePaymentSuccess = async (userId, packageData, price, paymentResponse) => {
    try {
      const purchaseData = {
        userId: userId,
        packageName: packageData.name,
        price: price,
        validityPeriod: "30 days",
        purchaseDate: new Date().toISOString().split("T")[0],
        status: "COMPLETED",
        paymentId: paymentResponse.razorpay_payment_id,
        orderId: paymentResponse.razorpay_order_id || null,
        signature: paymentResponse.razorpay_signature || null,
        profileViewLimit: -1, // Paid packages: Unlimited views (-1 means unlimited)
        profileViewCount: 0,
        packageDetails: {
          id: packageData.id || null,
        },
      };

      const response = await axios.post(
        "http://localhost:8080/api/purchase-history",
        purchaseData,
        { headers: ApiService.getHeader() }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success(`🎉 Payment successful! ${packageData.name} package activated!`, {
          position: "top-center",
          autoClose: 3000,
        });

        const userData = JSON.parse(localStorage.getItem("userData"));
        const updatedUserData = { ...userData, currentPackage: packageData.name };
        localStorage.setItem("userData", JSON.stringify(updatedUserData));

        setShowPaymentModal(false);
        setSelectedPackage(null);

        setTimeout(() => {
          navigate("/user/purchase-history");
        }, 2000);
      }
    } catch (error) {
      toast.error("Payment successful but failed to update records. Contact support.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="matrimonial-package-container">
        <div className="matrimonial-package-header">
          <h2 className="matrimonial-package-heading">Matrimonial Package</h2>
          <p className="matrimonial-package-header-content mx-auto">
            Every user has their own package. Anyone can upgrade or buy a
            package through the online payment system.
          </p>
        </div>
        <div className="container-max-width package-grid">
          {packages.length === 0 && (
            <p className="packages-empty-message">Packages will be available soon.</p>
          )}
          {packages.map((packageData, index) => (
            <div key={index} className="plan">
              <div className="plan__head">
                <div className="plan__head-content">
                  <h4 className="text--white mt-0 mb-0 text-center">{packageData.name}</h4>
                </div>
              </div>
              <div className="plan__body">
                <div className="text-center">
                  <h5 className="plan__body-price m-0 text-center">{packageData.price}</h5>
                </div>

                <ul className="list list--base">
                  {(packageData.features || []).map((feature, featureIndex) => {
                    const isObject = feature && typeof feature === "object";
                    return (
                      <li key={featureIndex}>
                        <i className="text--base fas fa-check"></i>
                        {isObject ? (
                          <>
                            <span className="feature-title">{feature.title}:</span> {feature.value}
                          </>
                        ) : (
                          <>{feature}</>
                        )}
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-3 text-center">
                  <button className="buy-now-card-btn" type="button" onClick={() => handleBuyNowClick(packageData)}>
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showAlert && (
          <div className="confirmation-alert" role="dialog" aria-modal="true" aria-labelledby="pkgConfirmTitle">
            <div className="confirmation-dialog">
              <div className="dialog-header">
                <h4 id="pkgConfirmTitle">Login Required</h4>
                <button className="cross-button" onClick={handleAlertClose}>
                  <i className="bi bi-x cross-icon"></i>
                </button>
              </div>
              <p className="sure-text">
                You need to login first to purchase the "{selectedPackage?.name}" package.
                Would you like to login now?
              </p>
              <div className="alert-actions">
                <button className="alert-button alert-cancel" onClick={handleAlertClose}>
                  Cancel
                </button>
                <button className="alert-button alert-confirm" onClick={handleConfirmYes}>
                  Login Now
                </button>
              </div>
            </div>
          </div>
        )}

        {showPaymentModal && (
          <div className="confirmation-alert payment-modal" role="dialog" aria-modal="true" aria-labelledby="paymentTitle">
            <div className="payment-dialog">
              <div className="dialog-header">
                <h4 id="paymentTitle">Complete Your Purchase</h4>
                <button className="cross-button" onClick={handlePaymentModalClose} disabled={isProcessing}>
                  <i className="bi bi-x cross-icon"></i>
                </button>
              </div>
              
              <div className="payment-content">
                <div className="package-summary">
                  <h5>Package Details</h5>
                  <div className="summary-item">
                    <span>Package:</span>
                    <strong>{selectedPackage?.name}</strong>
                  </div>
                  <div className="summary-item">
                    <span>Price:</span>
                    <strong className="price-highlight">{selectedPackage?.price}</strong>
                  </div>
                  <div className="summary-item">
                    <span>Validity:</span>
                    <strong>30 days</strong>
                  </div>
                </div>

                <div className="payment-method-section">
                  <h5>Payment Method</h5>
                  <div className="payment-options">
                    <label className={`payment-option ${paymentMethod === "card" ? "selected" : ""}`}>
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        disabled={isProcessing}
                      />
                      <i className="bi bi-credit-card"></i>
                      <span>Credit/Debit Card</span>
                    </label>
                    <label className={`payment-option ${paymentMethod === "upi" ? "selected" : ""}`}>
                      <input
                        type="radio"
                        name="payment"
                        value="upi"
                        checked={paymentMethod === "upi"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        disabled={isProcessing}
                      />
                      <i className="bi bi-phone"></i>
                      <span>UPI</span>
                    </label>
                    <label className={`payment-option ${paymentMethod === "netbanking" ? "selected" : ""}`}>
                      <input
                        type="radio"
                        name="payment"
                        value="netbanking"
                        checked={paymentMethod === "netbanking"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        disabled={isProcessing}
                      />
                      <i className="bi bi-bank"></i>
                      <span>Net Banking</span>
                    </label>
                  </div>
                </div>

                <div className="payment-note">
                  <i className="bi bi-info-circle"></i>
                  <p>You will be redirected to a secure payment gateway to complete your transaction.</p>
                </div>
              </div>

              <div className="alert-actions">
                <button 
                  className="alert-button alert-cancel" 
                  onClick={handlePaymentModalClose}
                  disabled={isProcessing}
                >
                  Cancel
                </button>
                <button 
                  className="alert-button alert-confirm" 
                  onClick={handlePurchaseConfirm}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <span className="spinner"></span> Processing...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-lock"></i> Pay Now
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MatrimonialPackage;



















