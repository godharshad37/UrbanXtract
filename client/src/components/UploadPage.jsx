import React, { useState, useContext } from "react";
import { LinkContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import "./css/UploadPage.css";
import { FaCloudUploadAlt } from "react-icons/fa";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const {
    setLink,
    setRoadLink,
    setWaterLink,
    setLandLink,
    setLandDesc,
    setWaterDesc,
    setRoadDesc
  } = useContext(LinkContext);
  //const [link, setLink] = useState('');
  const [uploadMessage, setUploadMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmitFile = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();

      formData.append("sat", file);
      console.log(file);
      try {
        const response = await fetch("http://localhost:3000/upload", {
          method: "POST",
          body: formData,
        });
        console.log(response);

        const result = await response.json();
        console.log(result);
        setLink(result.link);
        setRoadLink("");
        setWaterLink("");
        setLandLink("");
        setLandDesc("");
        setRoadDesc("");
        setWaterDesc("");
        setSelectedAnalysis("");
        //show success messege
        setUploadMessage("Image uploaded successfully!");

        //clear messege after 3 sec
        setTimeout(() => {
          setUploadMessage("");
        }, 3000);
      } catch (error) {
        console.error("Error uploading file:", error);
        setUploadMessage("Error uploading Image. Please try again.");
      }
    } else {
      setUploadMessage("Please select a Image to upload.");
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-box">
        <FaCloudUploadAlt className="upload-icon" />
        <h2 className="upload-heading">Upload GeoSpatial Image</h2>

        <form onSubmit={handleSubmitFile}>
          <label htmlFor="geoImg" className="upload-label">
            Select a file to upload
          </label>
          <input
            type="file"
            id="geoImg"
            name="geoImg"
            onChange={handleFileChange}
            className="upload-input"
          />
          <button className="upload-btn" type="submit">
            Submit
          </button>
        </form>

        {/*Success / Error Messege*/}
        {uploadMessage && <div className="upload-message">{uploadMessage}</div>}

        <button className="analyze-btn" onClick={() => navigate("/result")}>
          Proceed
        </button>
      </div>
    </div>
  );
};

export default UploadPage;
