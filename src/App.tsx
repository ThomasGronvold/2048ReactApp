import { useEffect, useState } from "react";
import "./App.css";
import { updateBoardArray } from "./gameLogic/updateBoardArray";
import { Board } from "./components/board/board";
import { Points } from "./components/points/points";
import TestButton from "./components/resetButton/buttonTest";
import Victory from "./components/victory/victory";
import Btn from "./components/btn/btn";
import React from "react";

/* Enums */
enum Direction {
  Up = "ArrowUp",
  Down = "ArrowDown",
  Left = "ArrowLeft",
  Right = "ArrowRight",
}

function App() {
  // State hooks to manage the game state
  const [points, setPoints] = useState<number>(0);
  const [board, setBoard] = useState<(number | null)[][]>(boardInit());
  const [hasWon, setWon] = useState<boolean>(false);
  const [continueGame, setContinueGame] = useState<boolean>(false);

  // Function to reset the game state
  const onclickReset = () => (setBoard(boardInit()), setPoints(0), setWon(false), setContinueGame(false));

  // Effect hook to handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === Direction.Up || event.key === "w") {
        const updatedBoard = updateBoardArray(board, "Up");
        setBoard(updatedBoard.newBoardArray);
        setPoints(points + updatedBoard.mergedVal);
        if (updatedBoard.maxMergedNumber === 2048 && !continueGame) {
          setWon(true);
        }
      } else if (event.key === Direction.Down || event.key === "s") {
        const updatedBoard = updateBoardArray(board, "Down");
        setBoard(updatedBoard.newBoardArray);
        setPoints(points + updatedBoard.mergedVal);
        if (updatedBoard.maxMergedNumber === 2048 && !continueGame) {
          setWon(true);
        }
      } else if (event.key === Direction.Left || event.key === "a") {
        const updatedBoard = updateBoardArray(board, "Left");
        setBoard(updatedBoard.newBoardArray);
        setPoints(points + updatedBoard.mergedVal);
        if (updatedBoard.maxMergedNumber === 2048 && !continueGame) {
          setWon(true);
        }
      } else if (event.key === Direction.Right || event.key === "d") {
        const updatedBoard = updateBoardArray(board, "Right");
        setBoard(updatedBoard.newBoardArray);
        setPoints(points + updatedBoard.mergedVal);
        if (updatedBoard.maxMergedNumber === 2048 && !continueGame) {
          setWon(true);
        }
      }
    };

    // Add event listener for keyboard events
    window.addEventListener("keydown", handleKeyDown);

    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  // Render components based on game state
  return (
    <>
      {hasWon && !continueGame ? (
        <>
          <Victory />
          <div className="victoryButtons">
            <Btn txt="New Game" onClick={onclickReset} />
            <Btn txt="Resume" onClick={() => (setWon(false), setContinueGame(true))} />
          </div>
        </>
      ) : (
        <>
          <Points points={points} />
          <Board boardArray={board} />
          <div className="buttonDiv">
            <Btn txt="New Game" onClick={onclickReset} />
          </div>
        </>
      )}
    </>
  );
}

// Function to initialize the game board
const boardInit = () => {
  const initArray = Array(4)
    .fill(null)
    .map(() => Array(4).fill(null));

  // Place a random number on the initial board
  const randomRow = Math.floor(Math.random() * 4);
  const randomCol = Math.floor(Math.random() * 4);
  initArray[randomRow][randomCol] = Math.floor(Math.random() < 0.9 ? 2 : 4);

  return initArray;
};

export default App;
