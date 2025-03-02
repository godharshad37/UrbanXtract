import React from "react";
import { Link } from "react-router-dom";
import "./css/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/"className="project-logo">UrbanXtract</Link>
      </div>


      <div className="menu">
        <Link to="/">Home</Link>
        <Link to="/features">Features</Link>
        <Link to="/map">Map</Link>
        <Link to="/upload">Upload</Link>
        <Link to="/result">Result</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;