import React, { createContext, useState } from "react";
import PropTypes from 'prop-types';

export const LinkContext = createContext();

export const LinkProvider = ({ children }) => {
  const [link, setLink] = useState("");
  const [roadLink, setRoadLink] = useState("");
  const [waterLink, setWaterLink] = useState("");
  const [landLink, setLandLink] = useState("");
  const [selectedAnalysis, setSelectedAnalysis] = useState("");
  const [roadDesc, setRoadDesc] = useState("");
  const [waterDesc, setWaterDesc] = useState("");
  const [landDesc, setLandDesc] = useState("");
  const [roadAnalyzeLink, setRoadAnalyzeLink] = useState("");
  const [waterAnalyzeLink, setWaterAnalyzeLink] = useState("");
  const [landAnalyzeLink, setLandAnalyzeLink] = useState("");

  return (
    <LinkContext.Provider value={{ link, setLink, roadLink, setRoadLink, waterLink, setWaterLink, landLink, setLandLink, selectedAnalysis, setSelectedAnalysis, roadDesc, setRoadDesc, waterDesc, setWaterDesc, landDesc, setLandDesc, roadAnalyzeLink, setRoadAnalyzeLink, waterAnalyzeLink, setWaterAnalyzeLink, landAnalyzeLink, setLandAnalyzeLink}}>
      {children}
    </LinkContext.Provider>
  );
};

LinkProvider.propTypes = {
  children: PropTypes.node.isRequired,
};