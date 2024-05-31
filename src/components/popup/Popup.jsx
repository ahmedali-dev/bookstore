import React from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
const Popup = ({ children, close, ...props }) => {
  return (
    <div className={["popup-container", ...(props.classNames ?? [])].join(" ")}>
      <div className="popup-container__close" {...close}>
        <FontAwesomeIcon icon={faClose} />
      </div>
      <div className="popup-container__content">{children}</div>
    </div>
  );
};

export default Popup;
