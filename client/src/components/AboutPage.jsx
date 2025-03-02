import React from "react";
import "./css/AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-container">
      <h2>About Urban Xtract</h2>
      <div className="about-content">
        <div className="about-text">
          <p>
            Urban Xtract is an advanced geospatial analysis tool that helps
            users extract and analyze map data with precision. Whether you re
            working with **road networks, water bodies, or land
            classification**, Urban Xtract provides a seamless experience.
          </p>
          <p>
            With features like **interactive map selection, image uploads, and
            AI-powered analysis**, our platform enables efficient
            decision-making for urban planning, environmental studies, and
            infrastructure development.
          </p>
          <p>
            Our mission is to make **geospatial analysis accessible to
            everyone** by offering a user-friendly interface combined with
            powerful backend processing.
          </p>
        </div>
        <div className="about-image">
          <img src="../images/Aboutimage.gif" alt="Urban Xtract Visualization" />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
