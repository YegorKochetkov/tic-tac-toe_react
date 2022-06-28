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
  // is last turn left?
  const isLastTurn = squares.filter((square) => square === " ").length === 1;
  let predict = "";

  if (isLastTurn) {
    const indexOfLastTurn = squares.indexOf(" ");

    for (let i = 0; i < winLines.length; i++) {
      if (winLines[i].includes(indexOfLastTurn)) { // find lines with last turn
        const turns = winLines[i]
          .filter((turn) => turn !== indexOfLastTurn); // find indexes of turns in line with last turn

        if (squares[turns[0]] !== squares[turns[1]]) { // if turns are different - the last turn does not matter
          predict = "draw";
        }

        if (squares[turns[0]] === squares[turns[1]]) { // if turns is the same, but last turn will be taken by 
          predict = squares[turns[0]] !== nextPlayer   // another player - the last turn does not matter
            ? "draw"
            : "winNextPlayer";

          if (predict === "winNextPlayer") { // return cause other lines can be draw
            return predict;
          }
        }
      }
    }
  }

  return predict;
}
