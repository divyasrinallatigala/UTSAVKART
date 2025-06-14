// client/src/components/Login.js
import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      setMsg("Welcome back! Login successful.");
      setMsgType("success");
    } catch (e) {
      setMsg("Login failed: " + e.message);
      setMsgType("error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Sign in to your UtsavKart account</p>
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
              placeholder="Enter your password" 
              value={pass}
              onChange={e => setPass(e.target.value)} 
              required 
            />
          </div>
          
          <button type="submit" className="auth-button">
            Sign In
          </button>
        </form>
        
        {msg && (
          <div className={`auth-message ${msgType}`}>
            {msg}
          </div>
        )}
        
        <div className="auth-switch">
          Don't have an account? <a href="/signup">Sign up here</a>
        </div>
      </div>
    </div>
  );
}
