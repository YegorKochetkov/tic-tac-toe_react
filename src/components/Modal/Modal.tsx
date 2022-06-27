import classNames from "classnames";
import React from "react";
import './Modal.scss';

type Props = {
  show: boolean,
  children: React.ReactNode,
};

export const Modal: React.FC<Props> = ({ show, children }) => {
  return (
    <div className={classNames(
      "modal",
      {"modal--show": show}
      )}
    >
      <section className="modal__content">
        {children}
      </section>
    </div>
  );
};