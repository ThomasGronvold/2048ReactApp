const TestButton = (board) => {
  const newBoardArray = JSON.parse(JSON.stringify(board));
  let start = 1024;
  for (let index = 0; index < 4; index++) {
    for (let y = 0; y < 4; y++) {
      newBoardArray[index][y] = null;
    }
  }

  for (let index = 0; index < 4; index++) {
    const range = (index === 2 ? 3 : newBoardArray[index].length)
    for (let y = 0; y < 4; y++) {
      newBoardArray[index][y] = start;

      
      // start = start * 2;

      // 3 in a row
      // if (index === 2 && y === 3 || index === 2 && y === 1 || index === 2 &&  y === 2 ) {
      //   newBoardArray[index][y] = 2
      // }

      // 3 in a row (Left side)
      // if (index === 1 && y === 0 || index === 1 && y === 1 || index === 1 &&  y === 2 ) {
      //   newBoardArray[index][y] = 2
      // }

      // 3 in a column (Right side)
      // if (index === 1 && y === 1 || index === 2 && y === 1 || index === 3 &&  y === 1 ) {
      //   newBoardArray[index][y] = 2
      // }

    }
  }
  return newBoardArray;
};

export default TestButton;
