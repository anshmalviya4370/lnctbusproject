import "./css/header.css";
import React from "react";
import logo from "../../pages/images/bus_619121.png";
import Profile from "../../pages/Profile";

const Header = () => {
  return (
    <header className="landing-header">
      <div className="logo">
        <img src={logo} alt="Bus Logo" />
        <h1>LNCT Bus Management</h1>
      </div>
      <nav className="nav">
        <ul>
          <li className="display">
            <a href="#features">Features</a>
          </li>
          <li className="display">
            <a href="#about">About Us</a>
          </li>
          <li className="display">
            <a href="#contact">Contact</a>
          </li>
          <li>
            <span className="profile">
              <Profile />
            </span>
          </li>
          {/* Uncomment this if Login / Signup is needed */}
          {/* <li>
            <a href="./loginPage/index.html" className="cta-button">
              Login / Signup
            </a>
          </li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
