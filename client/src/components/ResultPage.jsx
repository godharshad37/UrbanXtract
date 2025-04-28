import React, { useState, useEffect, useContext } from "react";
import "./css/ResultPage.css";
import { LinkContext } from "../context/context";
import Analyzefunction from "./Analyzefunction";

const ResultPage = () => {
  const { link } = useContext(LinkContext);
  const [selectedAnalysis, setSelectedAnalysis] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [additionalImages, setAdditionalImages] = useState([]); // State to store images for road and water
  const [loading, setLoading] = useState(false); // State to manage loading state
  const cache = React.useRef({});

  useEffect(() => {
    // Fetch image and description from backend when selected option changes
    if (selectedAnalysis) {
      if (cache.current[selectedAnalysis]) {
        const cachedData = cache.current[selectedAnalysis];
        setImageSrc(cachedData.link);
      } else {
        const fetchData = async () => {
          try {
            const response = await fetch(
              `http://localhost:3000/api/v1/feature/${selectedAnalysis}`
            );
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const data = await response.json();

            // Update the current image
            setImageSrc(data.link);

            // Store the fetched data in the cache
            cache.current[selectedAnalysis] = {
              link: data.link,
            };
          } catch (error) {
            console.error("Error fetching result:", error);
          }
        };
        fetchData();
      }

      // If "land" is clicked, fetch images for "road_extraction" and "water_extraction"
      if (selectedAnalysis === "build_extraction") {
        const fetchAdditionalImages = async () => {
          const analyses = ["road_extraction", "water_extraction"];
          const fetchedImages = [];

          for (const analysis of analyses) {
            if (cache.current[analysis]) {
              fetchedImages.push({
                analysis,
                link: cache.current[analysis].link,
              });
            } else {
              try {
                const response = await fetch(
                  `http://localhost:3000/api/v1/feature/${analysis}`
                );
                if (!response.ok) {
                  throw new Error("Network response was not ok");
                }
                const data = await response.json();

                // Store the fetched data in the cache
                cache.current[analysis] = {
                  link: data.link,
                };

                fetchedImages.push({
                  analysis,
                  link: data.link,
                });
              } catch (error) {
                console.error(`Error fetching ${analysis} result:`, error);
              }
            }
          }

          setAdditionalImages(fetchedImages);
        };

        fetchAdditionalImages();
      } else {
        // Clear additional images if "land" is not selected
        setAdditionalImages([]);
      }
    }
  }, [selectedAnalysis]);

  const downloadReport = () => {
    // Implement download report functionality
  }

  


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
          className={selectedAnalysis === "build_extraction" ? "active" : ""}
          onClick={() => setSelectedAnalysis("build_extraction")}
        >
          Land Analysis
        </button>
      </div>

      {/*Main Content Section */}

      <div className="content">
        {selectedAnalysis === "road_extraction" && (
          <div className="image row">
            <div className="orignal-image">
              <img src={link} alt="Original Image Loading..." />
            </div>
            <div className="Analyze-Image">
              {imageSrc ? (
                <img src={imageSrc} alt="Analysis Result Image..." />
              ) : (
                <p>Loading Analyzed image...</p>
              )}
            </div>
          </div>
        )}

        {selectedAnalysis === "water_extraction" && (
          <div className="image row">
            <div className="orignal-image">
              <img src={link} alt="Original Image Loading..." />
            </div>
            <div className="Analyze-Image">
              {imageSrc ? (
                <img src={imageSrc} alt="Analysis Result Image..." />
              ) : (
                <p>Loading Analyzed image...</p>
              )}
            </div>
          </div>
        )}

        {/* Display additional images only when "land" is clicked */}
        {selectedAnalysis === "build_extraction" &&additionalImages.length > 0 && (
            <div className="additional-images">
              <h3>Additional Analysis Results:</h3>
              {additionalImages.map((img, index) => (
                <div key={index} className="image-container">
                  <h4>{img.analysis.replace("_", " ").toUpperCase()}</h4>
                  <img
                    src={img.link}
                    alt={`${img.analysis} Result`}
                    className="additional-image"
                  />
                </div>
              ))}
            </div>
          )}
      </div>

      <Analyzefunction name={selectedAnalysis}></Analyzefunction>

      {/*Loader Overlay*/}
      {loading && (
        <div className="loader-overlay">
          <div className="spinner"></div>
          <p>Analyzing... Please Wait!</p>
        </div>
      )}
    </div>
  );
};

export default ResultPage;
