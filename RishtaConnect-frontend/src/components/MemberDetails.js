import React, { useState, useEffect, useMemo, useCallback } from "react";
import "../styles/memberDetails.css";
import ContactImg from "../assets/ContactImg.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/styles.css";
import "../styles/memberDetails.css";
import Pagination from "./Pagination";
import { expressInterest, getAllUsers, addToIgnoredList, addToShortlist } from "../services/ApiService";
import ApiService from "../services/ApiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";

const MemberDetails = () => {
  const [currentPage, setCurrentPage] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();
  const membersPerPage = 2;
  const [users, setUsers] = useState([]);
  const [currentPackage, setCurrentPackage] = useState(null);
  const [isLoadingPackage, setIsLoadingPackage] = useState(true);
  const [filters, setFilters] = useState({
    memberId: "",
    gender: "All",
    maritalStatus: "All",
    religion: "All",
    language: "",
    smokingHabits: "All",
    drinkingStatus: "All",
  });
  const [interestedMembers, setInterestedMembers] = useState([]);
  const [ignoredMembers, setIgnoredMembers] = useState([]);
  const [shortlistedMembers, setShortlistedMembers] = useState([]);

  // Apply URL query parameters to filters on mount
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlFilters = {};

    // Read each filter from URL
    if (searchParams.get("gender")) urlFilters.gender = searchParams.get("gender");
    if (searchParams.get("maritalStatus")) urlFilters.maritalStatus = searchParams.get("maritalStatus");
    if (searchParams.get("religion")) urlFilters.religion = searchParams.get("religion");
    if (searchParams.get("language")) urlFilters.language = searchParams.get("language");
    if (searchParams.get("smokingHabits")) urlFilters.smokingHabits = searchParams.get("smokingHabits");
    if (searchParams.get("drinkingStatus")) urlFilters.drinkingStatus = searchParams.get("drinkingStatus");

    // Update filters if URL params exist
    if (Object.keys(urlFilters).length > 0) {
      setFilters((prev) => ({
        ...prev,
        ...urlFilters,
      }));
    }
  }, [location.search]);

  // Check user's current package and profile view limit
  const checkUserPackage = useCallback(async () => {
    try {
      setIsLoadingPackage(true);
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userId = userData?.user?.id || userData?.id;

      if (!userId) {
        // User not logged in - redirect to login
        navigate("/login");
        return;
      }

      // Fetch user-specific purchase history (optimized)
      const userPurchases = await ApiService.getPurchaseHistoryByUserId(userId);
      
      // Filter and sort active packages
      const activePurchases = Array.isArray(userPurchases)
        ? userPurchases
            .filter(p => p.status === "COMPLETED" || p.status === "Purchased")
            .sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate))
        : [];

      if (activePurchases.length > 0) {
        const activePackage = activePurchases[0];
        setCurrentPackage(activePackage);
      } else {
        // No package found - should not happen as free package is created on registration
        toast.warning("No active package found. Please refresh or login again.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("Failed to load package information.", {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setIsLoadingPackage(false);
    }
  }, [navigate]);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data.userList || []); // Ensure fallback if no userList
        setCurrentPage(1); // Reset to the first page when data is fetched
      } catch (error) {
        toast.error("Failed to load members");
      }
    };

    fetchUsers();
    checkUserPackage();
  }, [checkUserPackage]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Filter users based on filter state
  const filteredUsers = useMemo(() => {
    // Get logged-in user's ID
    const userData = JSON.parse(localStorage.getItem("userData"));
    const loggedInUserId = userData?.user?.id || userData?.id;

    const filtered = users.filter((user) => {
      // Exclude logged-in user's own profile
      if (user.id === loggedInUserId) {
        return false;
      }
      
      // Get gender from basicInformation
      const userGender = user.basicInformation?.gender || "";
      
      // Get other fields from basicInformation
      const userReligion = user.basicInformation?.religion || "";
      const userMaritalStatus = user.basicInformation?.maritalStatus || "";
      const userLanguage = user.basicInformation?.language || "";
      const userSmokingHabits = user.basicInformation?.smokingHabits || "";
      const userDrinkingStatus = user.basicInformation?.drinkingStatus || "";

      return (
        (filters.memberId === "" ||
          user.id?.toString().includes(filters.memberId)) &&
        (filters.gender === "All" || filters.gender === "" || userGender === filters.gender) &&
        (filters.maritalStatus === "All" || filters.maritalStatus === "" || userMaritalStatus === filters.maritalStatus) &&
        (filters.religion === "All" || filters.religion === "" || userReligion === filters.religion) &&
        (filters.language === "" || userLanguage?.toLowerCase().includes(filters.language.toLowerCase())) &&
        (filters.smokingHabits === "All" || filters.smokingHabits === "" || userSmokingHabits === filters.smokingHabits) &&
        (filters.drinkingStatus === "All" || filters.drinkingStatus === "" || userDrinkingStatus === filters.drinkingStatus)
      );
    });

    return filtered;
  }, [users, filters]);

  // Paginate filtered users with package limit
  const currentUsers = useMemo(() => {
    const indexOfLastMember = currentPage * membersPerPage;
    const indexOfFirstMember = indexOfLastMember - membersPerPage;
    
    // Apply profile view limit based on package
    let limitedUsers = filteredUsers;
    
    if (currentPackage) {
      const viewLimit = currentPackage.profileViewLimit;
      
      // If viewLimit is null, undefined, or -1, show all profiles (unlimited)
      if (viewLimit !== null && viewLimit !== undefined && viewLimit !== -1) {
        // Free package with limited views
        limitedUsers = filteredUsers.slice(0, viewLimit);
      }
    }
    
    return limitedUsers.slice(indexOfFirstMember, indexOfLastMember);
  }, [filteredUsers, currentPage, currentPackage]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleInterestClick = async (user) => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userId = userData?.user?.id || userData?.id;
      
      if (!userId) {
        toast.error("Please login to express interest");
        navigate("/login");
        return;
      }
      
      // Check if already interested
      if (interestedMembers.some(member => member.userId === user.id)) {
        toast.info("You have already expressed interest in this user.");
        return;
      }
      
      // Use the new expressInterest API
      await expressInterest(userId, user.id, "Interested in your profile");
      
      // Add to local state
      setInterestedMembers((prev) => [
        ...prev,
        {
          userId: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      ]);
      
      toast.success(`Interest sent to ${user.firstName} ${user.lastName}! Check "My Interest" section to view.`);
      
    } catch (error) {
      if (error.response?.status === 409) {
        toast.info("You have already expressed interest in this user.");
      } else {
        toast.error(error.response?.data?.error || error.response?.data || "Failed to send interest");
      }
    }
  };

  const handleIgnoredClick = async (user) => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userId = userData?.user?.id || userData?.id;
      
      if (!userId) {
        toast.error("Please login to ignore profiles");
        navigate("/login");
        return;
      }
      
      // Check if already ignored
      if (ignoredMembers.some(member => member.userId === user.id)) {
        toast.info("You have already ignored this user.");
        return;
      }
      
      // Use the new addToIgnoredList API
      await addToIgnoredList(userId, user.id);
      
      // Add to local state
      setIgnoredMembers((prev) => [
        ...prev,
        {
          userId: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      ]);
      
      toast.success(`${user.firstName} ${user.lastName} has been ignored.`);
      
    } catch (error) {
      if (error.response?.status === 409) {
        toast.info("You have already ignored this user.");
      } else {
        toast.error(error.response?.data || "Failed to ignore profile");
      }
    }
  };

  const handleShortlistClick = async (user) => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userId = userData?.user?.id || userData?.id;
      
      if (!userId) {
        toast.error("Please login to shortlist profiles");
        navigate("/login");
        return;
      }
      
      // Check if already shortlisted
      if (shortlistedMembers.some(member => member.userId === user.id)) {
        toast.info("You have already shortlisted this user.");
        return;
      }
      
      // Use the new addToShortlist API
      await addToShortlist(userId, user.id, "Added from member page");
      
      // Add to local state
      setShortlistedMembers((prev) => [
        ...prev,
        {
          userId: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      ]);
      
      toast.success(`${user.firstName} ${user.lastName} has been shortlisted!`);
      
    } catch (error) {
      if (error.response?.status === 409) {
        toast.info("You have already shortlisted this user.");
      } else {
        toast.error(error.response?.data || "Failed to shortlist profile");
      }
    }
  };

  // const handleReportClick = async (user) => {
  //   try {
  //     // Check if the user has already been reported based on userId
  //     if (
  //       !reportedMembers.some((reportedUser) => reportedUser.userId === user.id)
  //     ) {
  //       // Add user to the reported list if not already reported
  //       setReportedMembers((prev) => [
  //         ...prev,
  //         {
  //           userId: user.id,
  //           firstName: user.firstName,
  //           lastName: user.lastName,
  //           religion: user.religion,
  //           gender: user.gender,
  //           maritalStatus: user.maritalStatus,
  //           language: user.language,
  //           profession: user.profession,
  //           financialCondition: user.financialCondition,
  //           smokingHabits: user.smokingHabits,
  //           drinkingStatus: user.drinkingStatus,
  //           presentAddress: user.presentAddress,
  //           district: user.district,
  //           division: user.division,
  //           taluk: user.taluk,
  //           zipCode: user.zipCode,
  //         },
  //       ]);

  //       // Prepare the user profile data to be reported
  //       const userProfile = {
  //         userId: user.id,
  //         firstName: user.firstName,
  //         lastName: user.lastName,
  //         religion: user.religion,
  //         gender: user.gender,
  //         maritalStatus: user.maritalStatus,
  //         language: user.language,
  //         profession: user.profession,
  //         financialCondition: user.financialCondition,
  //         smokingHabits: user.smokingHabits,
  //         drinkingStatus: user.drinkingStatus,
  //         presentAddress: user.presentAddress,
  //         district: user.district,
  //         division: user.division,
  //         taluk: user.taluk,
  //         zipCode: user.zipCode,
  //       };

  //       // Save the reported user profile to the database using the API service
  //       const response = await saveReported(userProfile); // Call the saveReported function

  //       if (response.success) {
  //         // If the response is successful, show success toast
  //         toast.success(
  //           `${user.firstName} ${user.lastName} has been reported successfully.`
  //         );
  //       } else {
  //         // If there was a failure, show error toast
  //         console.error("Failed to report user:", response?.message);
  //         toast.error(
  //           response?.message || "Failed to report the user. Please try again."
  //         );
  //       }
  //     } else {
  //       // If the user has already been reported
  //       toast.info("You have already reported this user.");
  //     }
  //   } catch (error) {
  //     console.error("Error reporting user:", error);
  //     toast.error(
  //       "There was an error while reporting the user. Please try again."
  //     );
  //   }
  // };

  return (
    <>
      <div className="member-page-container">
        <div className="container-max-width member-page-wrapper">
          <div className="member-filter-main">
            <h5>Member Filter</h5>
            
            {/* Package Limit Warning */}
            {currentPackage && currentPackage.profileViewLimit !== null && 
             currentPackage.profileViewLimit !== undefined && 
             currentPackage.profileViewLimit !== -1 && (
              <div className="package-limit-warning" style={{
                padding: "12px 15px",
                backgroundColor: currentPackage.profileViewLimit === 0 ? "#fff3cd" : "#d1ecf1",
                border: "1px solid " + (currentPackage.profileViewLimit === 0 ? "#ffc107" : "#0dcaf0"),
                borderRadius: "6px",
                marginBottom: "20px",
                fontSize: "14px"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <i className={currentPackage.profileViewLimit === 0 ? "bi bi-exclamation-triangle" : "bi bi-info-circle"} 
                     style={{ fontSize: "18px", color: currentPackage.profileViewLimit === 0 ? "#856404" : "#055160" }}></i>
                  <div>
                    <strong>{currentPackage.packageName} Package</strong>
                    <br />
                    <span style={{ color: currentPackage.profileViewLimit === 0 ? "#856404" : "#055160" }}>
                      {currentPackage.profileViewLimit === 0 ? (
                        <>
                          ⚠️ Profile view limit reached! 
                          <button 
                            onClick={() => navigate("/packages")}
                            style={{
                              marginLeft: "10px",
                              padding: "4px 12px",
                              backgroundColor: "#dc2300",
                              color: "white",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontSize: "12px"
                            }}
                          >
                            Upgrade Now
                          </button>
                        </>
                      ) : (
                        `You can view ${currentPackage.profileViewLimit} profile${currentPackage.profileViewLimit > 1 ? 's' : ''} with your ${currentPackage.packageName} package.`
                      )}
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="memberId">Member ID</label>
              <input
                type="text"
                className="form-control"
                id="memberId"
                name="memberId"
                placeholder="Search by Member ID"
                value={filters.memberId}
                onChange={handleFilterChange}
              />
            </div>
            
            <div className="form-group">
              <label>Looking For (Gender)</label>
              <select
                className="form-select"
                name="gender"
                value={filters.gender}
                onChange={handleFilterChange}
              >
                <option>All</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div className="form-group">
              <label>Marital Status</label>
              <select
                className="form-select"
                name="maritalStatus"
                value={filters.maritalStatus}
                onChange={handleFilterChange}
              >
                <option>All</option>
                <option>Unmarried</option>
                <option>Married</option>
                <option>Divorced</option>
                <option>Widow</option>
                <option>Widower</option>
              </select>
            </div>

            <div className="form-group">
              <label>Religion</label>
              <select
                className="form-select"
                name="religion"
                value={filters.religion}
                onChange={handleFilterChange}
              >
                <option>All</option>
                <option>Hindu</option>
                <option>Islam</option>
                <option>Christian</option>
                <option>Buddhist</option>
              </select>
            </div>

            <div className="form-group">
              <label>Language</label>
              <input
                type="text"
                placeholder="e.g. Hindi, English"
                className="form-control"
                name="language"
                value={filters.language}
                onChange={handleFilterChange}
              />
            </div>

            <div className="form-group">
              <label>Smoking Habits</label>
              <select
                className="form-select"
                name="smokingHabits"
                value={filters.smokingHabits}
                onChange={handleFilterChange}
              >
                <option>All</option>
                <option>non-smoker</option>
                <option>occasional</option>
                <option>regular</option>
              </select>
            </div>

            <div className="form-group">
              <label>Drinking Status</label>
              <select
                className="form-select"
                name="drinkingStatus"
                value={filters.drinkingStatus}
                onChange={handleFilterChange}
              >
                <option>All</option>
                <option>non-drinker</option>
                <option>occasional</option>
                <option>regular</option>
              </select>
            </div>
          </div>

          {/* Member Card Display */}
          <div className="member-card-container">
            {isLoadingPackage ? (
              <div style={{ textAlign: "center", padding: "60px 20px", width: "100%" }}>
                <div className="spinner-border" role="status" style={{ color: "var(--primary-color)" }}>
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p style={{ marginTop: "15px", color: "var(--text-muted)" }}>Loading profiles...</p>
              </div>
            ) : currentPackage && currentPackage.profileViewLimit === 0 ? (
              <div style={{ 
                textAlign: "center", 
                padding: "60px 20px", 
                width: "100%",
                backgroundColor: "var(--background-color, #f8f9fa)",
                borderRadius: "8px",
                border: "2px dashed var(--border-color)"
              }}>
                <i className="bi bi-lock" style={{ fontSize: "64px", color: "var(--text-muted)", marginBottom: "20px", display: "block" }}></i>
                <h4 style={{ color: "var(--text-color)", marginBottom: "10px" }}>Profile View Limit Reached</h4>
                <p style={{ color: "var(--text-muted)", marginBottom: "20px", maxWidth: "500px", margin: "0 auto 20px" }}>
                  You have reached your profile view limit with the <strong>{currentPackage.packageName}</strong> package. 
                  Upgrade to a premium package to view unlimited profiles!
                </p>
                <button 
                  onClick={() => navigate("/packages")}
                  style={{
                    padding: "12px 30px",
                    backgroundColor: "var(--primary-color)",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "500"
                  }}
                >
                  <i className="bi bi-arrow-up-circle" style={{ marginRight: "8px" }}></i>
                  Upgrade Package
                </button>
              </div>
            ) : currentUsers.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px", width: "100%" }}>
                <i className="bi bi-search" style={{ fontSize: "64px", color: "var(--text-muted)", marginBottom: "20px", display: "block" }}></i>
                <p style={{ color: "var(--text-muted)", fontSize: "16px" }}>No members found matching your filters.</p>
              </div>
            ) : (
              currentUsers.map((user) => (
              <div key={user.id} className="member-card">
                <div className="profile-picture">
                  <img src={ContactImg} alt="Profile" />
                </div>
                <div className="member-details-with-actions">
                  <div className="member-details">
                    <h2>
                      {user.firstName} {user.lastName}
                    </h2>
                    <p className="member-id">
                      {/* Member ID : <span>{user.basicInformation.userId}</span> */}
                      Member ID : <span>{user.id}</span>
                    </p>
                    <div className="details-grid">
                      {/* <p>
                        <strong>DOB :</strong> {user.dateOfBirth || "N/A"}
                      </p> */}
                      <p>
                        <strong>Gender :</strong> {user.gender || "N/A"}
                      </p>
                      <p>
                        <strong>Religion :</strong> {user.religion || "N/A"}
                      </p>
                      <p>
                        <strong>Marital Status :</strong>{" "}
                        {user.maritalStatus || "N/A"}
                      </p>
                      <p>
                        <strong>Drinking Status :</strong>{" "}
                        {user.drinkingStatus || "N/A"}
                      </p>
                      <p>
                        <strong>Smoking Habits :</strong>{" "}
                        {user.smokingHabits || "N/A"}
                      </p>
                      <p>
                        <strong>Height :</strong>{" "}
                        {user.physicalAttributes.height || "N/A"}
                      </p>
                      <p>
                        <strong>Language :</strong> {user.language || "N/A"}
                      </p>
                      <p>
                        <strong>Present Address :</strong>{" "}
                        {user.presentAddress || "N/A"}
                      </p>
                      <p>
                        <strong>Profession :</strong> {user.profession || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="member-actions">
                    <button
                      className="action-button"
                      onClick={() => handleInterestClick(user)}
                    >
                      <i className="fa fa-heart action-icons" />
                      <p className="action-button-text">Interest</p>
                    </button>
                    <button
                      className="action-button"
                      onClick={() => navigate('/user/messages', { state: { startChatWith: user } })}
                    >
                      <i className="fa fa-comment action-icons" />
                      <p className="action-button-text">Message</p>
                    </button>
                    <button
                      className="action-button"
                      onClick={() => handleShortlistClick(user)}
                    >
                      <i className="fa fa-star star-icon" aria-hidden="true" />
                      <p className="action-button-text">Shortlist</p>
                    </button>
                    <button
                      className="action-button"
                      onClick={() => handleIgnoredClick(user)}
                    >
                      <i className="fa fa-user-times action-icons" />
                      <p className="action-button-text">Ignore</p>
                    </button>
                  </div>
                </div>
                {user.is_premium && (
                  <div className="premium-badge">Premium</div>
                )}
              </div>
              ))
            )}

            {/* Pagination Component */}
            <Pagination
              membersPerPage={membersPerPage}
              totalMembers={filteredUsers.length}
              currentPage={currentPage}
              paginate={paginate}
            />
          </div>
        </div>
      </div>
      {/* Toast Notifications */}
      
    </>
  );
};

export default MemberDetails;
