import React from "react";
import { UploadFile } from "../components/uploadFile";
import { MyMapContainer } from "../components/MyMapContainer";
import { Navbar } from "../components/Navbar";

export const Home = () => {
  return (
    <div>
      <Navbar />
      <UploadFile />
      <MyMapContainer />
    </div>
  );
};
