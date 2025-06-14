// client/src/components/Dashboard.js
import React from "react";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Your Dashboard</h2>
        <p className="dashboard-subtitle">Manage your festive shopping and orders</p>
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-icon">🛍️</div>
          <h3 className="card-title">Browse Products</h3>
          <p className="card-description">
            Discover amazing festive products from our curated collection of sellers.
          </p>
          <button className="card-button">Start Shopping</button>
        </div>
        
        <div className="dashboard-card">
          <div className="card-icon">📦</div>
          <h3 className="card-title">My Orders</h3>
          <p className="card-description">
            Track your orders and view your purchase history.
          </p>
          <button className="card-button">View Orders</button>
        </div>
        
        <div className="dashboard-card">
          <div className="card-icon">❤️</div>
          <h3 className="card-title">Wishlist</h3>
          <p className="card-description">
            Save products you love for later purchase.
          </p>
          <button className="card-button">View Wishlist</button>
        </div>
        
        <div className="dashboard-card">
          <div className="card-icon">🎉</div>
          <h3 className="card-title">Event Planner</h3>
          <p className="card-description">
            Plan your events and get personalized product recommendations.
          </p>
          <button className="card-button">Plan Event</button>
        </div>
      </div>
    </div>
  );
}
