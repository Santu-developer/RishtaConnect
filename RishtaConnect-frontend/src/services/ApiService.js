import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

// ============================================
// AXIOS INTERCEPTOR - Handle 401 Unauthorized globally
// ============================================
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token is invalid or expired
      localStorage.removeItem("userData");
      localStorage.removeItem("token");
      localStorage.clear();
      alert("Your session has expired. Please log in again.");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ============================================
// HELPER FUNCTIONS
// ============================================

// Check if token is expired
const isTokenExpired = () => {
  const userData = localStorage.getItem("userData");
  if (!userData) return true;
  
  try {
    const parsedData = JSON.parse(userData);
    const token = parsedData.token;
    
    if (!token) return true;
    
    // Decode JWT token to check expiry
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiryTime = payload.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();
    
    return currentTime >= expiryTime;
  } catch (error) {
    // Handle token parsing errors
    return true;
  }
};

// Logout user if token is invalid or expired
const handleInvalidToken = () => {
  localStorage.removeItem("userData");
  localStorage.removeItem("token");
  localStorage.clear();
  window.location.href = "/login";
};

const getHeader = () => {
  // Check if token exists and is not expired
  if (isTokenExpired()) {
    alert("Your session has expired. Please log in again.");
    handleInvalidToken();
    throw new Error("Token expired");
  }
  
  const token = localStorage.getItem("token");
  // Token logging removed for security
  
  if (!token) {
    alert("Authentication token is missing. Please log in again.");
    handleInvalidToken();
    throw new Error("Token not found");
  }
  
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// ============================================
// AUTHENTICATION
// ============================================

const register = async (registration) => {
  const res = await axios.post(`${BASE_URL}/auth/register`, registration);
  return res.data;
};

const login = async (loginDetails) => {
  const res = await axios.post(`${BASE_URL}/auth/login`, loginDetails);
  localStorage.setItem("userData", JSON.stringify(res.data));
  return res.data;
};

// ============================================
// USERS
// ============================================

const getAllUsers = async () => {
  const res = await axios.get(`${BASE_URL}/users/get-all`, { headers: getHeader() });
  return res.data;
};

const getUserById = async (userId) => {
  const res = await axios.get(`${BASE_URL}/users/get-by-id/${userId}`);
  return res.data;
};

// ============================================
// BASIC INFORMATION
// ============================================

const getBasicInformationByUserId = async (userId) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/basic-information/user/${userId}`, { headers: getHeader() });
    return res.data && Object.keys(res.data).length ? res.data : null;
  } catch (e) {
    return null;
  }
};

const createBasicInformation = async (data) => {
  const res = await axios.post(`${BASE_URL}/api/basic-information`, data, { headers: getHeader() });
  return res.data;
};

const updateBasicInformation = async (id, data, userId = null, setBasicInfo = null) => {
  const res = await axios.put(`${BASE_URL}/api/basic-information/${id}`, data, { headers: getHeader() });
  if (setBasicInfo) {
    setBasicInfo(res.data);
    if (userId) {
      const updated = await getBasicInformationByUserId(userId);
      setBasicInfo(updated);
    }
  }
  return res.data;
};

// ============================================
// PHYSICAL ATTRIBUTES
// ============================================

const createPhysicalAttributes = async (formData) => {
  const res = await axios.post(`${BASE_URL}/api/physical-attributes`, formData, { headers: getHeader() });
  return res.data;
};

const updatePhysicalAttributes = async (id, formData) => {
  const res = await axios.put(`${BASE_URL}/api/physical-attributes/${id}`, formData, { headers: getHeader() });
  return res.data;
};

const getPhysicalAttributesByUserId = async (userId) => {
  const res = await axios.get(`${BASE_URL}/api/physical-attributes/user/${userId}`, { headers: getHeader() });
  return res.data;
};

const fetchPhysicalAttributesData = async (userId) => {
  const res = await axios.get(`${BASE_URL}/api/physical-attributes/user/${userId}`, { headers: getHeader() });
  return res.data;
};

const deletePhysicalAttributes = async (id) => {
  const res = await axios.delete(`${BASE_URL}/api/physical-attributes/${id}`, { headers: getHeader() });
  return res.data;
};

// ============================================
// FAMILY INFORMATION
// ============================================

const createFamilyInformation = async (formData) => {
  const res = await axios.post(`${BASE_URL}/api/family-information`, formData, { headers: getHeader() });
  return res.data;
};

const postFamilyInformation = async (formData) => {
  const res = await axios.post(`${BASE_URL}/api/family-information`, formData, { headers: getHeader() });
  return res.data;
};

const updateFamilyInformation = async (id, formData) => {
  const res = await axios.put(`${BASE_URL}/api/family-information/${id}`, formData, { headers: getHeader() });
  return res.data;
};

const getFamilyInformationByUserId = async (userId) => {
  const res = await axios.get(`${BASE_URL}/api/family-information/user/${userId}`, { headers: getHeader() });
  return res.data;
};

const fetchFamilyInformation = async (userId) => {
  const res = await axios.get(`${BASE_URL}/api/family-information/user/${userId}`, { headers: getHeader() });
  return res.data;
};

// ============================================
// CAREER INFORMATION
// ============================================

const createCareerInformation = async (formData) => {
  const res = await axios.post(`${BASE_URL}/api/career`, formData, { headers: getHeader() });
  return res.data;
};

const updateCareerInformation = async (id, formData) => {
  const res = await axios.put(`${BASE_URL}/api/career/update/${id}`, formData, { headers: getHeader() });
  return res.data;
};

const saveCareerInformation = async (formData, method = "POST") => {
  return method === "PUT"
    ? await updateCareerInformation(formData.id, formData)
    : await createCareerInformation(formData);
};

const careerInformationForm = async (formData, method = "POST") => {
  return method === "PUT"
    ? await updateCareerInformation(formData.id, formData)
    : await createCareerInformation(formData);
};

const getCareerInformationByUserId = async (userId) => {
  const res = await axios.get(`${BASE_URL}/api/career/user/${userId}`, { headers: getHeader() });
  return res.data;
};

const fetchCareerData = async (userId) => {
  const res = await axios.get(`${BASE_URL}/api/career/user/${userId}`, { headers: getHeader() });
  return res.data;
};

const deleteCareerInformation = async (id) => {
  const res = await axios.delete(`${BASE_URL}/api/career/${id}`, { headers: getHeader() });
  return res.data;
};

// ============================================
// PASSWORD MANAGEMENT
// ============================================

const changePassword = async (userId, passwordData) => {
  const res = await axios.put(`${BASE_URL}/api/password/change/${userId}`, passwordData, { headers: getHeader() });
  return res.data;
};

// ============================================
// EDUCATION INFORMATION
// ============================================

const createEducationInformation = async (formData) => {
  const res = await axios.post(`${BASE_URL}/api/education`, formData, { headers: getHeader() });
  return res.data;
};

const updateEducationInformation = async (id, formData) => {
  const res = await axios.put(`${BASE_URL}/api/education/update/${id}`, formData, { headers: getHeader() });
  return res.data;
};

const saveEducationInformation = async (formData, method = "POST") => {
  return method === "PUT"
    ? await updateEducationInformation(formData.id, formData)
    : await createEducationInformation(formData);
};

const educationInformationForm = async (formData, method = "POST") => {
  return method === "PUT"
    ? await updateEducationInformation(formData.id, formData)
    : await createEducationInformation(formData);
};

const getEducationInformationByUserId = async (userId) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/education/user/${userId}`);
    return res.data ? res : { data: [] };
  } catch {
    return { data: [] };
  }
};

