import React from "react";
import usericon from "../../assets/image/logo.png";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../hooks/useAuth";

const Informations = () => {
  const auth = useAuth();
  const decoded = jwtDecode(auth.token);
  return (
    <div className="user-profile">
      <div className="profile-picture">
        <img
          src={`${process.env.REACT_APP_API_URL}images/${decoded.avatar}`}
          alt="Profile Picture"
        />
      </div>
      <div className="user-info">
        <div>
          <p>Username</p>
          <h1>{decoded.username}</h1>
        </div>
        <div>
          <p>Email</p>
          <h1>{decoded.email}</h1>
        </div>
        <button>Logout</button>
      </div>
    </div>
  );
};

export default Informations;
