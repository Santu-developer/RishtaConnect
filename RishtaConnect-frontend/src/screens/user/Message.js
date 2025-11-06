import React, { useState, useEffect, useRef, useCallback } from "react";
import UserDashboardLeftSection from "../../components/UserDashboardLeftSection";
import Footer from "../../components/Footer";
import Avatar from "../../components/Avatar";
import { useLocation } from "react-router-dom";
import {
  getUserConversations,
  getConversationMessages,
  sendMessage,
  markMessagesAsRead,
  getAllUsers,
  getPurchaseHistoryByUserId,
} from "../../services/ApiService";
import "../../styles/user/messages.css";
import "../../styles/user/dashboard.css";
import "../../styles/styles.css";

const Message = () => {
  const location = useLocation();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [allowedContacts, setAllowedContacts] = useState(10); // Default to 10
  const [userPackage, setUserPackage] = useState(null);
  const messagesEndRef = useRef(null);

  // Get userId from localStorage (consistent with other components)
  const userId = localStorage.getItem("userId");

  // Define handleStartNewConversation BEFORE useEffect that uses it
  const handleStartNewConversation = useCallback(async (user) => {
    console.log("Starting new conversation with:", user);
    
    // Wait for conversations to be available
    const startConversation = async () => {
      // Check if conversation already exists
      const existingConv = conversations.find(
        conv => conv.otherUserId === user.id
      );

      if (existingConv) {
        console.log("Found existing conversation:", existingConv);
        // Directly handle existing conversation
        setSelectedConversation(existingConv);
        
        try {
          const data = await getConversationMessages(userId, existingConv.otherUserId);
          setMessages(data);
          
          // Mark messages as read
          if (existingConv.id) {
            await markMessagesAsRead(existingConv.id, userId);
            const convData = await getUserConversations(userId);
            setConversations(convData);
          }
        } catch (error) {
          console.error("Error loading messages:", error);
        }
      } else {
        console.log("Creating new conversation for user:", user.id);
        // Create temporary conversation object
        const newConv = {
          id: null, // Will be created when first message is sent
          otherUserId: user.id,
          otherUserName: `${user.firstName} ${user.lastName}`,
          otherUserProfilePicture: user.profilePicture || null,
          lastMessage: null,
          lastMessageTime: null,
          unreadCount: 0,
        };
        setSelectedConversation(newConv);
        setMessages([]);
      }
      setSearchQuery("");
    };

    startConversation();
  }, [conversations, userId]);

  // Handle direct message from member page
  useEffect(() => {
    if (location.state?.startChatWith && userId) {
      const user = location.state.startChatWith;
      // Wait for conversations to load before starting chat
      const timer = setTimeout(() => {
        handleStartNewConversation(user);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [location.state?.startChatWith, userId, handleStartNewConversation]);

  // Load conversations on mount
  useEffect(() => {
    if (userId) {
      loadConversations();
      loadAllUsers();
      loadUserPackage();
    }
  }, [userId]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Poll for new messages every 5 seconds
  useEffect(() => {
    if (selectedConversation && userId) {
      const interval = setInterval(() => {
        loadMessages(selectedConversation.otherUserId);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [selectedConversation, userId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadConversations = async () => {
    try {
      setLoading(true);
      const data = await getUserConversations(userId);
      setConversations(data);
    } catch (error) {
      // Error loading conversations
    } finally {
      setLoading(false);
    }
  };

  const loadAllUsers = async () => {
    try {
      const data = await getAllUsers();
      // Filter out current user
      const otherUsers = data.userList?.filter(user => user.id !== userId) || [];
      setAllUsers(otherUsers);
    } catch (error) {
      // Error loading users
    }
  };

  const loadUserPackage = async () => {
    try {
      const purchaseHistory = await getPurchaseHistoryByUserId(userId);
      if (purchaseHistory && purchaseHistory.length > 0) {
        // Get the most recent active package
        const activePackage = purchaseHistory
          .filter(p => p.status === 'ACTIVE')
          .sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate))[0];
        
        if (activePackage) {
          setUserPackage(activePackage);
          // Set allowed contacts based on package
          // Assuming package has a field like 'contactLimit' or 'packageName'
          const packageName = activePackage.packageName?.toLowerCase() || '';
          
          if (packageName.includes('gold') || packageName.includes('premium')) {
            setAllowedContacts(100); // Gold/Premium: 100 contacts
          } else if (packageName.includes('silver')) {
            setAllowedContacts(50); // Silver: 50 contacts
          } else if (packageName.includes('bronze') || packageName.includes('basic')) {
            setAllowedContacts(25); // Bronze/Basic: 25 contacts
          } else {
            setAllowedContacts(10); // Free/Default: 10 contacts
          }
        }
      }
    } catch (error) {
      console.error("Error loading user package:", error);
      setAllowedContacts(10); // Default to 10 on error
    }
  };

  const loadMessages = async (otherUserId) => {
    try {
      const data = await getConversationMessages(userId, otherUserId);
      setMessages(data);
    } catch (error) {
      // Error loading messages
    }
  };

  const handleSelectConversation = async (conversation) => {
    setSelectedConversation(conversation);
    await loadMessages(conversation.otherUserId);
    
    // Mark messages as read
    if (conversation.id) {
      try {
        await markMessagesAsRead(conversation.id, userId);
        // Reload conversations to update unread count
        loadConversations();
      } catch (error) {
        // Error marking messages as read
      }
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      setSending(true);
      await sendMessage(userId, selectedConversation.otherUserId, newMessage);
      setNewMessage("");
      await loadMessages(selectedConversation.otherUserId);
      await loadConversations(); // Update last message in conversation list
    } catch (error) {
      alert("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const filteredUsers = allUsers.filter(user => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  }).slice(0, allowedContacts); // Limit based on package

  return (
    <div className="user-dashboard-container">
      <div className="container-max-width user-dashboard-wrapper">
        <UserDashboardLeftSection />
        <div className="dashboard-right-section hidden-scrollbar">
          <div className="messages-container">
            {/* Conversations List */}
            <div className="conversations-sidebar">
              <div className="conversations-header">
                <h5>Messages</h5>
                <span className="conversations-count">
                  {conversations.length} {conversations.length === 1 ? 'chat' : 'chats'}
                </span>
              </div>

              {/* Search Box - Always Visible (WhatsApp Style) */}
              <div className="conversations-search">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Search or start new chat..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoComplete="off"
                />
                {searchQuery && (
                  <button 
                    className="clear-search-btn"
                    onClick={() => setSearchQuery("")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>

              {/* Package Info */}
              <div className="package-info-banner">
                <i className="fas fa-users"></i>
                <span>
                  {userPackage 
                    ? `${userPackage.packageName} Plan - ${allowedContacts} contacts available`
                    : `Free Plan - ${allowedContacts} contacts available`
                  }
                </span>
              </div>

              <div className="conversations-list">{/* User List when searching, Conversations when not */}
                {searchQuery ? (
                  // Show filtered users when searching
                  <>
                    <div className="list-section-header">
                      <span>Available Contacts ({filteredUsers.length}/{allowedContacts})</span>
                    </div>
                    {filteredUsers.length === 0 ? (
                      <div className="empty-state">
                        <i className="fas fa-user-slash"></i>
                        <p>No users found</p>
                        <span>Try a different search</span>
                      </div>
                    ) : (
                      filteredUsers.map((user) => (
                        <div
                          key={user.id}
                          className="conversation-item user-list-item"
                          onClick={() => handleStartNewConversation(user)}
                        >
                          <div className="conversation-avatar">
                            <Avatar 
                              name={`${user.firstName} ${user.lastName}`} 
                              size="medium" 
                              shape="circle"
                            />
                          </div>
                          <div className="conversation-details">
                            <h6>{user.firstName} {user.lastName}</h6>
                            <p className="user-id-text">ID: {user.id}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </>
                ) : (
                  // Show conversations when not searching
                  <>
                    {loading ? (
                      <div className="loading-state">
                        <i className="fas fa-spinner fa-spin"></i>
                        <p>Loading conversations...</p>
                      </div>
                    ) : conversations.length === 0 ? (
                      <div className="empty-state">
                        <i className="far fa-comments"></i>
                        <p>No conversations yet</p>
                        <span>Search above to start chatting!</span>
                      </div>
                    ) : (
                      <>
                        <div className="list-section-header">
                          <span>Recent Chats</span>
                        </div>
                        {conversations.map((conv) => (
                          <div
                            key={conv.id}
                            className={`conversation-item ${selectedConversation?.id === conv.id ? 'active' : ''}`}
                            onClick={() => handleSelectConversation(conv)}
                          >
                            <div className="conversation-avatar">
                              {conv.otherUserProfilePicture ? (
                                <img 
                                  src={
                                    conv.otherUserProfilePicture.startsWith('http')
                                      ? conv.otherUserProfilePicture
                                      : `http://localhost:8080${conv.otherUserProfilePicture}`
                                  }
                                  alt={conv.otherUserName}
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                  }}
                                />
                              ) : null}
                              {!conv.otherUserProfilePicture && (
                                <Avatar 
                                  name={conv.otherUserName} 
                                  size="medium" 
                                  shape="circle"
                                />
                              )}
                            </div>
                            <div className="conversation-details">
                              <div className="conversation-header-row">
                                <h6>{conv.otherUserName}</h6>
                                <span className="conversation-time">
                                  {conv.lastMessageTime ? formatTime(conv.lastMessageTime) : ''}
                                </span>
                              </div>
                              <div className="conversation-preview-row">
                                <p className="last-message">
                                  {conv.lastMessage || 'No messages yet'}
                                </p>
                                {conv.unreadCount > 0 && (
                                  <span className="unread-badge">{conv.unreadCount}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Chat Area */}
            <div className="chat-area">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="chat-header">
                    <div className="chat-user-info">
                      <div className="chat-avatar">
                        {selectedConversation.otherUserProfilePicture ? (
                          <img 
                            src={
                              selectedConversation.otherUserProfilePicture.startsWith('http')
                                ? selectedConversation.otherUserProfilePicture
                                : `http://localhost:8080${selectedConversation.otherUserProfilePicture}`
                            }
                            alt={selectedConversation.otherUserName}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        {!selectedConversation.otherUserProfilePicture && (
                          <Avatar 
                            name={selectedConversation.otherUserName} 
                            size="medium" 
                            shape="circle"
                          />
                        )}
                      </div>
                      <h6>{selectedConversation.otherUserName}</h6>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="messages-area">
                    {messages.length === 0 ? (
                      <div className="no-messages">
                        <i className="far fa-comment-dots"></i>
                        <p>No messages yet. Start the conversation!</p>
                      </div>
                    ) : (
                      messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`message-bubble ${msg.senderId === userId ? 'sent' : 'received'}`}
                        >
                          <div className="message-content">
                            <p>{msg.content}</p>
                            <span className="message-time">
                              {formatTime(msg.sentAt)}
                              {msg.senderId === userId && (
                                <i className={`fas fa-check${msg.isRead ? '-double read' : ''}`}></i>
                              )}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <form className="message-input-area" onSubmit={handleSendMessage}>
                    <input
                      type="text"
                      className="message-input"
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      disabled={sending}
                    />
                    <button
                      type="submit"
                      className="send-button"
                      disabled={!newMessage.trim() || sending}
                    >
                      {sending ? (
                        <i className="fas fa-spinner fa-spin"></i>
                      ) : (
                        <i className="fas fa-paper-plane"></i>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="no-conversation-selected">
                  <i className="far fa-comment-alt"></i>
                  <h6>Select a conversation</h6>
                  <p>Choose a conversation from the list to start messaging</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Message;