const fetchEducationData = async (userId) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/education/user/${userId}`, { headers: getHeader() });
    return res.data ? res : { data: [] };
  } catch {
    return { data: [] };
  }
};

const deleteEducationInformation = async (id) => {
  const res = await axios.delete(`${BASE_URL}/api/education/${id}`, { headers: getHeader() });
  return res.data;
};

// ============================================
// PARTNER EXPECTATIONS
// ============================================

const createPartnerExpectations = async (formData) => {
  const res = await axios.post(`${BASE_URL}/api/partner-expectations`, formData, { headers: getHeader() });
  return res.data;
};

const postPartnerExpectations = async (formData) => {
  const res = await axios.post(`${BASE_URL}/api/partner-expectations`, formData, { headers: getHeader() });
  return res.data;
};

const updatePartnerExpectations = async (id, formData) => {
  const res = await axios.put(`${BASE_URL}/api/partner-expectations/${id}`, formData, { headers: getHeader() });
  return res.data;
};

const getPartnerExpectationsByUserId = async (userId) => {
  const res = await axios.get(`${BASE_URL}/api/partner-expectations/user/${userId}`, { headers: getHeader() });
  return res;
};

const fetchPartnerExpectations = async (userId) => {
  const res = await axios.get(`${BASE_URL}/api/partner-expectations/user/${userId}`, { headers: getHeader() });
  return res.data;
};

// ============================================
// INTEREST MANAGEMENT
// ============================================

const saveInterest = async (userProfile) => {
  const res = await axios.post(`${BASE_URL}/api/interest`, userProfile);
  if (res.status === 201 && res.data) return { success: true, data: res.data };
  throw new Error("Failed to save interest, please try again.");
};

const getAllInterests = async () => {
  const res = await axios.get(`${BASE_URL}/api/interest`);
  return res.data;
};

const fetchAllInterests = async () => {
  const res = await axios.get(`${BASE_URL}/api/interest`);
  return res.data;
};

const getInterestByUserId = async (userId) => {
  const res = await axios.get(`${BASE_URL}/api/interest/${userId}`);
  return res.data;
};

const fetchUserInterestById = async (userId) => {
  const res = await axios.get(`${BASE_URL}/api/interest/${userId}`);
  return res.data;
};

// ============================================
// IGNORED PROFILES
// ============================================

const saveIgnoredProfile = async (userProfile) => {
  const res = await axios.post(`${BASE_URL}/api/ignored-profile`, userProfile);
  if (res.status === 201 && res.data) return { success: true, data: res.data };
  throw new Error("Failed to save ignored profile, please try again.");
};

const saveIgnored = async (userProfile) => {
  const res = await axios.post(`${BASE_URL}/api/ignored-profile`, userProfile);
  if (res.status === 201 && res.data) return { success: true, data: res.data };
  throw new Error("Failed to save ignored profile, please try again.");
};

const getAllIgnoredProfiles = async () => {
  const res = await axios.get(`${BASE_URL}/api/ignored-profile`);
  return res.data;
};

const fetchAllIgnored = async () => {
  const res = await axios.get(`${BASE_URL}/api/ignored-profile`);
  return res.data;
};

// ============================================
// IGNORED PROFILES
// ============================================

const addToIgnoredList = async (userId, ignoredUserId, reason = null) => {
  const res = await axios.post(`${BASE_URL}/api/ignored/add/${userId}`, 
    { ignoredUserId, reason }, 
    { headers: getHeader() }
  );
  return res.data;
};

const getUserIgnoredList = async (userId) => {
  const res = await axios.get(`${BASE_URL}/api/ignored/user/${userId}`, { headers: getHeader() });
  return res.data;
};

const removeFromIgnoredList = async (userId, ignoredUserId) => {
  const res = await axios.delete(`${BASE_URL}/api/ignored/${userId}/${ignoredUserId}`, { headers: getHeader() });
  return res.data;
};

const hasIgnored = async (userId, ignoredUserId) => {
  const res = await axios.get(`${BASE_URL}/api/ignored/check/${userId}/${ignoredUserId}`, { headers: getHeader() });
  return res.data;
};

const getIgnoredCount = async (userId) => {
  const res = await axios.get(`${BASE_URL}/api/ignored/count/${userId}`, { headers: getHeader() });
  return res.data;
};

// ============================================
// SHORTLISTED PROFILES
// ============================================

const saveShortlistedProfile = async (userProfile) => {
  const res = await axios.post(`${BASE_URL}/api/shortlisted-profile`, userProfile);
  if (res.status === 201 && res.data) return { success: true, data: res.data };
  throw new Error("Failed to save shortlisted profile, please try again.");
};

const saveShortlist = async (userProfile) => {
  const res = await axios.post(`${BASE_URL}/api/shortlisted-profile`, userProfile);
  if (res.status === 201 && res.data) return { success: true, data: res.data };
  throw new Error("Failed to save shortlisted profile, please try again.");
};

const getAllShortlistedProfiles = async () => {
  const res = await axios.get(`${BASE_URL}/api/shortlisted-profile`);
  return res.data;
};

const fetchAllShortlisted = async () => {
  const res = await axios.get(`${BASE_URL}/api/shortlisted-profile`);
  return res.data;
};

// ============================================
// PURCHASE HISTORY & PACKAGES
// ============================================

const createPurchaseHistory = async (purchaseData) => {
  const res = await axios.post(`${BASE_URL}/api/purchase-history`, purchaseData, { headers: getHeader() });
  return res.data;
};

const getAllPurchaseHistory = async () => {
  const res = await axios.get(`${BASE_URL}/api/purchase-history`, { headers: getHeader() });
  return res.data;
};

const getPurchaseHistoryByUserId = async (userId) => {
  const res = await axios.get(`${BASE_URL}/api/purchase-history/user/${userId}`, { headers: getHeader() });
  return res.data;
};

const getPurchaseHistoryById = async (id) => {
  const res = await axios.get(`${BASE_URL}/api/purchase-history/${id}`, { headers: getHeader() });
  return res.data;
};

const getAllPackages = async () => {
  const res = await axios.get(`${BASE_URL}/api/packages`);
  return res.data;
};

const getPackageById = async (id) => {
  const res = await axios.get(`${BASE_URL}/api/packages/${id}`);
  return res.data;
};

const fetchUserInformation = async (userId) => {
  const res = await axios.get(`${BASE_URL}/users/get-by-id/${userId}`);
  return res.data;
};

const postBasicInformation = async (data) => {
  const res = await axios.post(`${BASE_URL}/api/basic-information`, data, { headers: getHeader() });
  return res.data;
};

const postPhysicalAttributes = async (formData) => {
  const res = await axios.post(`${BASE_URL}/api/physical-attributes`, formData, { headers: getHeader() });
  return res.data;
};

// ============================================
// GALLERY
// ============================================

const uploadSingleImage = async (file, userId, isProfilePicture = false) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("userId", userId);
  formData.append("isProfilePicture", isProfilePicture);

  const token = localStorage.getItem("token");
  const res = await axios.post(`${BASE_URL}/api/gallery/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const uploadMultipleImages = async (files, userId) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });
  formData.append("userId", userId);

  const token = localStorage.getItem("token");
  const res = await axios.post(`${BASE_URL}/api/gallery/upload/multiple`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const getGalleryByUserId = async (userId) => {
  const res = await axios.get(`${BASE_URL}/api/gallery/user/${userId}`, { headers: getHeader() });
  return res.data;
};

const getProfilePicture = async (userId) => {
  const res = await axios.get(`${BASE_URL}/api/gallery/profile-picture/${userId}`, { headers: getHeader() });
  return res.data;
};

const setAsProfilePicture = async (imageId) => {
  const res = await axios.put(`${BASE_URL}/api/gallery/set-profile-picture/${imageId}`, {}, { headers: getHeader() });
  return res.data;
};

const deleteGalleryImage = async (imageId) => {
  const res = await axios.delete(`${BASE_URL}/api/gallery/${imageId}`, { headers: getHeader() });
  return res.data;
};

// ============================================
// MESSAGING
// ============================================

const sendMessage = async (senderId, receiverId, content) => {
  const res = await axios.post(
    `${BASE_URL}/api/messages/send/${senderId}`,
    { receiverId, content },
    { headers: getHeader() }
  );
  return res.data;
};

const getUserConversations = async (userId) => {
  const res = await axios.get(`${BASE_URL}/api/messages/conversations/${userId}`, { headers: getHeader() });
  return res.data;
};

const getConversationMessages = async (userId, otherUserId) => {
  const res = await axios.get(`${BASE_URL}/api/messages/conversation/${userId}/${otherUserId}`, { headers: getHeader() });
  return res.data;
};

const markMessagesAsRead = async (conversationId, userId) => {
  const res = await axios.put(`${BASE_URL}/api/messages/mark-read/${conversationId}/${userId}`, {}, { headers: getHeader() });
  return res.data;
};

const getUnreadMessageCount = async (userId) => {
  const res = await axios.get(`${BASE_URL}/api/messages/unread-count/${userId}`, { headers: getHeader() });
  return res.data;
};

const deleteMessage = async (messageId, userId) => {
  const res = await axios.delete(`${BASE_URL}/api/messages/${messageId}/${userId}`, { headers: getHeader() });
  return res.data;
};

// ============================================
// SUPPORT TICKETS
// ============================================

const createSupportTicket = async (userId, ticketData) => {
  const res = await axios.post(
    `${BASE_URL}/api/support-tickets/create/${userId}`,
    ticketData,
    { headers: getHeader() }
  );
  return res.data;
};

const getUserSupportTickets = async (userId) => {
  const res = await axios.get(`${BASE_URL}/api/support-tickets/user/${userId}`, { headers: getHeader() });
  return res.data;
};

const getSupportTicketById = async (ticketId, userId) => {
  const res = await axios.get(`${BASE_URL}/api/support-tickets/${ticketId}/user/${userId}`, { headers: getHeader() });
  return res.data;
};

const updateTicketStatus = async (ticketId, status) => {
  const res = await axios.put(
    `${BASE_URL}/api/support-tickets/${ticketId}/status`,
    { status },
    { headers: getHeader() }
  );
  return res.data;
};

const deleteSupportTicket = async (ticketId, userId) => {
  const res = await axios.delete(`${BASE_URL}/api/support-tickets/${ticketId}/user/${userId}`, { headers: getHeader() });
  return res.data;
};

// ============================================
// DEFAULT EXPORT (OBJECT API)
// ============================================

const ApiService = {
  // Auth
  register,
  login,
  
  // Users
  getAllUsers,
  getUserById,
  fetchUserInformation,
  
  // Basic Information
  getBasicInformationByUserId,
  createBasicInformation,
  postBasicInformation,
  updateBasicInformation,
  
  // Physical Attributes
  createPhysicalAttributes,
  postPhysicalAttributes,
  updatePhysicalAttributes,
  getPhysicalAttributesByUserId,
  fetchPhysicalAttributesData,
  deletePhysicalAttributes,
  
  // Family Information
  createFamilyInformation,
  postFamilyInformation,
  updateFamilyInformation,
  getFamilyInformationByUserId,
  fetchFamilyInformation,
  
  // Career
  createCareerInformation,
  updateCareerInformation,
  saveCareerInformation,
  careerInformationForm,
  getCareerInformationByUserId,
  fetchCareerData,
  deleteCareerInformation,
  
  // Education
  createEducationInformation,
  updateEducationInformation,
  saveEducationInformation,
  educationInformationForm,
  getEducationInformationByUserId,
  fetchEducationData,
  deleteEducationInformation,
  
  // Partner Expectations
  createPartnerExpectations,
  postPartnerExpectations,
  updatePartnerExpectations,
  getPartnerExpectationsByUserId,
  fetchPartnerExpectations,
  
  // Password Management
  changePassword,
  
  // Interest
  saveInterest,
  getAllInterests,
  fetchAllInterests,
  getInterestByUserId,
  fetchUserInterestById,
  
  // Ignored
  saveIgnoredProfile,
  saveIgnored,
  getAllIgnoredProfiles,
  fetchAllIgnored,
  
  // Shortlisted
  saveShortlistedProfile,
  saveShortlist,
  getAllShortlistedProfiles,
  fetchAllShortlisted,
  
  // Purchase & Packages
  createPurchaseHistory,
  getAllPurchaseHistory,
  getPurchaseHistoryByUserId,
  getPurchaseHistoryById,
  getAllPackages,
  getPackageById,
  
  // Helper
  getHeader,
};

export default ApiService;

// Named exports for backward compatibility
export {
  // Auth
  register,
  login,
  
  // Users
  getAllUsers,
  getUserById,
  fetchUserInformation,
  
  // Basic Information
  getBasicInformationByUserId,
  createBasicInformation,
  postBasicInformation,
  updateBasicInformation,
  
  // Physical Attributes
  createPhysicalAttributes,
  postPhysicalAttributes,
  updatePhysicalAttributes,
  getPhysicalAttributesByUserId,
  fetchPhysicalAttributesData,
  deletePhysicalAttributes,
  
  // Family Information
  createFamilyInformation,
  postFamilyInformation,
  updateFamilyInformation,
  getFamilyInformationByUserId,
  fetchFamilyInformation,
  
  // Career
  createCareerInformation,
  updateCareerInformation,
  saveCareerInformation,
  careerInformationForm,
  getCareerInformationByUserId,
  fetchCareerData,
  deleteCareerInformation,
  
  // Education
  createEducationInformation,
  updateEducationInformation,
  saveEducationInformation,
  educationInformationForm,
  getEducationInformationByUserId,
  fetchEducationData,
  deleteEducationInformation,
  
  // Partner Expectations
  createPartnerExpectations,
  postPartnerExpectations,
  updatePartnerExpectations,
  getPartnerExpectationsByUserId,
  fetchPartnerExpectations,
  
  // Password Management
  changePassword,
  
  // Interest
  saveInterest,
  getAllInterests,
  fetchAllInterests,
  getInterestByUserId,
  fetchUserInterestById,
  
  // Ignored
  saveIgnoredProfile,
  saveIgnored,
  getAllIgnoredProfiles,
  fetchAllIgnored,
  
  // Shortlisted
  saveShortlistedProfile,
  saveShortlist,
  getAllShortlistedProfiles,
  fetchAllShortlisted,
  
  // Purchase & Packages
  createPurchaseHistory,
  getAllPurchaseHistory,
  getPurchaseHistoryById,
  getPurchaseHistoryByUserId,
  getAllPackages,
  getPackageById,
  
  // Gallery
  uploadSingleImage,
  uploadMultipleImages,
  getGalleryByUserId,
  getProfilePicture,
  setAsProfilePicture,
  deleteGalleryImage,
  
  // Messaging
  sendMessage,
  getUserConversations,
  getConversationMessages,
  markMessagesAsRead,
  getUnreadMessageCount,
  deleteMessage,
  
  // Support Tickets
  createSupportTicket,
  getUserSupportTickets,
  getSupportTicketById,
  updateTicketStatus,
  deleteSupportTicket,
  
  // My Interests (New)
  expressInterest,
  getMyInterests,
  getMyInterestsByStatus,
  getInterestCount,
  getInterestCountByStatus,
  hasInterest,
  deleteInterest,
  getReceivedInterests,
  getReceivedInterestsByStatus, // eslint-disable-line no-use-before-define
  getReceivedInterestCount, // eslint-disable-line no-use-before-define
  updateInterestStatus, // eslint-disable-line no-use-before-define
  
  // Shortlist (New)
  addToShortlist, // eslint-disable-line no-use-before-define
  getUserShortlist, // eslint-disable-line no-use-before-define
  getShortlistCount, // eslint-disable-line no-use-before-define
  isShortlisted, // eslint-disable-line no-use-before-define
  removeFromShortlist, // eslint-disable-line no-use-before-define
  removeShortlistByUserId, // eslint-disable-line no-use-before-define,
  
  // Ignored Profiles
  addToIgnoredList,
  getUserIgnoredList,
  removeFromIgnoredList,
  hasIgnored,
  getIgnoredCount,
  
  // Helper
  getHeader,
};

// ============================================
// MY INTERESTS (NEW IMPLEMENTATION)
// ============================================

const expressInterest = async (userId, interestedUserId, message = '') => {
  const res = await axios.post(
    `${BASE_URL}/api/interests/express/${userId}`,
    { interestedUserId, message },
    { headers: getHeader() }
  );
  return res.data;
};

const getMyInterests = async (userId) => {
  const res = await axios.get(`${BASE_URL}/api/interests/user/${userId}`, { headers: getHeader() });
  return res.data;
};

const getMyInterestsByStatus = async (userId, status) => {
  const res = await axios.get(`${BASE_URL}/api/interests/user/${userId}/status/${status}`, { headers: getHeader() });
  return res.data;
};

const getInterestCount = async (userId) => {
  const res = await axios.get(`${BASE_URL}/api/interests/count/${userId}`, { headers: getHeader() });
  return res.data;
};

const getInterestCountByStatus = async (userId, status) => {
  const res = await axios.get(`${BASE_URL}/api/interests/count/${userId}/status/${status}`, { headers: getHeader() });
  return res.data;
};

const hasInterest = async (userId, interestedUserId) => {
  const res = await axios.get(`${BASE_URL}/api/interests/check/${userId}/${interestedUserId}`, { headers: getHeader() });
  return res.data;
};

const deleteInterest = async (userId, interestId) => {
  const res = await axios.delete(`${BASE_URL}/api/interests/${userId}/${interestId}`, { headers: getHeader() });
  return res.data;
};

// Received Interests (interests where current user is the target)
const getReceivedInterests = async (userId) => {
  const res = await axios.get(`${BASE_URL}/api/interests/received/${userId}`, { headers: getHeader() });
  return res.data;
};

const getReceivedInterestsByStatus = async (userId, status) => {
  const res = await axios.get(`${BASE_URL}/api/interests/received/${userId}/status/${status}`, { headers: getHeader() });
  return res.data;
};

const getReceivedInterestCount = async (userId) => {
  const res = await axios.get(`${BASE_URL}/api/interests/received/count/${userId}`, { headers: getHeader() });
  return res.data;
};

// Update interest status (Accept/Reject)
const updateInterestStatus = async (interestId, status) => {
  const res = await axios.put(`${BASE_URL}/api/interests/status/${interestId}`, { status }, { headers: getHeader() });
  return res.data;
};

// ============================================
// SHORTLIST (NEW IMPLEMENTATION)
// ============================================

const addToShortlist = async (userId, shortlistedUserId, notes = '') => {
  const res = await axios.post(
    `${BASE_URL}/api/shortlist/add/${userId}`,
    { shortlistedUserId, notes },
    { headers: getHeader() }
  );
  return res.data;
};

const getUserShortlist = async (userId) => {
  const res = await axios.get(`${BASE_URL}/api/shortlist/user/${userId}`, { headers: getHeader() });
  return res.data;
};

const getShortlistCount = async (userId) => {
  const res = await axios.get(`${BASE_URL}/api/shortlist/count/${userId}`, { headers: getHeader() });
  return res.data;
};

const isShortlisted = async (userId, shortlistedUserId) => {
  const res = await axios.get(`${BASE_URL}/api/shortlist/check/${userId}/${shortlistedUserId}`, { headers: getHeader() });
  return res.data;
};

const removeFromShortlist = async (userId, shortlistId) => {
  const res = await axios.delete(`${BASE_URL}/api/shortlist/${userId}/${shortlistId}`, { headers: getHeader() });
  return res.data;
};

const removeShortlistByUserId = async (userId, shortlistedUserId) => {
  const res = await axios.delete(`${BASE_URL}/api/shortlist/${userId}/user/${shortlistedUserId}`, { headers: getHeader() });
  return res.data;
};
