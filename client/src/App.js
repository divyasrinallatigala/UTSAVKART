import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Festivals from "./components/Festivals";
import Cart from "./components/Cart";
import Likes from "./components/Likes";
import Orders from "./components/Orders";
import SellerRegister from "./components/Seller/SellerRegister";
import AddProduct from "./components/Seller/AddProduct";
import Profile from "./components/Profile";

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <main>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            

            

            {/* Seller Routes */}
            <Route path="/seller/register" element={<SellerRegister />} />
            <Route path="/seller/add-product" element={<AddProduct />} />

            {/* Dashboard with Nested Routes */}
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="festivals" element={<Festivals />} />
              <Route path="cart" element={<Cart />} />
              <Route path="likes" element={<Likes />} />
              <Route path="orders" element={<Orders />} />
              <Route path="profile" element={<Profile />} />
              {/* Default nested route */}
              <Route index element={<Navigate to="festivals" />} />
            </Route>

            {/* Fallback redirect */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
