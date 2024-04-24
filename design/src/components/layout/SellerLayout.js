import React, { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBasketShopping,
  faBookBookmark,
  faChevronLeft,
  faChevronRight,
  faDashboard,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
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
const SellerLayout = () => {
  const sidebarToggle = useRef();
  const [Toggle, setToggle] = React.useState(true);
  useEffect(() => {
    document.getElementById("sidebar-toggle").addEventListener("change", (event) => {
      setToggle(event.target.checked);
    });
  }, [sidebarToggle]);
  return (
    <>
      <input ref={sidebarToggle} type="checkbox" id="sidebar-toggle" />
      <div className="sidebar">
        <div className="header">
          <span>Dashboard</span>
          <label htmlFor="sidebar-toggle">
            {!Toggle ? (
              <FontAwesomeIcon icon={faChevronLeft} />
            ) : (
              <FontAwesomeIcon icon={faChevronRight} />
            )}
          </label>
        </div>

        <hr className="s" />
        <div className="sidebar-items">
          <Nav to={"/seller"} className={"link"} icon={faDashboard}>
            Dashboard
          </Nav>
          <Nav to={"/books"} className={"link"} icon={faBookBookmark}>
            Books
          </Nav>
          <Nav to={"/seller/orders"} className={"link"} icon={faBasketShopping}>
            Orders
          </Nav>
        </div>
      </div>
      <section className="sellerContent">
        <Outlet />
      </section>
    </>
  );
};

export default SellerLayout;
