import React from "react";
import { UploadFile } from "../components/uploadFile";
import { MyMapContainer } from "../components/MyMapContainer";
import { Navbar } from "../components/Navbar";
import "./Home.css"; // Import CSS file

export const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      
      <MyMapContainer className="map-container" />
      <UploadFile className="upload-file-container" />
    </div>
  );
};
