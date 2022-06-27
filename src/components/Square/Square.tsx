import React from "react";
import "./Square.scss";
import classNames from "classnames";

type Props = {
  square: string,
  handleClick: () => void,
};

export const Square: React.FC<Props> = ({ square, handleClick }) => {
  return (
    <div onClick={handleClick} className="square">
      <div className={classNames(
        "square__content", {
        "square__x": square === "x",
        "square__o": square === "o"
        })}
      >
        {square}
      </div>
    </div>
  );
};