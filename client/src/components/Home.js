import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Floating decorative elements */}
      <div className="floating-decoration">❋</div>
      <div className="floating-decoration">✦</div>
      <div className="floating-decoration">❈</div>
      <div className="floating-decoration">✧</div>
      
      <div className="home-content fade-in-up">
        {/* Ornate frame */}
        <div className="ornate-frame"></div>
        <div className="decorative-elements"></div>
        
        {/* Brand logo */}
        <div className="brand-logo">
          U
        </div>
        
        <h1 className="home-title">UtsavKart</h1>
        <p className="home-tagline">One Destination for All Your Festive Needs</p>
        <p className="home-subtitle">
          Discover exquisite festive products curated with love and tradition. 
          From elegant decorations to premium celebration essentials - we bring 
          the magic of festivals to your doorstep with unmatched quality and style.
        </p>
        
        <div className="home-cta">
          <a href="/login" className="cta-button cta-primary">
            ✨ Start Your Journey
          </a>
          <a href="/seller/register" className="cta-button cta-secondary">
            🌟 Become a Partner
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
