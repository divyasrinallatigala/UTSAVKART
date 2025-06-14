// client/src/components/Seller.js
import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Seller() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "products"), {
      name, eventType: type, price: parseFloat(price),
      createdAt: Date.now()
    });
    setName(""); setType(""); setPrice("");
    alert("Product added!");
  };

  return (
    <div>
      <h2>Seller Portal</h2>
      <form onSubmit={submit}>
        <input placeholder="Product Name" value={name}
          onChange={e => setName(e.target.value)} required />
        <input placeholder="Event Type" value={type}
          onChange={e => setType(e.target.value)} required />
        <input placeholder="Price" type="number" value={price}
          onChange={e => setPrice(e.target.value)} required />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
