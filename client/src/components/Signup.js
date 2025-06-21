// client/src/components/Signup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import "./Signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      const user = userCredential.user;

      // Update displayName and phoneNumber (optional, stored separately)
      await updateProfile(user, {
        displayName: name,
      });

      // Store extra info in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        phone,
        createdAt: new Date()
      });

      setMsg("Account created successfully! Redirecting...");
      setMsgType("success");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (e) {
      setMsg("Registration failed: " + e.message);
      setMsgType("error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Join UtsavKart</h2>
        <form className="auth-form" onSubmit={submit}>
          <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="tel" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} required />
          <input type="password" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} required />
          <button type="submit" className="auth-button">Create Account</button>
        </form>
        {msg && <div className={`auth-message ${msgType}`}>{msg}</div>}
        <div className="auth-switch">Already have an account? <a href="/login">Sign in</a></div>
      </div>
    </div>
  );
}

export default Signup;
