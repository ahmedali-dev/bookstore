import React from 'react';
import usericon from "../../assets/image/logo.png"

const Informations = () => {

  return (
    <div className="user-profile">
      <div className="navigation">
        <h1>information</h1>
        <h1>orders</h1>
        <h1>address</h1>
      </div>
      <div className="profile-picture">
        <img src={usericon} alt="Profile Picture" />
      </div>
      <div className="user-info">
        <h1>Username</h1>
        <h1>email@gamil.com</h1>
        <button>Logout</button>
      </div>
    </div>
  );
};

export default Informations;