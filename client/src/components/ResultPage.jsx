import React, { useState, useEffect, useContext} from "react";
import "./css/ResultPage.css";
import { LinkContext } from '../context/context';


const ResultPage = () => {
  const {link}=useContext(LinkContext);
  const [selectedAnalysis, setSelectedAnalysis] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    // Fetch image and description from backend when selected option changes
    if(selectedAnalysis)
    {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/v1/feature/${selectedAnalysis}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setImageSrc(data.link);
          let dataInfo = data.desc;
          let dataArray = [];
          for (let key in dataInfo) {
            dataArray.push([key, dataInfo[key]]);
          } 
          setDescription(dataArray);
        } catch (error) {
          console.error('Error fetching result:', error);
        }
      };
      fetchData();
    }
  }, [selectedAnalysis]);

  const densityDesc = (coverage) => {
    if (coverage < 10)
        return "Sparse coverage of the extracted feature."
    else if (coverage < 50)
        return "Moderate coverage of the extracted feature."
    else
        return "High coverage of the extracted feature."
  }
  const downloadReport = () => {

  };

  return (
    <div className="result-container">
      <div className="header">
        <h2>Analysis Result</h2>
        <button className="download-report-btn" onClick={downloadReport}>Download Report</button>
      </div>
      {/* <img className="orignal_image" src={link} alt='Orignal'></img> */}


      {/* Taskbar Strip */}
      <div className="taskbar">
        <button
          className={selectedAnalysis === "road_extraction" ? "active" : ""}
          onClick={() => setSelectedAnalysis("road_extraction")}
        >
          Road Analysis
        </button>
        <button
          className={selectedAnalysis === "water_extraction" ? "active" : ""}
          onClick={() => setSelectedAnalysis("water_extraction")}
        >
          Water Analysis
        </button>
        <button
          className={selectedAnalysis === "land" ? "active" : ""}
          onClick={() => setSelectedAnalysis("land")}
        >
          Land Analysis
        </button>
      </div>

      {/* Content Section */}
      <div className="content">
        <div className="image-box">
          {imageSrc ? (
            <img src={imageSrc} alt="Analysis Result" />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
        
        <div className='description-box'> 
          <h3>Description</h3>
          {description && description.map((item, index) => (
            <div key={index}>{`${item[0]} (${item[1]}) : ${densityDesc(item[1])}`}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
