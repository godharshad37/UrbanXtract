import React, { useState } from "react";
import "./css/Analyzefunction.css";

function Analyzefunction({ name }) {
  const [showDescription, setShowDescription] = useState(false); // State to control description visibility
  const [desc, setDesc] = useState([]); // State to store data.desc as an array
  const [link, setLink] = useState(null); // State to store data.link

  const handleAnalyzeClick = async () => {
    setShowDescription(true); // Show the description when the button is clicked
    console.log("clicked")
    try {
      // Map name to the appropriate endpoint
      const endpointMap = {
        road_extraction: "road_analyze",
        water_extraction: "water_analyze",
        build_extraction: "build_analyze"
      };

      const endpoint = endpointMap[name];
      if (!endpoint) {
        throw new Error(`No endpoint mapped for name: ${name}`);
      }

      // Fetch the data from the appropriate endpoint
      const response = await fetch(`http://localhost:3000/api/v1/feature/${endpoint}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Update state with fetched data
         
        let dataInfo = data.desc;
        let dataArray = [];
        for (let key in dataInfo) {
          dataArray.push([key, dataInfo[key]]);
        }
        console.log(dataArray)
        setDesc(dataArray);
        setLink(data.link);
// Convert desc to an array if it's an object
      
     
    } catch (error) {
      console.error("Error fetching analysis data:", error);
    }
  };

  return (
    <div className="full-page-container">
      <div className="analyze-btn-container">
        <button className="analyze-btn" onClick={handleAnalyzeClick}>
          Analyze
        </button>
      </div>
      {showDescription && (
        <div className="description-box">
          <div className="desc-container">
            <h3>Description :</h3>
            {desc.map((item, index) => (
              <div key={index} className="desc-item">
                <strong>{item[0]}</strong> : {item[1]}
              </div>
            ))}
          </div>

          {link && (
            <div className="image-container">
              <img
                src={link}
                alt="Analysis Result"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Analyzefunction;