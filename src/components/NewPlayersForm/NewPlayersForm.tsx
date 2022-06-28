import React from "react";
import { useFormik } from "formik";
import "./NewPlayersForm.scss";

type Props = {
  players: string[],
  setPlayers: React.Dispatch<React.SetStateAction<string[]>>,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
}

export const NewPlayersForm: React.FC<Props> = ({
  players,
  setPlayers,
  setShowModal,
}) => {
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

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="form"
    >
      <p className="form__title">
        Please, enter players  game:
      </p>
      <label htmlFor="player1">
        Player 1: 
      </label>
      <input
        id="player1"
        name="player1"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.player1}
        className="form__input"
      />

      <label htmlFor="player2">
        Player 2: 
      </label>
      <input
        id="player2"
        name="player2"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.player2}
        className="form__input"
      />

      <button
        type="submit"
        className="form__submit"
      >
        Start
      </button>
    </form>
  );
};