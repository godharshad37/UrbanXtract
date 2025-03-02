import React from "react";
import "./css/HomePage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home-container">
      <video autoPlay loop muted className="background-video">
        <source src="../video/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay">
        <h1 className="home-title">UrbanXtract</h1>
        <p className="home-subtitle">Transforming Maps into Insights</p>
        <Link to="/map">
          <button className="start-button">Get Started</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
