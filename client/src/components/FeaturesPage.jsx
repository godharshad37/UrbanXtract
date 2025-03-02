import React from "react";
import "./css/FeaturesPage.css"; // Importing CSS

const FeaturesPage = () => {
  return (
    <div className="features-container">
      <h1 className="features-heading">Project Features</h1>
      <p className="features-content">
        Urban Xtract is a powerful map analysis tool that allows users to
        extract, analyze, and visualize map data with ease.
      </p>

      <ul className="features-list">
        <li>📍 Interactive Map Selection with Coordinate Extraction</li>
        <li>🖼 Image Upload for Map Processing</li>
        <li>🔍 AI-Powered Road, Water, and Land Analysis</li>
        <li>📊 Dynamic Data Visualization & Insights</li>
        <li>⚡ Fast Processing & Easy-to-Use Interface</li>
      </ul>

      <button className="back-button" onClick={() => window.history.back()}>
        🔙 Go Back
      </button>
    </div>
  );
};

export default FeaturesPage;