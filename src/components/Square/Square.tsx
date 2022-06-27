import React from "react";
import "./Square.scss";
import classNames from "classnames";

type Props = {
  square: string,
  handleClick: () => void,
  players: string[],
};

export const Square: React.FC<Props> = ({
  square,
  handleClick,
  players,
}) => {
  return (
    <div onClick={handleClick} className="square">
      <div className={classNames({
        "square__x": square === players[0],
        "square__o": square === players[1],
        })}
      />
    </div>
  );
};