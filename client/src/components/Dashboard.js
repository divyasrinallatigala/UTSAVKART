import React from "react";
import "./Dashboard.css";
import { FaUser, FaHeart, FaShoppingCart, FaBox } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    title: "Hindu Festival",
    icon: "🧘‍♂️",
    color: "#fde0c2",
    path: "/dashboard/festivals?hindu=true"
  },
  {
    title: "Muslim Festival",
    icon: "🕌",
    color: "#c2e9fb",
    path: "/dashboard/festivals?muslim=true"
  },
  {
    title: "Christian Festival",
    icon: "⛪",
    color: "#d3f8e2",
    path: "/dashboard/festivals?christian=true"
  },
  {
    title: "Birthday",
    icon: "🎂",
    color: "#ffe0f0",
    path: "/dashboard/events?type=birthday"
  },
  {
    title: "Marriage",
    icon: "💍",
    color: "#e0d4fd",
    path: "/dashboard/events?type=marriage"
  },
  {
    title: "Housewarming",
    icon: "🏠",
    color: "#e3f7d3",
    path: "/dashboard/events?type=housewarming"
  }
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="icon" title="Cart" onClick={() => navigate("/components/cart")}>
          <FaShoppingCart />
        </div>
        <div className="icon" title="Profile" onClick={() => navigate("/profile")}>
          <FaUser />
        </div>
        <div className="icon" title="Likes" onClick={() => navigate("/likes")}>
          <FaHeart />
        </div>
        <div className="icon" title="Orders" onClick={() => navigate("/orders")}>
          <FaBox />
        </div>
      </aside>

      <div className="main">
        <header className="dashboard-header">
          <input className="search" placeholder="Search..." />
          <div className="avatar">👤</div>
        </header>

        <div className="section">
          <h2>Festivals</h2>
          <div className="category-grid">
            {categories.slice(0, 3).map((cat, index) => (
              <div
                className="card floating fade"
                key={index}
                style={{ backgroundColor: cat.color }}
                onClick={() => navigate(cat.path)}
              >
                <div className="emoji">{cat.icon}</div>
                <p>{cat.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h2>Events</h2>
          <div className="category-grid">
            {categories.slice(3).map((cat, index) => (
              <div
                className="card floating fade"
                key={index}
                style={{ backgroundColor: cat.color }}
                onClick={() => navigate(cat.path)}
              >
                <div className="emoji">{cat.icon}</div>
                <p>{cat.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

