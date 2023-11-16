import React from "react";
import "./points.css";

const Points = ({ points }) => {
  return (
    <div className="pointsBar">
      <h1>2048</h1>
      <div className="points">
        <p>Score</p>
        <h3>{points}</h3>
      </div>
    </div>
  );
};

export { Points };
