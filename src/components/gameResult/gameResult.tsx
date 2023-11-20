import React from "react";

const gameResult = ({ title, txt }) => {
  return (
    <div>
      <h1>{title}</h1>
      <h3>{txt}</h3>
    </div>
  );
};

export default gameResult;
