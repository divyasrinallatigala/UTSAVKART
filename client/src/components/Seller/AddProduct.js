// src/components/Seller/AddProduct.js
import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./Seller.css";

function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    type: "",
    category: "",
    price: "",
    originalPrice: "",
    description: "",
    features: "",
    availability: "in-stock",
    minOrder: "1",
    deliveryTime: ""
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if user is authenticated
      if (!auth.currentUser) {
        alert("Please login first to add products");
        navigate("/login");
        return;
      }

      const sellerUID = auth.currentUser.uid;

      // Add product to Firestore
      await addDoc(collection(db, "products"), {
        ...form,
        price: parseFloat(form.price),
        originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : parseFloat(form.price),
        minOrder: parseInt(form.minOrder),
        sellerId: sellerUID,
        sellerEmail: auth.currentUser.email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 0,
        likes: 0,
        orders: 0,
        rating: 0,
        reviews: [],
        images: [], // Will be added when image upload is implemented
        tags: form.features.split(',').map(tag => tag.trim()).filter(tag => tag)
      });

      alert("Product added successfully! 🎉");
      
      // Reset form
      setForm({
        name: "",
        type: "",
        category: "",
        price: "",
        originalPrice: "",
        description: "",
        features: "",
        availability: "in-stock",
        minOrder: "1",
        deliveryTime: ""
      });

    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>📦 Add New Product</h2>
      <p style={{ textAlign: 'center', marginBottom: '30px', color: '#8b5cf6' }}>
        Add your product to reach thousands of customers
      </p>
      
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Product Name *"
          value={form.name}
          onChange={handleChange}
          required
        />
        
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          required
        >
          <option value="">Select Event Type *</option>
          <option value="festival">Festival Items</option>
          <option value="wedding">Wedding Supplies</option>
          <option value="birthday">Birthday Party</option>
          <option value="corporate">Corporate Events</option>
          <option value="anniversary">Anniversary</option>
          <option value="housewarming">Housewarming</option>
          <option value="baby-shower">Baby Shower</option>
          <option value="graduation">Graduation</option>
          <option value="other">Other Events</option>
        </select>

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category *</option>
          <option value="decorations">Decorations</option>
          <option value="flowers">Flowers & Garlands</option>
          <option value="balloons">Balloons</option>
          <option value="lighting">Lighting</option>
          <option value="tableware">Tableware</option>
          <option value="backdrop">Backdrops</option>
          <option value="centerpieces">Centerpieces</option>
          <option value="party-favors">Party Favors</option>
          <option value="invitations">Invitations</option>
          <option value="catering">Catering Items</option>
          <option value="photography">Photography Props</option>
          <option value="other">Other</option>
        </select>
        
        <div style={{ display: 'flex', gap: '15px' }}>
          <input
            name="originalPrice"
            type="number"
            placeholder="Original Price (₹)"
            value={form.originalPrice}
            onChange={handleChange}
            style={{ flex: 1 }}
          />
          <input
            name="price"
            type="number"
            placeholder="Selling Price (₹) *"
            value={form.price}
            onChange={handleChange}
            required
            style={{ flex: 1 }}
          />
        </div>
        
        <textarea
          name="description"
          placeholder="Product Description * (Describe your product in detail)"
          value={form.description}
          onChange={handleChange}
          rows="4"
          required
        />
        
        <textarea
          name="features"
          placeholder="Key Features (Separate with commas: Premium quality, Handmade, Eco-friendly)"
          value={form.features}
          onChange={handleChange}
          rows="2"
        />
        
        <select
          name="availability"
          value={form.availability}
          onChange={handleChange}
          required
        >
          <option value="in-stock">In Stock</option>
          <option value="made-to-order">Made to Order</option>
          <option value="limited">Limited Stock</option>
        </select>
        
        <div style={{ display: 'flex', gap: '15px' }}>
          <input
            name="minOrder"
            type="number"
            placeholder="Minimum Order Quantity"
            value={form.minOrder}
            onChange={handleChange}
            min="1"
            style={{ flex: 1 }}
          />
          <input
            name="deliveryTime"
            placeholder="Delivery Time (e.g., 2-3 days)"
            value={form.deliveryTime}
            onChange={handleChange}
            style={{ flex: 1 }}
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
      
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button 
          type="button" 
          onClick={() => navigate("/dashboard")}
          style={{ 
            background: 'transparent', 
            color: '#6b21a8', 
            border: '2px solid #6b21a8',
            marginRight: '10px'
          }}
        >
          Back to Dashboard
        </button>
        <button 
          type="button" 
          onClick={() => navigate("/seller/register")}
          style={{ 
            background: 'transparent', 
            color: '#8b5cf6', 
            border: '2px solid #8b5cf6' 
          }}
        >
          Register New Seller
        </button>
      </div>
    </div>
  );
}

export default AddProduct;