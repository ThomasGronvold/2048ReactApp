const TestButton = (board) => {
  const newBoardArray = JSON.parse(JSON.stringify(board));
  let start = 2;
  for (let index = 0; index < 4; index++) {
    for (let y = 0; y < 4; y++) {
      newBoardArray[index][y] = null;
    }
  }

  for (let index = 0; index < 3; index++) {
    for (let y = 0; y < (index === 2 ? 3 : newBoardArray[index].length); y++) {
      newBoardArray[index][y] = start;
      // start = start * 2;
    }
  }
  return newBoardArray;
};

export default TestButton;
