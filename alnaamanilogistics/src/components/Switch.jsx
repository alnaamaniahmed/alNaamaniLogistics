import React from "react";
import "../styles/Switch.css";
import omanFlag from "../images/omanFlag.png";
import ukFlag from "../images/ukFlag.png";

function Switch({ isToggled, onToggle }) {
  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className="switch">
        <img
          src={isToggled ? omanFlag : ukFlag}
          alt="flag"
          className={`flag-icon ${isToggled ? 'left' : 'right'}`}
        />
      </span>
    </label>
  );
}

export default Switch;