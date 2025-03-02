import React, { createContext, useState } from "react";
import PropTypes from 'prop-types';

export const LinkContext = createContext();

export const LinkProvider = ({ children }) => {
  const [link, setLink] = useState("");

  return (
    <LinkContext.Provider value={{ link, setLink }}>
      {children}
    </LinkContext.Provider>
  );
};

LinkProvider.propTypes = {
  children: PropTypes.node.isRequired,
};