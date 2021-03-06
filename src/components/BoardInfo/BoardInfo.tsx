import React from "react";

type Props = {
  status: string,
  players: string[],
  score: number[],
  handleNewGame: () => void,
};

export const BoardInfo: React.FC<Props> = ({
  status,
  players,
  score,
  handleNewGame,
}) => {
  const isNewGame = status.includes("Winner") || status.includes("Draw");

  return (
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
      <button
        type="button"
        className="board__new-game-button"
        onClick={handleNewGame}
        disabled={!isNewGame}
      >
        New game
      </button>
    </div>
  );
};