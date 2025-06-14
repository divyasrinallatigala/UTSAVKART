// client/src/components/NavBar.js
import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <Link to="/">Home</Link> |{" "}
      <Link to="/login">Login</Link> |{" "}
      <Link to="/signup">Signup</Link> |{" "}
      <Link to="/dashboard">Dashboard</Link> |{" "}
      <Link to="/seller">Seller</Link>
    </nav>
  );
}
