module.exports = function solveSudoku(matrix) {
  const getColumn = (array, indexColumn) => array.map(item => item[indexColumn]);

  const getSquare = (indexRow, indexColumn, array) => {
    const startRow = Math.floor(indexRow / 3) * 3;
    const startColumn = Math.floor(indexColumn / 3) * 3;
    const squareValues = [];
    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        squareValues.push(array[startRow + i][startColumn + j]);
      }
    }
    return squareValues;
  };

  const findEmptyCell = (array) => {
    for (let i = 0; i < 9; i += 1) {
      for (let j = 0; j < 9; j += 1) {
        if (array[i][j] === 0) {
          return [i, j];
        }
      }
    }
    return false;
  };

  const solution = (puzzle) => {
    const sudoku = puzzle;
    if (!findEmptyCell(sudoku)) {
      return sudoku;
    }

    const [row, column] = findEmptyCell(sudoku);
    for (let item = 1; item < 10; item += 1) {
      const itemsRow = sudoku[row];
      const itemsColumn = getColumn(sudoku, column);
      const itemsSquare = getSquare(row, column, sudoku);
      if (!itemsRow.includes(item) && !itemsColumn.includes(item) && !itemsSquare.includes(item)) {
        sudoku[row][column] = item;
        if (solution(sudoku)) {
          return sudoku;
        }
        sudoku[row][column] = 0;
      }
    }
    return false;
  };

  return solution(matrix);
};
