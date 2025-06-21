// src/components/Seller/SellerRegister.js
import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./Seller.css";

function SellerRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    businessName: "",
    businessType: "",
    address: ""
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Create user account
      const userCred = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const uid = userCred.user.uid;

      // Save seller data to Firestore
      await setDoc(doc(db, "sellers", uid), {
        uid,
        name: form.name,
        email: form.email,
        phone: form.phone,
        businessName: form.businessName,
        businessType: form.businessType,
        address: form.address,
        verified: false,
        createdAt: new Date().toISOString(),
        totalProducts: 0,
        totalSales: 0
      });

      alert("Seller account created successfully! You can now add products.");
      navigate("/seller/add-product");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>🏪 Seller Registration</h2>
      <p style={{ textAlign: 'center', marginBottom: '30px', color: '#8b5cf6' }}>
        Join our marketplace and start selling your products
      </p>
      
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Full Name *"
          value={form.name}
          onChange={handleChange}
          required
        />
        
        <input
          name="email"
          type="email"
          placeholder="Email Address *"
          value={form.email}
          onChange={handleChange}
          required
        />
        
        <input
          name="phone"
          type="tel"
          placeholder="Phone Number *"
          value={form.phone}
          onChange={handleChange}
          required
        />
        
        <input
          name="businessName"
          placeholder="Business/Shop Name *"
          value={form.businessName}
          onChange={handleChange}
          required
        />
        
        <select
          name="businessType"
          value={form.businessType}
          onChange={handleChange}
          required
        >
          <option value="">Select Business Type *</option>
          <option value="decorations">Decorations & Party Supplies</option>
          <option value="catering">Catering Services</option>
          <option value="photography">Photography/Videography</option>
          <option value="flowers">Flowers & Garlands</option>
          <option value="gifts">Gifts & Accessories</option>
          <option value="venue">Venue Services</option>
          <option value="other">Other</option>
        </select>
        
        <textarea
          name="address"
          placeholder="Business Address *"
          value={form.address}
          onChange={handleChange}
          rows="3"
          required
        />
        
        <input
          name="password"
          type="password"
          placeholder="Password (min 6 characters) *"
          value={form.password}
          onChange={handleChange}
          required
          minLength="6"
        />
        
        <button type="submit" disabled={loading}>
          {loading ? "Creating Account..." : "Register as Seller"}
        </button>
      </form>
      
      <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#8b5cf6' }}>
        Already have an account? 
        <span 
          style={{ color: '#6b21a8', cursor: 'pointer', textDecoration: 'underline', marginLeft: '5px' }}
          onClick={() => navigate('/login')}
        >
          Login here
        </span>
      </p>
    </div>
  );
}

export default SellerRegister;