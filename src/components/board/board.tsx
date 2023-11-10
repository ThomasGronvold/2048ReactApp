import React from "react";
import "./board.css";

enum NumberStages {
  "tile-2" = 2,
  "tile-4" = 4,
  "tile-8" = 8,
  "tile-16" = 16,
  "tile-32" = 32,
  "tile-64" = 64,
  "tile-128" = 128,
  "tile-256" = 256,
  "tile-512" = 512,
  "tile-1024" = 1024,
  "tile-2048" = 2048,
}

const cellNumber = (cell: number) => {
  return cell ? "cell " + NumberStages[cell] : "cell";
};

const Board = ({ boardArray }) => {
  return (
    <>
      {boardArray.map((row) => {
        return row.map((cell, index) => {
          return (
            <div key={index} className={cell ? cellNumber(cell) : "cell"}>
              {cell}
            </div>
          );
        });
      })}
    </>
  );
};

export { Board };
