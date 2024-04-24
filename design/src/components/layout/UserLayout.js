import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { DefaultInput } from "../Inputs/Input";
import Logo from "./../../assets/image/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHouse,
  faMagnifyingGlass,
  faShop,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../Buttons/Button";
const Nav = ({ to, icon, className, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) => {
      return isActive ? `${className} active` : `${className}`;
    }}
  >
    {icon ? <FontAwesomeIcon icon={icon} /> : ""}
    <span>{children}</span>
  </NavLink>
);
const userLayout = () => {
  return (
    <>
      <nav className="nav">
        {/* -------------------- */}
        {/* left side */}
        {/* -------------------- */}
        <div className="left">
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="search">
            <DefaultInput placeholder="Search" />
            <button>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </div>

        {/* -------------------- */}
        {/* right side */}
        {/* -------------------- */}

        <div className="right">
          <div className="list">
            <Nav to={"/"} className={"link"} icon={faHouse}>
              Home
            </Nav>
            <Nav to={"/seller"} className={"link"} icon={faShop}>
              Seller
            </Nav>

            <Nav to={"/cart"} className={"link"} icon={faCartShopping}>
              cart
            </Nav>

            <Nav to={"/account"} className={"user-link"}>
              <img
                src="https://images.unsplash.com/photo-1712512162392-d523620fbaa2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0N3x8fGVufDB8fHx8fA%3D%3D"
                alt="user-logo"
              />
            </Nav>
          </div>
        </div>
      </nav>
      <Outlet />
      <div className="mobleView"></div>
    </>
  );
};

export default userLayout;
