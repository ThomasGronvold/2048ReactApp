const updateBoardArray = (boardArray: (null | number)[][], direction: string) => {
  const newBoardArray: (null | number)[][] = JSON.parse(JSON.stringify(boardArray));
  const rows: number = newBoardArray.length;
  const cols: number = newBoardArray[0].length;
  console.log(direction);

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      /* Move Down */
      if (direction === "Down" && x < rows - 1) {
        down(newBoardArray, y, rows);
        mergeDown(newBoardArray, y, rows);
      } else if (direction === "Up" && x > 0) {
        /* Move Up */
        up(newBoardArray, y, rows);
        mergeUp(newBoardArray, y, rows);
      } else if (direction === "Right" && y < cols - 1) {
        /* Move Right */
        right(newBoardArray, x, cols);
        mergeRight(newBoardArray, x, cols);
      } else if (direction === "Left" && y > 0) {
        /* Move Left */
        left(newBoardArray, x, cols);
        mergeLeft(newBoardArray, x, cols);
      }
    }
  }
  console.log("Boardarray: ", boardArray, "NewBoardArray: ", newBoardArray);

  if (!arraysEqual(boardArray,  newBoardArray) ) {
    addNum(newBoardArray); /* Adds a number (2 / 4 ) in a random cell (if available), 10% chance for a 4 to spawn */
  }

  return newBoardArray;
};

const down = (newBoardArray, y, rows) => {
  for (let x = rows - 2; x >= 0; x--) {
    if (newBoardArray[x][y] !== null) {
      let newX = x + 1;

      while (newX < rows && newBoardArray[newX][y] === null) {
        newBoardArray[newX][y] = newBoardArray[newX - 1][y];
        newBoardArray[newX - 1][y] = null;
        newX++;
      }
    }
  }
};

const up = (newBoardArray, y, rows) => {
  for (let x = 1; x < rows; x++) {
    if (newBoardArray[x][y] !== null) {
      let newX = x - 1;
      while (newX >= 0 && newBoardArray[newX][y] === null) {
        newBoardArray[newX][y] = newBoardArray[newX + 1][y];
        newBoardArray[newX + 1][y] = null;
        newX--;
      }
    }
  }
};

const right = (newBoardArray, x, cols) => {
  for (let y = cols - 2; y >= 0; y--) {
    if (newBoardArray[x][y] !== null) {
      let newY = y + 1;
      while (newY < cols && newBoardArray[x][newY] === null) {
        newBoardArray[x][newY] = newBoardArray[x][newY - 1];
        newBoardArray[x][newY - 1] = null;
        newY++;
      }
    }
  }
};

const left = (newBoardArray, x, cols) => {
  for (let y = 1; y < cols; y++) {
    if (newBoardArray[x][y] !== null) {
      let newY = y - 1;
      while (newY >= 0 && newBoardArray[x][newY] === null) {
        newBoardArray[x][newY] = newBoardArray[x][newY + 1];
        newBoardArray[x][newY + 1] = null;
        newY--;
      }
    }
  }
};

const mergeDown = (newBoardArray, y, rows) => {
  for (let x = rows - 2; x >= 0; x--) {
    const newX = x + 1;
    if (newBoardArray[x][y] !== null && newBoardArray[x][y] === newBoardArray[newX][y]) {
      newBoardArray[newX][y] = newBoardArray[newX][y] * 2;
      newBoardArray[x][y] = null;
    }
  }
};

const mergeUp = (newBoardArray, y, rows) => {
  for (let x = 1; x < rows; x++) {
    const newX = x - 1;
    if (newBoardArray[x][y] !== null && newBoardArray[x][y] === newBoardArray[newX][y]) {
      newBoardArray[newX][y] = newBoardArray[newX][y] * 2;
      newBoardArray[x][y] = null;
    }
  }
};

const mergeRight = (newBoardArray, x, cols) => {
  for (let y = cols - 2; y >= 0; y--) {
    const newY = y + 1;
    if (newBoardArray[x][y] !== null && newBoardArray[x][y] === newBoardArray[x][newY]) {
      newBoardArray[x][newY] = newBoardArray[x][newY] * 2;
      newBoardArray[x][y] = null;
    }
  }
};

const mergeLeft = (newBoardArray, x, cols) => {
  for (let y = 1; y < cols; y++) {
    const newY = y - 1;
    if (newBoardArray[x][y] !== null && newBoardArray[x][y] === newBoardArray[x][newY]) {
      newBoardArray[x][newY] = newBoardArray[x][newY] = newBoardArray[x][newY] * 2;
      newBoardArray[x][y] = null;
    }
  }
};

const addNum = (newBoardArray) => {
  const emptyCellArray = newBoardArray.flatMap((row, x) => {
    return row
      .map((cell, y) => ({
        isEmpty: cell === null,
        coordinates: { x, y },
      }))
      .filter((cellInfo) => cellInfo.isEmpty);
  });

  const randomCellIndex = Math.floor(Math.random() * emptyCellArray.length);
  const randomCell = emptyCellArray[randomCellIndex];
  const { x, y } = randomCell.coordinates;
  const cellValue = Math.random() < 0.9 ? 2 : 4;

  newBoardArray[x][y] = cellValue;
};

export { updateBoardArray };
