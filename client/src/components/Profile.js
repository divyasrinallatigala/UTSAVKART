import React, { useEffect, useState } from "react";
import { auth } from "../firebase";

function Profile() {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email);
    }
  }, []);

  return (
    <div className="profile">
      <h2>User Profile</h2>
      <p>Email: {userEmail}</p>
    </div>
  );
}

export default Profile;

