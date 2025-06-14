// client/src/components/Signup.js
import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
      setMsg("Account created!");
    } catch (e) {
      setMsg("Error: " + e.message);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={submit}>
        <input type="email" placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={pass}
          onChange={e => setPass(e.target.value)} required />
        <button type="submit">Signup</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
