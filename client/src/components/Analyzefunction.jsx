import React, { useContext, useState } from "react";
import "./css/Analyzefunction.css";
import { LinkContext } from "../context/context";

function Analyzefunction({ name }) {
  const {
    roadDesc,
    setRoadDesc,
    roadAnalyzeLink,
    setRoadAnalyzeLink,
    waterDesc,
    setWaterDesc,
    waterAnalyzeLink,
    setWaterAnalyzeLink,
    landDesc,
    setLandDesc,
    landAnalyzeLink,
    setLandAnalyzeLink,
  } = useContext(LinkContext);

  const handleAnalyzeClick = async () => {
    console.log("clicked");
    try {
      const endpointMap = {
        road_extraction: "road_analyze",
        water_extraction: "water_analyze",
        build_extraction: "build_analyze",
      };

      const endpoint = endpointMap[name];
      if (!endpoint) {
        throw new Error(`No endpoint mapped for name: ${name}`);
      }

      const response = await fetch(
        `http://localhost:3000/api/v1/feature/${endpoint}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      let dataInfo = data.desc;
      let dataArray = [];
      for (let key in dataInfo) {
        dataArray.push([key, dataInfo[key]]);
      }
      console.log(dataArray);
      if (endpoint == "road_analyze") {
        setRoadDesc(dataArray);
        setRoadAnalyzeLink(data.link);
      }
      if (endpoint == "water_analyze") {
        setWaterDesc(dataArray);
        setWaterAnalyzeLink(data.link);
      }
      if (endpoint == "build_analyze") {
        setLandDesc(dataArray);
        setLandAnalyzeLink(data.link);
      }
    } catch (error) {
      console.error("Error fetching analysis data:", error);
    }
  };

  return (
    <div className="desc-container">
      {name == "road_extraction" && (
        <div className="full-page-container">
          {!roadDesc && (
            <div className="analyze-btn-container">
              <button className="analyze-btn" onClick={handleAnalyzeClick}>
                Analyze
              </button>
            </div>
          )}
          {roadDesc && (
            <div className="description-box">
              <div className="desc-container">
                <h3>Description :</h3>
                {roadDesc.map((item, index) => (
                  <div key={index} className="desc-item">
                    <strong>{item[0]}</strong> : {item[1]}
                  </div>
                ))}
              </div>

              {roadAnalyzeLink && (
                <div className="image-container">
                  <img
                    src={roadAnalyzeLink}
                    alt="Analysis Result"
                    style={{ maxWidth: "100%", height: "500px" }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {name == "water_extraction" && (
        <div className="full-page-container">
          {!waterDesc && (
          <div className="analyze-btn-container">
            <button className="analyze-btn" onClick={handleAnalyzeClick}>
              Analyze
            </button>
          </div> )}

          {waterDesc && (
            <div className="description-box">
              <div className="desc-container">
                <h3>Description :</h3>
                {waterDesc.map((item, index) => (
                  <div key={index} className="desc-item">
                    <strong>{item[0]}</strong> : {item[1]}
                  </div>
                ))}
              </div>

              {waterAnalyzeLink && (
                <div className="image-container">
                  <img
                    src={waterAnalyzeLink}
                    alt="Analysis Result"
                    style={{ maxWidth: "100%", height: "500px" }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {name == "build_extraction" && (
        <div className="full-page-container">
          {!landDesc && (
          <div className="analyze-btn-container">
            <button className="analyze-btn" onClick={handleAnalyzeClick}>
              Analyze
            </button>
          </div> )}

          {landDesc && (
            <div className="description-box">
              <div className="desc-container">
                <h3>Description :</h3>
                {landDesc.map((item, index) => (
                  <div key={index} className="desc-item">
                    <strong>{item[0]}</strong> : {item[1]}
                  </div>
                ))}
              </div>

              {landAnalyzeLink && (
                <div className="image-container">
                  <img
                    src={landAnalyzeLink}
                    alt="Analysis Result"
                    style={{ maxWidth: "100%", height: "500px" }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Analyzefunction;
