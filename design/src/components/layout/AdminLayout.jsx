import React, { useEffect, useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBasketShopping,
  faBookBookmark,
  faChevronLeft,
  faChevronRight,
  faDashboard,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { jwtDecode } from "jwt-decode";
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
const AdminLayout = () => {
  const sidebarToggle = useRef();
  const auth = useAuth();
  const decoded = jwtDecode(auth.token);
  const [Toggle, setToggle] = React.useState(true);
  useEffect(() => {
    try {
      document.getElementById("sidebar-toggle").addEventListener("change", (event) => {
        setToggle(event.target.checked);
      });
    } catch (error) {}
  }, [sidebarToggle]);
  return (
    <>
      <div className="seller-container">
        <input ref={sidebarToggle} type="checkbox" id="sidebar-toggle" />
        <label htmlFor="sidebar-toggle" className="sidebar-toggle-mobile">
          {" "}
          <FontAwesomeIcon icon={faChevronRight} />
        </label>
        <div className="sidebar admin">
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
          <div className="list">
            <div className="sidebar-items">
              <Nav to={"/admin/dashboard"} className={"link"} icon={faDashboard}>
                Dashboard
              </Nav>
              <Nav to={"/admin/users"} className={"link"} icon={faUsers}>
                users
              </Nav>
              <Nav to={"/admin/books"} className={"link"} icon={faBookBookmark}>
                Books
              </Nav>
              <Nav to={"/admin/orders"} className={"link"} icon={faBasketShopping}>
                Orders
              </Nav>
            </div>

            <div className="sidebar-items">
              <Link className="account">
                <div>
                  <img src={`${process.env.REACT_APP_API_URL}images/${decoded.avatar}`} alt="" />
                  <p>{decoded.username}</p>
                </div>
              </Link>
              <Button className="error" onClick={auth.logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
        <section className="sellerContent">
          <Outlet />
        </section>
      </div>
    </>
  );
};

export default AdminLayout;
