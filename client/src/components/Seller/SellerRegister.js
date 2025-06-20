// src/components/SellerRegister.js
import React, { useState } from "react";
import { auth, db } from "../../firebase"; // ✅ correct path
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
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const uid = userCred.user.uid;

      await setDoc(doc(db, "sellers", uid), {
        uid,
        name: form.name,
        email: form.email,
        phone: form.phone,
        createdAt: Date.now(),
      });

      console.log("Seller account created successfully!");
      navigate("/seller-dashboard");
    } catch (error) {
      alert("Registration failed: " + error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Seller Registration</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register as Seller</button>
      </form>
    </div>
  );
}

export default SellerRegister;
