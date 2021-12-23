import React from "react";
import "./navbar.css";
/**
 * @author
 * @function Size
 **/

const Size = (length) => {
  const lengths = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  return (
    <span className="options">
      <select
        name="size"
        id="menu"
        className="size-menu"
        onChange={(e) => length.onChange(e.target.value, "size")}
      >
        {lengths.map((element) => (
          <option key={10 * element} value={element}>
            {element}
          </option>
        ))}
      </select>
    </span>
  );
};

export default Size;
