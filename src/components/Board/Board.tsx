import React, { useState } from "react";
import { calculateWinner } from "../helpers";
import { Square } from "../Square/Square";
import "./Board.scss";

export const Board: React.FC = () => {
  const [squares, setSquares] = useState<string[]>(Array(9).fill(" "));
  const [isXNext, setIsXNext] = useState(true);

  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (isXNext ? 'X' : 'O');
  }

  const handleClick = (i: number) => {
    const newSquares = squares.slice();

    if (calculateWinner(newSquares) || newSquares[i] !== " ") {
      return;
    }

    newSquares[i] = isXNext ? 'x' : 'o';

    setSquares(newSquares);
    setIsXNext(!isXNext);
  }

  return (
    <section className="board">
      <h1 className="board__title">{status}</h1>
      <div className="board__grid">
        {squares.map((square, index) => (
          <Square
            square={square}
            handleClick={() => handleClick(index)}
            key={index}
          />
        ))}
        <div className="board__edge"></div>
        <div className="board__edge board__edge--2"></div>
        <div className="board__edge board__edge--3"></div>
        <div className="board__edge board__edge--4"></div>
      </div>
    </section>
  );
};