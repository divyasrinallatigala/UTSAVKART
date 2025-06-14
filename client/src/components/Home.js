import React from "react";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">UtsavKart</h1>
        <p className="home-subtitle">
          Discover amazing festive products tailored to your celebrations. 
          From traditional decorations to modern party essentials - we've got everything for your special moments.
        </p>
        <div className="home-cta">
          <a href="/dashboard" className="cta-button cta-primary">
            Start Shopping
          </a>
          <a href="/seller" className="cta-button cta-secondary">
            Become a Seller
          </a>
        </div>
      </div>
    </div>
  );
};
export default Home
