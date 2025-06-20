// src/components/AddProduct.js
import React, { useState } from "react";
import { auth, db } from "../../firebase"; // ✅ correct path
import { collection, addDoc } from "firebase/firestore";
import "./Seller.css";

function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    type: "",
    price: "",
    description: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const sellerUID = auth.currentUser.uid;

      await addDoc(collection(db, "products"), {
        ...form,
        price: parseFloat(form.price),
        sellerId: sellerUID,
        createdAt: Date.now(),
      });

      alert("Product added successfully!");
      setForm({ name: "", type: "", price: "", description: "" });
    } catch (error) {
      alert("Error adding product: " + error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Product Name"
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
          <option value="">Select Type</option>
          <option value="festival">Festival</option>
          <option value="wedding">Wedding</option>
          <option value="birthday">Birthday</option>
          <option value="corporate">Corporate</option>
          <option value="anniversary">Anniversary</option>
          <option value="other">Other</option>
        </select>
        <input
          name="price"
          type="number"
          placeholder="Price (₹)"
          value={form.price}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={form.description}
          onChange={handleChange}
          rows="4"
          required
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
