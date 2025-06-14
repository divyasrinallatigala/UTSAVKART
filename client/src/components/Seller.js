// client/src/components/Seller.js
import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Seller() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "products"), {
        name, 
        eventType: type, 
        price: parseFloat(price),
        description,
        createdAt: Date.now()
      });
      setName(""); 
      setType(""); 
      setPrice("");
      setDescription("");
      alert("Product added successfully!");
    } catch (error) {
      alert("Error adding product: " + error.message);
    }
  };

  return (
    <div className="seller-container">
      <div className="seller-header">
        <h2 className="seller-title">Seller Portal</h2>
        <p className="seller-subtitle">Add your festive products to UtsavKart</p>
      </div>
      
      <form className="seller-form" onSubmit={submit}>
        <div className="form-group">
          <label className="form-label">Product Name</label>
          <input 
            placeholder="Enter product name" 
            value={name}
            onChange={e => setName(e.target.value)} 
            required 
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Event Type</label>
            <select 
              value={type}
              onChange={e => setType(e.target.value)} 
              required
            >
              <option value="">Select event type</option>
              <option value="wedding">Wedding</option>
              <option value="birthday">Birthday</option>
              <option value="festival">Festival</option>
              <option value="corporate">Corporate</option>
              <option value="anniversary">Anniversary</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Price (₹)</label>
            <input 
              placeholder="Enter price" 
              type="number" 
              value={price}
              onChange={e => setPrice(e.target.value)} 
              required 
            />
          </div>
        </div>
        
        <div className="form-group">
          <label className="form-label">Product Description</label>
          <textarea 
            placeholder="Describe your product..." 
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows="4"
            required 
          />
        </div>
        
        <button type="submit" className="seller-button">
          Add Product to Store
        </button>
      </form>
    </div>
  );
}