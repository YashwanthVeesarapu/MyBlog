import React from "react";
import "./loading.scss";

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner" aria-label="Loading"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
