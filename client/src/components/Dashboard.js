import React, { useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import {
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaBox,
  FaSearch,
  FaBell,
  FaCog,
} from "react-icons/fa";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import "./Dashboard.css";

const categories = [
  {
    title: "Hindu Festival",
    icon: "🪔",
    color: "linear-gradient(135deg, #ff9a9e, #fecfef)",
    path: "/dashboard/festivals?hindu=true",
    description: "Celebrate with traditional items",
  },
  {
    title: "Muslim Festival",
    icon: "🕌",
    color: "linear-gradient(135deg, #a8edea, #fed6e3)",
    path: "/dashboard/festivals?muslim=true",
    description: "Sacred celebration essentials",
  },
  {
    title: "Christian Festival",
    icon: "⛪",
    color: "linear-gradient(135deg, #d299c2, #fef9d7)",
    path: "/dashboard/festivals?christian=true",
    description: "Blessed occasion decorations",
  },
  {
    title: "Birthday Party",
    icon: "🎂",
    color: "linear-gradient(135deg, #ffecd2, #fcb69f)",
    path: "/dashboard/events?type=birthday",
    description: "Make birthdays memorable",
  },
  {
    title: "Wedding",
    icon: "💍",
    color: "linear-gradient(135deg, #fbc2eb, #a6c1ee)",
    path: "/dashboard/events?type=marriage",
    description: "Perfect wedding arrangements",
  },
  {
    title: "Housewarming",
    icon: "🏠",
    color: "linear-gradient(135deg, #c3ec52, #0ba29d)",
    path: "/dashboard/events?type=housewarming",
    description: "New home celebrations",
  },
];

const quickActions = [
  { title: "Flash Sale", icon: "⚡", color: "#ff6b6b" },
  { title: "New Arrivals", icon: "🌟", color: "#4ecdc4" },
  { title: "Best Sellers", icon: "🏆", color: "#45b7d1" },
  { title: "Bulk Orders", icon: "📦", color: "#96ceb4" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState(3);
  const [activeCategory, setActiveCategory] = useState(null);

  const isMainDashboard =
    location.pathname === "/dashboard" || location.pathname === "/dashboard/";

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      }
    };
    fetchUser();
  }, []);

  const handleSidebarClick = (path) => {
    navigate(path);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category.title);
    navigate(category.path);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/dashboard/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-mini">U</div>
        </div>

        <div className="sidebar-menu">
          <div
            className={`sidebar-item ${
              location.pathname.includes("/cart") ? "active" : ""
            }`}
            onClick={() => handleSidebarClick("/dashboard/cart")}
          >
            <FaShoppingCart className="sidebar-icon" />
            <span className="tooltip">Cart</span>
          </div>

          <div
            className={`sidebar-item ${
              location.pathname.includes("/profile") ? "active" : ""
            }`}
            onClick={() => handleSidebarClick("/dashboard/profile")}
          >
            <FaUser className="sidebar-icon" />
            <span className="tooltip">Profile</span>
          </div>

          <div
            className={`sidebar-item ${
              location.pathname.includes("/likes") ? "active" : ""
            }`}
            onClick={() => handleSidebarClick("/dashboard/likes")}
          >
            <FaHeart className="sidebar-icon" />
            <span className="tooltip">Wishlist</span>
          </div>

          <div
            className={`sidebar-item ${
              location.pathname.includes("/orders") ? "active" : ""
            }`}
            onClick={() => handleSidebarClick("/dashboard/orders")}
          >
            <FaBox className="sidebar-icon" />
            <span className="tooltip">Orders</span>
          </div>

          <div
            className={`sidebar-item ${
              location.pathname.includes("/settings") ? "active" : ""
            }`}
            onClick={() => handleSidebarClick("/dashboard/settings")}
          >
            <FaCog className="sidebar-icon" />
            <span className="tooltip">Settings</span>
          </div>
        </div>
      </aside>

      <div className="main-content">
        {isMainDashboard ? (
          <>
            <header className="dashboard-header">
              <div className="header-left">
                <h1 className="dashboard-title">Welcome back! 👋</h1>
                <p className="dashboard-subtitle">
                  Discover amazing products for your celebrations
                </p>
              </div>

              <div className="header-right">
                <form className="search-container" onSubmit={handleSearch}>
                  <FaSearch className="search-icon" />
                  <input
                    className="search-input"
                    placeholder="Search products, categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>

                <div className="notification-bell">
                  <FaBell />
                  {notifications > 0 && (
                    <span className="notification-badge">{notifications}</span>
                  )}
                </div>

                <div
                  className="user-avatar"
                  title={userData?.name || "Profile"}
                >
                  <img src="/api/placeholder/40/40" alt="User" />
                </div>
              </div>
            </header>

            {userData && (
              <div className="user-summary">
                <h3>Welcome, {userData.name}</h3>
                <p>Email: {userData.email}</p>
                <p>Phone: {userData.phone}</p>
              </div>
            )}

            <div className="dashboard-content">
              <section className="quick-actions">
                <h3>Quick Actions</h3>
                <div className="quick-actions-grid">
                  {quickActions.map((action, index) => (
                    <div
                      key={index}
                      className="quick-action-card"
                      style={{ borderColor: action.color }}
                    >
                      <span className="quick-action-icon">{action.icon}</span>
                      <span className="quick-action-title">{action.title}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="festivals-section">
                <div className="section-header">
                  <h3>Festivals & Celebrations</h3>
                  <p>Find everything you need for your special occasions</p>
                </div>
                <div className="category-grid">
                  {categories.slice(0, 3).map((category, index) => (
                    <div
                      key={index}
                      className={`category-card ${
                        activeCategory === category.title ? "active" : ""
                      }`}
                      style={{ background: category.color }}
                      onClick={() => handleCategoryClick(category)}
                    >
                      <div className="category-icon">{category.icon}</div>
                      <h4 className="category-title">{category.title}</h4>
                      <p className="category-description">
                        {category.description}
                      </p>
                      <div className="category-arrow">→</div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="events-section">
                <div className="section-header">
                  <h3>Special Events</h3>
                  <p>Make your moments unforgettable</p>
                </div>
                <div className="category-grid">
                  {categories.slice(3).map((category, index) => (
                    <div
                      key={index}
                      className={`category-card ${
                        activeCategory === category.title ? "active" : ""
                      }`}
                      style={{ background: category.color }}
                      onClick={() => handleCategoryClick(category)}
                    >
                      <div className="category-icon">{category.icon}</div>
                      <h4 className="category-title">{category.title}</h4>
                      <p className="category-description">
                        {category.description}
                      </p>
                      <div className="category-arrow">→</div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="stats-section">
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon">📊</div>
                    <h4>Total Orders</h4>
                    <p className="stat-number">247</p>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">💰</div>
                    <h4>Amount Saved</h4>
                    <p className="stat-number">₹12,450</p>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">⭐</div>
                    <h4>Loyalty Points</h4>
                    <p className="stat-number">1,250</p>
                  </div>
                </div>
              </section>
            </div>
          </>
        ) : (
          <div className="nested-content">
            <Outlet />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
