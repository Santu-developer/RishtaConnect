// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./screens/Home";
import Packages from "./screens/Packages";
import SuccessStories from "./screens/SuccessStories";
import Contact from "./screens/Contact";
import Login from "./screens/Login";
import Member from "./screens/Member";
import AccountRecovery from "./components/AccountRecovery";
import Register from "./screens/Register";
import StoriesDetailPage from "./screens/StoriesDetailsPage";
import UserDashboard from "./screens/user/Dashboard";
import PurchaseHistory from "./screens/user/PurchaseHistory";
import UserGallery from "./screens/user/UserGallery";
import UserShortList from "./screens/user/ShortList";
import UserMyInterest from "./screens/user/MyInterest";
import UserInterestRequest from "./screens/user/InterestRequest";
import UserIgnoredList from "./screens/user/IgnoredList";
import UserMessage from "./screens/user/Message";
import UserSupportTicket from "./screens/user/SupportTickets";
import UserProfileSetting from "./screens/user/ProfileSetting";
import UserChangePassword from "./screens/user/ChangePassword";
import EducationForm from "./screens/user/profileSetting/EducationForm";

function App() {
  return (
    <Router basename="/">
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={3}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/members" element={<Member />} />
        <Route path="/success-stories" element={<SuccessStories />} />
        <Route path="/stories" element={<SuccessStories />} />
        <Route
          path="/stories-detail/:id"
          element={<StoriesDetailPage />}
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<AccountRecovery />} />
        
        {/* Protected Routes - Require Authentication */}
        <Route path="/user/purchase/history" element={<ProtectedRoute><PurchaseHistory /></ProtectedRoute>} />
        <Route path="/user/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
        <Route path="/user/gallery" element={<ProtectedRoute><UserGallery /></ProtectedRoute>} />
        <Route path="/user/shortlist" element={<ProtectedRoute><UserShortList /></ProtectedRoute>} />
        <Route path="/user/my-interest" element={<ProtectedRoute><UserMyInterest /></ProtectedRoute>} />
        <Route path="/user/interest-request" element={<ProtectedRoute><UserInterestRequest /></ProtectedRoute>} />
        <Route path="/user/ignored-lists" element={<ProtectedRoute><UserIgnoredList /></ProtectedRoute>} />
        <Route path="/user/messages" element={<ProtectedRoute><UserMessage /></ProtectedRoute>} />
        <Route path="/user/support-tickets" element={<ProtectedRoute><UserSupportTicket /></ProtectedRoute>} />
        <Route path="/user/profile-settings" element={<ProtectedRoute><UserProfileSetting /></ProtectedRoute>} />
        <Route path="/user/change-password" element={<ProtectedRoute><UserChangePassword /></ProtectedRoute>} />
        <Route path="/user/profile-settings/education" element={<ProtectedRoute><EducationForm /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
