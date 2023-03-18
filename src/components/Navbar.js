import React, { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Login from "../pages/Login";

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const [Mobile, setMobile] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const [loggedIn, setLoggedIn] = useState(isLoggedIn);

  const handleLogoutClick = () => {
    setLoggedIn(false);
    handleLogout();
  };

  const handleLoginClick = () => {
    setShowLoginPopup(true);
  };

  const handleLoginSuccess = () => {
    console.log("Logged in!");
    setLoggedIn(true);
    setShowLoginPopup(false);
  };

  return (
    <div className="navbar-container">
    <>
      <nav className="navbar">
        <h3 className="logo">Logo</h3>
        <ul className={Mobile ? "nav-links-mobile" : "nav-links"} onClick={() => setMobile(false)}>
          <Link to="/" className="home">
            <li>หน้าหลัก</li>
          </Link>
          <Link to={{ pathname: "/technicianSelection", state: { loggedIn: loggedIn } }} className="technicianSelection">
            <li>จองช่าง</li>
        </Link>
          {!loggedIn && (
            <Link to="#" className="login" onClick={handleLoginClick}>
              <li>เข้าสู่ระบบ</li>
            </Link>
          )}
          {loggedIn && (
            <li className="nav-link" onClick={handleLogoutClick}>
              ออกจากระบบ
            </li>
          )}
        </ul>
        <button className="mobile-menu-icon" onClick={() => setMobile(!Mobile)}>
          {Mobile ? <ImCross /> : <FaBars />}
        </button>
      </nav>
      {showLoginPopup && (
        <div className="overlay" onClick={() => setShowLoginPopup(false)}></div>
      )}
      {showLoginPopup && (
        <div className="login-popup">
          <Login handleLoginCallback={handleLoginSuccess} setShowLoginPopup={setShowLoginPopup} />
        </div>
      )}
    </>
    </div>
  );
};

export default Navbar;
