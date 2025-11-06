import React, { useState, useEffect } from "react";
import UserDashboardLeftSection from "../../components/UserDashboardLeftSection";
import Footer from "../../components/Footer";
import {
  createSupportTicket,
  getUserSupportTickets,
  deleteSupportTicket,
} from "../../services/ApiService";
import "../../styles/user/supportTickets.css";
import "../../styles/user/dashboard.css";
import "../../styles/styles.css";

const SupportTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    priority: "MEDIUM",
    category: "OTHER",
  });
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterPriority, setFilterPriority] = useState("ALL");

  // Get userId from localStorage (consistent with other components)
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      loadTickets();
    }
  }, [userId]);

  const loadTickets = async () => {
    try {
      setLoading(true);
      const data = await getUserSupportTickets(userId);
      setTickets(data);
    } catch (error) {
      alert("Failed to load support tickets");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();

    if (!formData.subject.trim() || !formData.description.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      await createSupportTicket(userId, formData);
      setFormData({
        subject: "",
        description: "",
        priority: "MEDIUM",
        category: "OTHER",
      });
      setShowCreateModal(false);
      await loadTickets();
      alert("Support ticket created successfully!");
    } catch (error) {
      alert("Failed to create support ticket");
    }
  };

  const handleDeleteTicket = async (ticketId) => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) {
      return;
    }

    try {
      await deleteSupportTicket(ticketId, userId);
      await loadTickets();
      setSelectedTicket(null);
      alert("Ticket deleted successfully");
    } catch (error) {
      alert("Failed to delete ticket");
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    const statusMatch = filterStatus === "ALL" || ticket.status === filterStatus;
    const priorityMatch = filterPriority === "ALL" || ticket.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "OPEN":
        return "status-open";
      case "IN_PROGRESS":
        return "status-progress";
      case "RESOLVED":
        return "status-resolved";
      case "CLOSED":
        return "status-closed";
      default:
        return "";
    }
  };

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case "LOW":
        return "priority-low";
      case "MEDIUM":
        return "priority-medium";
      case "HIGH":
        return "priority-high";
      case "URGENT":
        return "priority-urgent";
      default:
        return "";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="user-dashboard-container">
      <div className="container-max-width user-dashboard-wrapper">
        <UserDashboardLeftSection />
        <div className="dashboard-right-section hidden-scrollbar">
          <div className="support-tickets-container">
            {/* Header */}
            <div className="tickets-header">
              <div>
                <h5>Support Tickets</h5>
                <p className="tickets-subtitle">
                  Get help with your account and services
                </p>
              </div>
              <button
                className="create-ticket-btn"
                onClick={() => setShowCreateModal(true)}
              >
                <i className="fas fa-plus"></i>
                <span>Create Ticket</span>
              </button>
            </div>

            {/* Filters */}
            <div className="tickets-filters">
              <div className="filter-group">
                <label>Status:</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="filter-select"
                >
                  <option value="ALL">All</option>
                  <option value="OPEN">Open</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
                  <option value="CLOSED">Closed</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Priority:</label>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="filter-select"
                >
                  <option value="ALL">All</option>
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="URGENT">Urgent</option>
                </select>
              </div>
            </div>

            {/* Tickets List */}
            <div className="tickets-content">
              <div className="tickets-list">
                {loading ? (
                  <div className="loading-state">
                    <i className="fas fa-spinner fa-spin"></i>
                    <p>Loading tickets...</p>
                  </div>
                ) : filteredTickets.length === 0 ? (
                  <div className="empty-state">
                    <i className="fas fa-ticket-alt"></i>
                    <h6>No Support Tickets</h6>
                    <p>You haven't created any support tickets yet</p>
                    <button
                      className="create-first-ticket-btn"
                      onClick={() => setShowCreateModal(true)}
                    >
                      Create Your First Ticket
                    </button>
                  </div>
                ) : (
                  filteredTickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className={`ticket-card ${
                        selectedTicket?.id === ticket.id ? "selected" : ""
                      }`}
                      onClick={() => setSelectedTicket(ticket)}
                    >
                      <div className="ticket-card-header">
                        <div className="ticket-id">#{ticket.id}</div>
                        <div className="ticket-badges">
                          <span className={`status-badge ${getStatusBadgeClass(ticket.status)}`}>
                            {ticket.status.replace("_", " ")}
                          </span>
                          <span className={`priority-badge ${getPriorityBadgeClass(ticket.priority)}`}>
                            {ticket.priority}
                          </span>
                        </div>
                      </div>
                      <h6 className="ticket-subject">{ticket.subject}</h6>
                      <p className="ticket-category">
                        <i className="fas fa-tag"></i> {ticket.category}
                      </p>
                      <div className="ticket-meta">
                        <span className="ticket-date">
                          <i className="far fa-clock"></i>
                          {formatDate(ticket.createdDate)}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Ticket Details Panel */}
              {selectedTicket && (
                <div className="ticket-details-panel">
                  <div className="ticket-details-header">
                    <h6>Ticket Details</h6>
                    <button
                      className="close-details-btn"
                      onClick={() => setSelectedTicket(null)}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>

                  <div className="ticket-details-content">
                    <div className="detail-section">
                      <label>Ticket ID</label>
                      <p>#{selectedTicket.id}</p>
                    </div>

                    <div className="detail-section">
                      <label>Subject</label>
                      <p>{selectedTicket.subject}</p>
                    </div>

                    <div className="detail-section">
                      <label>Description</label>
                      <p className="ticket-description">{selectedTicket.description}</p>
                    </div>

                    <div className="detail-row">
                      <div className="detail-section">
                        <label>Status</label>
                        <span className={`status-badge ${getStatusBadgeClass(selectedTicket.status)}`}>
                          {selectedTicket.status.replace("_", " ")}
                        </span>
                      </div>

                      <div className="detail-section">
                        <label>Priority</label>
                        <span className={`priority-badge ${getPriorityBadgeClass(selectedTicket.priority)}`}>
                          {selectedTicket.priority}
                        </span>
                      </div>
                    </div>

                    <div className="detail-section">
                      <label>Category</label>
                      <p>{selectedTicket.category}</p>
                    </div>

                    <div className="detail-section">
                      <label>Created</label>
                      <p>{formatDate(selectedTicket.createdDate)}</p>
                    </div>

                    {selectedTicket.resolvedDate && (
                      <div className="detail-section">
                        <label>Resolved</label>
                        <p>{formatDate(selectedTicket.resolvedDate)}</p>
                      </div>
                    )}
                  </div>

                  <div className="ticket-actions">
                    <button
                      className="delete-ticket-btn"
                      onClick={() => handleDeleteTicket(selectedTicket.id)}
                    >
                      <i className="fas fa-trash"></i>
                      Delete Ticket
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Create Ticket Modal */}
      {showCreateModal && (
        <div className="ticket-modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="ticket-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ticket-modal-header">
              <h5>Create Support Ticket</h5>
              <button
                className="modal-close-btn"
                onClick={() => setShowCreateModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form className="ticket-form" onSubmit={handleCreateTicket}>
              <div className="form-group">
                <label>Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  required
                  className="form-control"
                >
                  <option value="TECHNICAL">Technical Issue</option>
                  <option value="BILLING">Billing & Payments</option>
                  <option value="ACCOUNT">Account Management</option>
                  <option value="PROFILE">Profile Related</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Priority *</label>
                <select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value })
                  }
                  required
                  className="form-control"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="URGENT">Urgent</option>
                </select>
              </div>

              <div className="form-group">
                <label>Subject *</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  placeholder="Brief description of your issue"
                  required
                  maxLength="200"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Please provide detailed information about your issue..."
                  required
                  maxLength="2000"
                  rows="6"
                  className="form-control"
                ></textarea>
                <small className="char-count">
                  {formData.description.length}/2000 characters
                </small>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  <i className="fas fa-paper-plane"></i>
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default SupportTickets;
