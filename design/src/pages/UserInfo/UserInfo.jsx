import React from "react";
import Informations from "../Informations/Informations";
import Orders from "../orders/orders";
import Address from "../address/Address";
import { NavLink, Route, Routes } from "react-router-dom";

const UserInfo = () => {
  return (
    <div className="account">
      <div className="navigation">
        <NavLink to="/account/info" className={({ isActive }) => (isActive ? "active" : "")}>
          information
        </NavLink>
        <NavLink to="/account/orders" className={({ isActive }) => (isActive ? "active" : "")}>
          orders
        </NavLink>
        <NavLink to="/account/address" className={({ isActive }) => (isActive ? "active" : "")}>
          address
        </NavLink>
      </div>
      <div className="userinfo">
        {/* <Informations/> */}
        {/* <Orders/> */}
        {/* <Address/> */}
        <Routes>
          <Route path="/info" element={<Informations />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/address" element={<Address />} />
        </Routes>
      </div>
    </div>
  );
};

export default UserInfo;
