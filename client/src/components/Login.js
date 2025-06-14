// client/src/components/Login.js
import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      setMsg("Logged in!");
    } catch (e) {
      setMsg("Error: " + e.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input type="email" placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={pass}
          onChange={e => setPass(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
