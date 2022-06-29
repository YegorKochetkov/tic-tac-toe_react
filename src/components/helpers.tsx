const winLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function calculateWinner(squares: string[]) {
  for (let i = 0; i < winLines.length; i++) {
    const [a, b, c] = winLines[i];
    if (squares[a] !== " "
    && squares[a] === squares[b]
    && squares[a] === squares[c]) {
      const winLine = i;
      
      return [squares[a], winLine];
    }
  }

  return null;
}

export function calculateDraw(squares: string[]) {
  if (!squares.includes(" ")) {
    return "draw";
  }

  return null;
}

export function predictDrawOrWinner(squares: string[], nextPlayer: string) {
  const emptySquaresIndexes: number[] = [];

  squares.forEach((square, index) => {
    if (square === " ") {
      emptySquaresIndexes.push(index);
    }
  });

  let predict = "";

  // is last turns left?
  if (emptySquaresIndexes.length <= 2) {
    for (let i = 0; i < winLines.length; i++) {

      // find lines with last turn
      if (winLines[i].includes(emptySquaresIndexes[0])
        || winLines[i].includes(emptySquaresIndexes[1])) {

        // find filled square in such line
        const turnsInLine = winLines[i]
          .filter((turn) => turn !== emptySquaresIndexes[0]
            && turn !== emptySquaresIndexes[1]);

        // if only 1 empty square in line and turns are different - the last turn does not matter
        if (emptySquaresIndexes.length === 2
          && turnsInLine.length === 2
          && squares[turnsInLine[0]] !== squares[turnsInLine[1]]) {
          predict = "draw";
        }

        // if only 1 empty square in line and turns are same - the last turn does matter
        if (emptySquaresIndexes.length === 2
          && turnsInLine.length === 2
          && squares[turnsInLine[0]] === squares[turnsInLine[1]]) {

          // return cause other lines can be draw
          return predict = "";
        }

        // if we have only last turn and turns in line are different -
        // the last turn does not matter
        if (emptySquaresIndexes.length === 1
          && squares[turnsInLine[0]] !== squares[turnsInLine[1]]) {
          predict = "draw";
        }

         // if turns is the same, and we have only last turn will be taken by
         // the same player - the last turn does matter
         // if turns is the same, but we have only last turn will be taken by
         // another player - the last turn does not matter
        if (emptySquaresIndexes.length === 1 && squares[turnsInLine[0]] === squares[turnsInLine[1]]) {
          predict = squares[turnsInLine[0]] !== nextPlayer
            ? "draw"
            : nextPlayer;

          if (predict === nextPlayer) {

            // return cause other lines can be draw
            return predict;
          }
        }
      }
    }
  }

  return predict;
}
