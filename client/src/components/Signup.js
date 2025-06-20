// client/src/components/Signup.js
import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./Signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
      setMsg("Account created successfully! Welcome to UtsavKart.");
      setMsgType("success");
    } catch (e) {
      setMsg("Registration failed: " + e.message);
      setMsgType("error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Join UtsavKart</h2>
          <p className="auth-subtitle">Create your account to start shopping</p>
        </div>
        
        <form className="auth-form" onSubmit={submit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              placeholder="Create a password" 
              value={pass}
              onChange={e => setPass(e.target.value)} 
              required 
            />
          </div>
          
          <button type="submit" className="auth-button">
            Create Account
          </button>
        </form>
        
        {msg && (
          <div className={`auth-message ${msgType}`}>
            {msg}
          </div>
        )}
        
        <div className="auth-switch">
          Already have an account? <a href="/login">Sign in here</a>
        </div>
      </div>
    </div>
  );
}
export default Signup;