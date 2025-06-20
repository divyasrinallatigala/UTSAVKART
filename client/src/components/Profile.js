import React, { useState } from "react";
import "./Profile.css";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaCamera, FaSave, FaTimes } from "react-icons/fa";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    address: "123 Main Street, Mumbai, Maharashtra 400001",
    bio: "Festival enthusiast who loves celebrating traditions and creating memorable moments with family and friends.",
    joinDate: "January 2024",
    totalOrders: 15,
    totalSpent: "₹25,640",
    loyaltyPoints: 1250
  });

  const [tempData, setTempData] = useState(profileData);

  const handleEdit = () => {
    setIsEditing(true);
    setTempData(profileData);
  };

  const handleSave = () => {
    setProfileData(tempData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setTempData({ ...tempData, [field]: value });
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-cover">
          <div className="profile-avatar-container">
            <div className="profile-avatar">
              <img src="/api/placeholder/120/120" alt="Profile" />
              <div className="avatar-overlay">
                <FaCamera />
              </div>
            </div>
          </div>
        </div>
        
        <div className="profile-info">
          <div className="profile-name-section">
            {isEditing ? (
              <input
                type="text"
                value={tempData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="edit-input name-input"
              />
            ) : (
              <h1>{profileData.name}</h1>
            )}
            <p className="member-since">Member since {profileData.joinDate}</p>
          </div>
          
          <div className="profile-actions">
            {isEditing ? (
              <div className="edit-actions">
                <button className="save-btn" onClick={handleSave}>
                  <FaSave /> Save
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  <FaTimes /> Cancel
                </button>
              </div>
            ) : (
              <button className="edit-btn" onClick={handleEdit}>
                <FaEdit /> Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-left">
          <div className="profile-card">
            <h3>Personal Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <FaEnvelope className="info-icon" />
                <div className="info-content">
                  <label>Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={tempData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="edit-input"
                    />
                  ) : (
                    <p>{profileData.email}</p>
                  )}
                </div>