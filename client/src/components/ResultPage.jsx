import React, { useState, useEffect, useContext } from "react";
import "./css/ResultPage.css";
import { LinkContext } from "../context/context";
import Analyzefunction from "./Analyzefunction";
import { Oval } from "react-loader-spinner";

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
  } = useContext(LinkContext);

  const getData = async (type) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/feature/${type}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      //console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching result:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (selectedAnalysis === "road_extraction") {
        let data = await getData("road_extraction");
        setRoadLink(data.link);
      } else if (selectedAnalysis === "water_extraction") {
        let data = await getData("water_extraction");
        setWaterLink(data.link);
      } else if (selectedAnalysis === "build_extraction") {
        if (landLink == "") {
          let data = await getData("build_extraction");
          console.log(data);
          setLandLink(data.buildLink);
        }
        if (waterLink == "") {
          let data = await getData("water_extraction");
          console.log(data);
          setWaterLink(data.link);
        }
        if (roadLink == "") {
          let data = await getData("road_extraction");
          console.log(data);
          setRoadLink(data.link);
        }
      }
    };

    fetchData();
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
          }}
        >
          Road Analysis
        </button>
        <button
          className={selectedAnalysis === "water_extraction" ? "active" : ""}
          onClick={() => {
            setSelectedAnalysis("water_extraction");
          }}
        >
          Water Analysis
        </button>
        <button
          className={selectedAnalysis === "build_extraction" ? "active" : ""}
          onClick={() => {
            setSelectedAnalysis("build_extraction");
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
              <img
                src={link}
                height={256}
                width={256}
                alt="Original Image Loading..."
              />
            </div>
            <div className="analyze-image image-card">
              <h4>ANALYSIS RESULT</h4>
              {roadLink ? (
                <img
                  src={roadLink}
                  height={256}
                  width={256}
                  alt="Analysis Result Image..."
                />
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <Oval
                    height={80}
                    width={80}
                    color="#4fa94d"
                    ariaLabel="loading"
                  />
                  <p style={{ color: "green", marginTop: 5 }}>Loading</p>
                </div>
              )}
            </div>
          </div>
        )}

        {selectedAnalysis === "water_extraction" && (
          <div className="image-row">
            <div className="orignal-image image-card">
              <h4>ORIGNAL IMAGE</h4>
              <img
                src={link}
                height={256}
                width={256}
                alt="Original Image Loading..."
              />
            </div>
            <div className="analyze-image image-card">
              <h4>ANALYSIS RESULT</h4>
              {waterLink ? (
                <img
                  src={waterLink}
                  height={256}
                  width={256}
                  alt="Analysis Result Image..."
                />
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <Oval
                    height={80}
                    width={80}
                    color="#4fa94d"
                    ariaLabel="loading"
                  />
                  <p style={{ color: "green", marginTop: 5 }}>Loading</p>
                </div>
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
                <img
                  src={link}
                  height={256}
                  width={256}
                  alt="Original Image Loading..."
                />
              </div>
              <div className="analyze-image image-card">
                <h4>ANALYSIS RESULT</h4>
                {landLink ? (
                  <img
                    src={landLink}
                    height={256}
                    width={256}
                    alt="Analysis Result Image..."
                  />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <Oval
                      height={80}
                      width={80}
                      color="#4fa94d"
                      ariaLabel="loading"
                    />
                    <p style={{ color: "green", marginTop: 5 }}>Loading</p>
                  </div>
                )}
              </div>
            </div>
            <div className="additional-images">
              {waterLink && roadLink && <h3>Additional Analysis Results:</h3>}
              <div className="image-wrapper">
                <div className="analyze-image image-card">
                  <h4>Water Extraction</h4>
                  {waterLink ? (
                    <img
                      src={waterLink}
                      height={256}
                      width={256}
                      alt="Analysis Result Image..."
                    />
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        height: "300px",
                      }}
                    >
                      <Oval
                        height={80}
                        width={80}
                        color="#4fa94d"
                        ariaLabel="loading"
                      />
                      <p style={{ color: "green", marginTop: 5 }}>Loading</p>
                    </div>
                  )}
                </div>
                <div className="analyze-image image-card">
                  <h4>Road Extraction</h4>
                  {roadLink ? (
                    <img
                      src={roadLink}
                      height={256}
                      width={256}
                      alt="Analysis Result Image..."
                    />
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        height: "300px",
                      }}
                    >
                      <Oval
                        height={80}
                        width={80}
                        color="#4fa94d"
                        ariaLabel="loading"
                      />
                      <p style={{ color: "green", marginTop: 5 }}>Loading</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Analyzefunction
        className="desc-container"
        name={selectedAnalysis}
      ></Analyzefunction>
    </div>
  );
};

export default ResultPage;
