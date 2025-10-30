// src/components/Cart.js
import React, { useState, useEffect } from "react";
import { FaTrash, FaPlus, FaMinus, FaShoppingBag } from "react-icons/fa";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(savedCart);
  }, []);

  useEffect(() => {
    // Calculate total
    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotal(totalAmount);
  }, [cartItems]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }

    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-empty">
          <FaShoppingBag className="empty-icon" />
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <button onClick={clearCart} className="clear-cart-btn">
          Clear Cart
        </button>
      </div>

      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <div className="item-image">
              <span className="item-emoji">{item.image}</span>
            </div>

            <div className="item-details">
              <h4 className="item-name">{item.name}</h4>
              <p className="item-description">{item.description}</p>
              <p className="item-price">₹{item.price}</p>
            </div>

            <div className="quantity-controls">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="quantity-btn"
              >
                <FaMinus />
              </button>
              <span className="quantity">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="quantity-btn"
              >
                <FaPlus />
              </button>
            </div>

            <div className="item-total">
              <p>₹{item.price * item.quantity}</p>
            </div>

            <button
              onClick={() => removeItem(item.id)}
              className="remove-btn"
              title="Remove item"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>₹{total}</span>
        </div>
        <div className="summary-row">
          <span>Shipping:</span>
          <span>₹{total > 1000 ? 0 : 50}</span>
        </div>
        <div className="summary-row total-row">
          <span>Total:</span>
          <span>₹{total + (total > 1000 ? 0 : 50)}</span>
        </div>
        
        <button className="checkout-btn">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;