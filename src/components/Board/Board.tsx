import React, { useCallback, useEffect, useState } from "react";
import { BoardInfo } from "../BoardInfo";
import {
  calculateDraw,
  calculateWinner,
  predictDrawOrWinner,
} from "../helpers";
import { Modal } from "../Modal";
import { NewPlayersForm } from "../NewPlayersForm";
import { Square } from "../Square/Square";
import "./Board.scss";

export const Board: React.FC = () => {
  const [squares, setSquares] = useState<string[]>(Array(9).fill(" "));
  const [isXNext, setIsXNext] = useState(true);
  const [score, setScore] = useState([0, 0]);
  const [players, setPlayers] = useState(["Player1", "Player2"])
  const [showModal, setShowModal] = useState(true);

  const [winner, winLine] = calculateWinner(squares) || [null, null];
  const draw = winner ? null : calculateDraw(squares);

  let status: string;
  const nextPlayer = isXNext ? players[0] : players[1];
  
  const predict = predictDrawOrWinner(squares, nextPlayer);

  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + nextPlayer;
  }

  const setNewScore = () => {
    const newScore = score.slice();
    
    if ((winner && winner === players[0])
      || (!winner && predict === "winNextPlayer")) {
      newScore[0] = score[0] + 1;
    } 

    if (winner && winner === players[1]) {
      newScore[1] = score[1] + 1;
    }

    setScore(newScore);
  };

  if (!winner && predict === "winNextPlayer") {
    status = "Winner: " + nextPlayer;
  }

  if (draw || (!winner && predict === "draw")) {
    status = "Draw!";
  }

  const handleClick = useCallback((i: number) => {
    const newSquares = squares.slice();

    if (calculateWinner(newSquares) || newSquares[i] !== " ") {
      return;
    }
    
    newSquares[i] = isXNext ? players[0] : players[1];

    setSquares(newSquares);
    setIsXNext(!isXNext);
  }, [isXNext, players, squares]);

  const handleNewGame = () => {
    if (!winner
      && squares.includes(" ")
      && predict === "winNextPlayer") {
      setNewScore();
    }

    setSquares(Array(9).fill(" "));
    setIsXNext(true);
  };

  useEffect(() => {
    if (winner) {
      setNewScore();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winner]);

  return (
    <>
      <section className="board">
        <div className="board__grid">
          {squares.map((square, index) => (
            <Square
              square={square}
              handleClick={() => handleClick(index)}
              players={players}
              key={index}
            />
          ))}

          {/* edge between squares */}
          <div className="board__edge"></div>
          <div className="board__edge board__edge--2" />
          <div className="board__edge board__edge--3" />
          <div className="board__edge board__edge--4" />
          
          {/* strikethrogh win line */}
          <div className={`board__winLine board__winLine--${winLine}`} />
        </div>
        <BoardInfo
          status={status}
          players={players}
          score={score}
          handleNewGame={handleNewGame}
        />
      </section>
      
      <Modal show={showModal}>
        <NewPlayersForm
          players={players}
          setPlayers={setPlayers}
          setShowModal={setShowModal}
        />
      </Modal>
    </>
  );
};