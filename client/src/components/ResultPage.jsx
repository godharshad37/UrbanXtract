import React, { useState, useEffect, useContext} from "react";
import "./css/ResultPage.css";
import { LinkContext } from '../context/context';
import Analyzefunction from "./Analyzefunction";


const ResultPage = () => {
  const {link}=useContext(LinkContext);
  const [selectedAnalysis, setSelectedAnalysis] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  

  const cache = React.useRef({});


  useEffect(() => {
    // Fetch image and description from backend when selected option changes
    if(selectedAnalysis)
    {
      if (cache.current[selectedAnalysis]) {
        const cachedData = cache.current[selectedAnalysis];
        setImageSrc(cachedData.link);
        
      }
      else{
        const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/v1/feature/${selectedAnalysis}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
            // Convert description object to array
            setImageSrc(data.link);
            

            // Store the fetched data in the cache
            cache.current[selectedAnalysis] = {
              link: data.link,
            };
          //setDescription(dataArray);
        } 
        catch (error) {
          console.error('Error fetching result:', error);
        }
      };
      fetchData();
    }
    }
  }, [selectedAnalysis]);

  // const densityDesc = (coverage) => {
  //   if (coverage < 10)
  //       return "Sparse coverage of the extracted feature."
  //   else if (coverage < 50)
  //       return "Moderate coverage of the extracted feature."
  //   else
  //       return "High coverage of the extracted feature."
  // }
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
        
        <div className="orignal-image"> 
          <img className="image-box" src={link} alt='Orignal'></img> 
        </div>
      </div>
      <Analyzefunction name={selectedAnalysis}></Analyzefunction>

      

    </div>
  );
};

export default ResultPage;
