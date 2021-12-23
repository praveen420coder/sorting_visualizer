import React from "react";
import "./navbar.css";
/**
 * @author
 * @function Speed
 **/

const Speed = (props) => {
  const speeds = [0.5, 0.75, 1.0, 2.0, 4.0];
  return (
    <span className="options">
      <select
        name="Algorithm"
        id="menu"
        className="speed-menu"
        onChange={(e) => props.onChange(e.target.value, "speed")}
      >
        {speeds.map((element) => (
          <option key={element} value={element}>
            {element}x
          </option>
        ))}
      </select>
    </span>
  );
};

export default Speed;
