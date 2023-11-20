/* Enums */
enum Direction {
  Up = "Up",
  Down = "Down",
  Left = "Left",
  Right = "Right",
}

/* Types */
type BoardArray = (null | number)[][];

/* Variables */
const SPAWN_CHANCE = 0.9;
const MAX_TILE_VALUE = 2048;
let gameOver: boolean = false;

const updateBoardArray = (boardArray: BoardArray, direction: string): { newBoardArray: BoardArray; mergedVal: number; maxMergedNumber: number; gameOver: boolean } => {
  /* Variables */
  const newBoardArray: BoardArray = JSON.parse(JSON.stringify(boardArray));
  const ROWS: number = newBoardArray.length;
  const COLS: number = newBoardArray[0].length;

  let mergedVal: number = 0;
  let maxMergedNumber: number = 0;

  for (let x: number = direction === "Down" ? ROWS - 1 : 0; direction === "Down" ? x >= 0 : x < ROWS; direction === "Down" ? x-- : x++) {
    for (let y: number = direction === "Right" ? COLS - 1 : 0; direction === "Right" ? y >= 0 : y < COLS; direction === "Right" ? y-- : y++) {
      /* Move Down */
      if (direction === Direction.Down && x < ROWS - 1) {
        moveDown(newBoardArray, y, ROWS);
        const DOWNMERGEVAL: number = mergeDown(newBoardArray, y, x);
        mergedVal += DOWNMERGEVAL;
        if (DOWNMERGEVAL > maxMergedNumber) {
          maxMergedNumber = DOWNMERGEVAL;
        }
      } else if (direction === Direction.Up && x >= 0) {
        /* Move Up */
        moveUp(newBoardArray, y, ROWS);
        const UPMERGEVAL: number = mergeUp(newBoardArray, y, x);
        mergedVal += UPMERGEVAL;
        if (UPMERGEVAL > maxMergedNumber) {
          maxMergedNumber = UPMERGEVAL;
        }
      } else if (direction === Direction.Right && y < COLS - 1) {
        /* Move Right */
        moveRight(newBoardArray, x, COLS);
        const RIGHTMERGEVAL: number = mergeRight(newBoardArray, x, y);
        mergedVal += RIGHTMERGEVAL;
        if (RIGHTMERGEVAL > maxMergedNumber) {
          maxMergedNumber = RIGHTMERGEVAL;
        }
      } else if (direction === Direction.Left && y >= 0) {
        /* Move Left */
        moveLeft(newBoardArray, x, COLS);
        const LEFTMERGEVAL: number = mergeLeft(newBoardArray, x, y);
        mergedVal += LEFTMERGEVAL;
        if (LEFTMERGEVAL > maxMergedNumber) {
          maxMergedNumber = LEFTMERGEVAL;
        }
      }
    }
  }

  // Check if the new board is different from the current board, indicating that a move/merge has happend, and if so, add a number.
  if (!arraysEqual(boardArray, newBoardArray)) {
    addNum(newBoardArray); /* Adds a number (2 / 4 ) in a random cell (if available), 10% chance for a 4 to spawn */
    gameOver = checkGameOver(newBoardArray, ROWS, COLS);
  }
  
  return { newBoardArray, mergedVal, maxMergedNumber, gameOver };
};

/**
 * Merges tiles in the specified direction.
 * If the adjacent tile in the specified direction is not null, has not reached
 * the maximum tile value, and has the same value as the current tile,
 * they are merged by doubling the value.
 * @param newBoardArray - The board representing a 2D Array
 * @param y - The column index.
 * @param x - The row index.
 * @param direction - The direction in which tiles are merged (Up, Down, Left, or Right).
 * @returns The value of merged tiles.
 */

const mergeDown = (newBoardArray: BoardArray, y: number, x: number) => {
  let mergedTilesValue: number = 0;

  const NEWX: number = x + 1;
  if (newBoardArray[x][y] !== null && newBoardArray[x][y] !== MAX_TILE_VALUE && newBoardArray[x][y] === newBoardArray[NEWX][y]) {
    newBoardArray[NEWX][y] = newBoardArray[NEWX][y]! * 2;
    newBoardArray[x][y] = null;
    mergedTilesValue += newBoardArray[NEWX][y]!;
  }

  return mergedTilesValue;
};

const mergeUp = (newBoardArray: BoardArray, y: number, x: number) => {
  let mergedTilesValue: number = 0;

  const NEWX: number = x - 1;
  if (NEWX >= 0 && newBoardArray[x][y] !== null && newBoardArray[x][y] !== MAX_TILE_VALUE && newBoardArray[x][y] === newBoardArray[NEWX][y]) {
    newBoardArray[NEWX][y] = newBoardArray[NEWX][y]! * 2;
    newBoardArray[x][y] = null;
    mergedTilesValue += newBoardArray[NEWX][y]!;
  }

  return mergedTilesValue;
};

const mergeRight = (newBoardArray: BoardArray, x: number, y: number) => {
  let mergedTilesValue: number = 0;

  const NEWY: number = y + 1;
  if (newBoardArray[x][y] !== null && newBoardArray[x][y] !== MAX_TILE_VALUE && newBoardArray[x][y] === newBoardArray[x][NEWY]) {
    newBoardArray[x][NEWY] = newBoardArray[x][NEWY]! * 2;
    newBoardArray[x][y] = null;
    mergedTilesValue += newBoardArray[x][NEWY]!;
  }

  return mergedTilesValue;
};

