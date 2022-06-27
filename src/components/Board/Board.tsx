import { useFormik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { calculateDraw, calculateWinner } from "../helpers";
import { Modal } from "../Modal";
import { Square } from "../Square/Square";
import "./Board.scss";

export const Board: React.FC = () => {
  const [squares, setSquares] = useState<string[]>(Array(9).fill(" "));
  const [isXNext, setIsXNext] = useState(true);
  const [score, setScore] = useState([0, 0]);
  const [players, setPlayers] = useState(["Player1", "Player2"])
  const [showModal, setShowModal] = useState(true);

  const winner = calculateWinner(squares);
  const draw = calculateDraw(squares);
  let status;

  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (isXNext ? players[0] : players[1]);
  }

  const handleClick = (i: number) => {
    const newSquares = squares.slice();

    if (calculateWinner(newSquares) || newSquares[i] !== " ") {
      return;
    }
    
    newSquares[i] = isXNext ? players[0] : players[1];

    setSquares(newSquares);
    
    if (calculateDraw(newSquares)) {
      console.log(calculateDraw(newSquares), "h")
      setShowModal(true);
    }

    setIsXNext(!isXNext);
  }

  const formik = useFormik({
     initialValues: {
       player1: "",
       player2: "",
     },
     onSubmit: (values) => {
      const newPlayers = players.slice();
      
      //set default name if no enter names
      newPlayers[0] = values.player1.trim() || newPlayers[0];
      newPlayers[1] = values.player2.trim() || newPlayers[1];

      //check for same entered names
      newPlayers[1] = newPlayers[0] === newPlayers[1]
      ? newPlayers[1] + "2"
      : newPlayers[1];

      setPlayers(newPlayers);
      setShowModal(false);
     },
   });

  const setNewScore = useCallback(() => {
    const newScore = score.slice();

    if (winner === players[0]) {
      newScore[0] = score[0] + 1;
    } 

    if (winner === players[1]) {
      newScore[1] = score[1] + 1;
    }

    setScore(newScore);
    setSquares(Array(9).fill(" "));
    setIsXNext(true);
  }, [players, score, winner]);

  useEffect(() => {
    if (winner) {
      setNewScore();
    }
  }, [setNewScore, winner]);

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
          <div className="board__edge"></div>
          <div className="board__edge board__edge--2"></div>
          <div className="board__edge board__edge--3"></div>
          <div className="board__edge board__edge--4"></div>
        </div>
        <div className="board__info">
          <p className="board__title">
            {status}
          </p>
          <p className="board__title">
            Score
          </p>
          <p className="board__title">
            {players[0]}: {score[0]}
          </p>
          <p className="board__title">
            {players[1]}: {score[1]}
          </p>
        </div>
      </section>
      <Modal show={showModal}>
        <p>Please, enter players  game:</p>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="player1">First Name</label>
          <input
            id="player1"
            name="player1"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.player1}
          />
    
          <label htmlFor="player2">Last Name</label>
          <input
            id="player2"
            name="player2"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.player2}
          />
    
          <button type="submit">Submit</button>
          {draw && (
            <button>Reset</button>
          )}
        </form>
      </Modal>
    </>
  );
};