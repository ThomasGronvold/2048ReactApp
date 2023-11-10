import { useEffect, useState } from "react";
import "./App.css";
import {updateBoardArray} from "./gameLogic/updateBoardArray";
import { Board } from "./components/board/board";
import TestButton from "./components/buttonTest/buttonTest";

function App() {
  const [board, setBoard] = useState(
    Array(4)
      .fill(0)
      .map(() => Array(4).fill(null))
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp" || event.key === "w") {
        setBoard(updateBoardArray(board, "Up"));
      } else if (event.key === "ArrowDown" || event.key === "s") {
        setBoard(updateBoardArray(board, "Down"));
      } else if (event.key === "ArrowLeft" || event.key === "a") {
        setBoard(updateBoardArray(board, "Left"));
      } else if (event.key === "ArrowRight" || event.key === "d") {
        setBoard(updateBoardArray(board, "Right"));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <>
      <Board boardArray={board} />
      <button onClick={() => setBoard(TestButton(board))}>Test</button>
    </>
  );
}

export default App;