const mergeLeft = (newBoardArray: BoardArray, x: number, y: number) => {
  let mergedTilesValue: number = 0;

  const NEWY: number = y - 1;
  if (NEWY >= 0 && newBoardArray[x][y] !== null && newBoardArray[x][y] !== MAX_TILE_VALUE && newBoardArray[x][y] === newBoardArray[x][NEWY]) {
    newBoardArray[x][NEWY] = newBoardArray[x][NEWY]! * 2;
    newBoardArray[x][y] = null;
    mergedTilesValue += newBoardArray[x][NEWY]!;
  }

  return mergedTilesValue;
};

/**
 * Moves tiles in the specified direction.
 * Stops moving tiles if the moved tile hits another tile or the wall in the specified direction.
 * @param newBoardArray - The board representing a 2D Array.
 * @param y - The column index.
 * @param x - The row index.
 * @param direction - The direction in which tiles are moved (Up, Down, Left, or Right).
 */
const moveDown = (newBoardArray: BoardArray, y: number, ROWS: number) => {
  for (let x: number = ROWS - 2; x >= 0; x--) {
    if (newBoardArray[x][y] !== null) {
      let newX: number = x + 1;
      while (newX < ROWS && newBoardArray[newX][y] === null) {
        newBoardArray[newX][y] = newBoardArray[newX - 1][y];
        newBoardArray[newX - 1][y] = null;
        newX++;
      }
    }
  }
};

const moveUp = (newBoardArray: BoardArray, y: number, ROWS: number) => {
  for (let x: number = 1; x < ROWS; x++) {
    if (newBoardArray[x][y] !== null) {
      let newX: number = x - 1;
      while (newX >= 0 && newBoardArray[newX][y] === null) {
        newBoardArray[newX][y] = newBoardArray[newX + 1][y];
        newBoardArray[newX + 1][y] = null;
        newX--;
      }
    }
  }
};

const moveRight = (newBoardArray: BoardArray, x: number, COLS: number) => {
  for (let y: number = COLS - 2; y >= 0; y--) {
    if (newBoardArray[x][y] !== null) {
      let newY: number = y + 1;
      while (newY < COLS && newBoardArray[x][newY] === null) {
        newBoardArray[x][newY] = newBoardArray[x][newY - 1];
        newBoardArray[x][newY - 1] = null;
        newY++;
      }
    }
  }
};

const moveLeft = (newBoardArray: BoardArray, x: number, COLS: number) => {
  for (let y: number = 1; y < COLS; y++) {
    if (newBoardArray[x][y] !== null) {
      let newY: number = y - 1;
      while (newY >= 0 && newBoardArray[x][newY] === null) {
        newBoardArray[x][newY] = newBoardArray[x][newY + 1];
        newBoardArray[x][newY + 1] = null;
        newY--;
      }
    }
  }
};

/**
 * Adds a number in a random cell in the board.
 * @param newBoardArray - The board representing a 2D Array.
 */
const addNum = (newBoardArray: BoardArray) => {
  const { x, y } = getRandomEmptyCell(newBoardArray);
  const CELLVALUE: number = Math.random() < SPAWN_CHANCE ? 2 : 4;

  newBoardArray[x][y] = CELLVALUE;
};

/**
 * Finds a random empty cell in the array.
 * @param newBoardArray - The board representing a 2D Array.
 * @returns An object with 'x' and 'y' values for the coordinates of the empty cell.
 */
const getRandomEmptyCell = (newBoardArray: BoardArray) => {
  const EMPTYCELLARRAY = newBoardArray.flatMap((row, x) => {
    return row
      .map((cell, y) => ({
        isEmpty: cell === null,
        coordinates: { x, y },
      }))
      .filter((cellInfo) => cellInfo.isEmpty);
  });

  const RANDOMCELLINDEX: number = Math.floor(Math.random() * EMPTYCELLARRAY.length);
  const { coordinates } = EMPTYCELLARRAY[RANDOMCELLINDEX];

  return coordinates;
};

/**
 * Compares two 2D arrays to check if they are equal.
 * @param boardArray - The first 2D array.
 * @param newBoardArray - The second 2D array.
 * @returns True if the arrays are equal, false otherwise.
 */
const arraysEqual = (boardArray: (number | null)[][], newBoardArray: (number | null)[][]) => {
  for (let i: number = 0; i < boardArray.length; i++) {
    if (!boardArray[i].every((val, y) => val === newBoardArray[i][y])) {
      return false;
    }
  }
  return true;
};

/**
 * Loops through the array and checks if any legal moves are found, if not, then it's game over
 * @param boardArray - The altered 2D array after a valid input has been made
 * @param ROWS - The length of the arrays rows
 * @param COLS - The length of the arrays cols
 * @returns True if the game is over, false otherwise.
 */
const checkGameOver = (boardArray: (number | null)[][], ROWS: number, COLS: number) => {
  for (let x = 0; x < ROWS; x++) {
    for (let y = 0; y < COLS; y++) {
      const currentCell = boardArray[x][y];

      if (boardArray[x][y] === null) {
        return false;
      }

      // Check for adjacent cells with the same value
      if (y < COLS - 1 && currentCell !== MAX_TILE_VALUE && currentCell === boardArray[x][y + 1]) {
        return false;
      }

      // Check bottom neighbor
      if (x < ROWS - 1 && currentCell !== MAX_TILE_VALUE && currentCell === boardArray[x + 1][y]) {
        return false;
      }
    }
  }

  // Game over
  return true;
};

export { updateBoardArray };
