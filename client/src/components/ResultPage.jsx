import React, { useState, useEffect, useContext } from "react";
import "./css/ResultPage.css";
import { LinkContext } from "../context/context";
import Analyzefunction from "./Analyzefunction";

const ResultPage = () => {
  const {
    link,
    roadLink,
    setRoadLink,
    waterLink,
    setWaterLink,
    landLink,
    setLandLink,
    selectedAnalysis,
    setSelectedAnalysis,
    setShowAnalyze,
    setShowDescription
  } = useContext(LinkContext);
  const [additionalImages, setAdditionalImages] = useState([]);

  useEffect(() => {
    if (selectedAnalysis) {
      const fetchData = async (selectType) => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/v1/feature/${selectType}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          if (selectedAnalysis == "road_extraction") {
            setRoadLink(data.link);
            setShowAnalyze(true);
          } else if (selectedAnalysis == "water_extraction") {
            setWaterLink(data.link);
            setShowAnalyze(true);
          } else {
            console.log(data);
            const fetchedImages = [];
            if (waterLink) {
              fetchedImages.push({
                analysis: "water_extraction",
                link: waterLink,
              });
            }
            if (roadLink) {
              fetchedImages.push({
                analysis: "road_extraction",
                link: roadLink,
              });
            }
            setLandLink(data.buildLink);
            setAdditionalImages(fetchedImages);
            setShowAnalyze(true);
          }
        } catch (error) {
          console.error("Error fetching result:", error);
        }
      };
      fetchData(selectedAnalysis);
    }
  }, [selectedAnalysis]);

  const downloadReport = () => {
    // Implement download report functionality
  };

  return (
    <div className="result-container">
      {/* Header Section */}
      <div className="header">
        <h2>Analysis Result</h2>
        {/*}
        <button className="download-report-btn" onClick={downloadReport}>
          Download Report
        </button>
        */}
      </div>

      {/* Taskbar Strip */}
      <div className="taskbar">
        <button
          className={selectedAnalysis === "road_extraction" ? "active" : ""}
          onClick={() => {
            setSelectedAnalysis("road_extraction");
            setShowAnalyze(false);
            setShowDescription(false);
          }}
        >
          Road Analysis
        </button>
        <button
          className={selectedAnalysis === "water_extraction" ? "active" : ""}
          onClick={() => {setSelectedAnalysis("water_extraction");
            setShowAnalyze(false);
            setShowDescription(false);
          }}
        >
          Water Analysis
        </button>
        <button
          className={selectedAnalysis === "build_extraction" ? "active" : ""}
          onClick={() => {setSelectedAnalysis("build_extraction");
            setShowAnalyze(false);
            setShowDescription(false);
          }}
        >
          Land Analysis
        </button>
      </div>

      {/*Main Content Section */}

      <div className="content">
        {selectedAnalysis === "road_extraction" && (
          <div className="image-row">
            <div className="orignal-image image-card">
              <h4>ORIGNAL IMAGE</h4>
              <img src={link} alt="Original Image Loading..." />
            </div>
            <div className="analyze-image image-card">
              <h4>ANALYSIS RESULT</h4>
              {roadLink ? (
                <img src={roadLink} alt="Analysis Result Image..." />
              ) : (
                <p>Loading Analyzed image...</p>
              )}
            </div>
          </div>
        )}

        {selectedAnalysis === "water_extraction" && (
          <div className="image-row">
            <div className="orignal-image image-card">
              <h4>ORIGNAL IMAGE</h4>
              <img src={link} alt="Original Image Loading..." />
            </div>
            <div className="analyze-image image-card">
              <h4>ANALYSIS RESULT</h4>
              {waterLink ? (
                <img src={waterLink} alt="Analysis Result Image..." />
              ) : (
                <p>Loading Analyzed image...</p>
              )}
            </div>
          </div>
        )}

        {/* Display additional images only when "land" is clicked */}
        {selectedAnalysis === "build_extraction" && (
          <div className="analyze-container">
            <div className="image-row">
              <div className="orignal-image image-card">
                <h4>ORIGNAL IMAGE</h4>
                <img src={link} alt="Original Image Loading..." />
              </div>
              <div className="analyze-image image-card">
                <h4>ANALYSIS RESULT</h4>
                {landLink ? (
                  <img src={landLink} alt="Analysis Result Image..." />
                ) : (
                  <p>Loading Analyzed image...</p>
                )}
              </div>
            </div>
            <div className="additional-images">
              {setShowAnalyze && (<h3>Additional Analysis Results:</h3>)}
              <div className="image-wrapper">
                {additionalImages.map((img, index) => (
                  <div key={index} className="two-image image-card">
                    <h4>{img.analysis.replace("_", " ").toUpperCase()}</h4>
                    <img
                      src={img.link}
                      alt={`${img.analysis} Result`}
                      className="additional-image"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <Analyzefunction className="desc-container" name={selectedAnalysis}></Analyzefunction>
    </div>
  );
};

export default ResultPage;
