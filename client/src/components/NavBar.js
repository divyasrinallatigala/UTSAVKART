// src/components/NavBar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          UtsavKart
        </Link>
        
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          
          {/* Seller Links */}
          <div className="dropdown">
            <span className="nav-link dropdown-toggle">Seller</span>
            <div className="dropdown-menu">
              <Link to="/seller/register" className="dropdown-item">Register as Seller</Link>
              <Link to="/seller/add-product" className="dropdown-item">Add Product</Link>
            </div>
          </div>
          
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/signup" className="nav-link">Signup</Link>
          
          <button onClick={handleLogout} className="nav-link logout-btn">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;