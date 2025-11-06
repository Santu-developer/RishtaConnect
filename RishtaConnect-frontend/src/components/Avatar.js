import React from "react";
import "../styles/avatar.css";

const Avatar = ({ 
  name = "", 
  size = "medium", 
  shape = "square", 
  style = {},
  className = "",
  badge = null
}) => {
  // Get initials from name (first letter of first name and last name)
  const getInitials = (fullName) => {
    if (!fullName) return "U";
    const names = fullName.trim().split(" ");
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    const firstInitial = names[0].charAt(0).toUpperCase();
    const lastInitial = names[names.length - 1].charAt(0).toUpperCase();
    return firstInitial + lastInitial;
  };

  // Size classes
  const sizeClasses = {
    small: "avatar-small",
    medium: "avatar-medium",
    large: "avatar-large",
    xlarge: "avatar-xlarge"
  };

  // Shape class
  const shapeClass = shape === "circle" ? "avatar-circle" : "avatar-square";

  // Default background colors based on initials
  const getDefaultColor = (initials) => {
    const colors = [
      { bg: "#2196F3", color: "#ffffff" }, // Blue
      { bg: "#9c27b0", color: "#ffffff" }, // Purple
      { bg: "#4CAF50", color: "#ffffff" }, // Green
      { bg: "#FF9800", color: "#ffffff" }, // Orange
      { bg: "#F44336", color: "#ffffff" }, // Red
      { bg: "#00BCD4", color: "#ffffff" }, // Cyan
    ];
    const index = initials.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const initials = getInitials(name);
  const defaultColor = getDefaultColor(initials);

  const avatarStyle = {
    backgroundColor: style.backgroundColor || defaultColor.bg,
    color: style.color || defaultColor.color,
    ...style
  };

  return (
    <div className={`avatar-wrapper ${className}`}>
      <div 
        className={`avatar ${sizeClasses[size]} ${shapeClass}`}
        style={avatarStyle}
      >
        {initials}
      </div>
      {badge && <div className="avatar-badge">{badge}</div>}
    </div>
  );
};

export default Avatar;
