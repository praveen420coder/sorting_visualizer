import React from "react";
import "./navbar.css";
/**
 * @author
 * @function Algorithms
 **/

const Algorithms = (props) => {
  const algorithms = [
    { value: 1, type: "Bubble Sort" },
    { value: 2, type: "Selection Sort" },
    { value: 3, type: "Insertion Sort" },
    { value: 4, type: "Merge Sort" },
    { value: 5, type: "Quick Sort" },
    { value: 6, type: "Heap Sort" },
    { value: 7, type: "Twist Sort" },
  ];
  return (
    <span className="options">
      <select
        name="Algorithm"
        id="menu"
        className="algo-menu"
        onChange={(e) => props.onChange(e.target.value, "algo")}
      >
        {algorithms.map((element) => (
          <option key={element.value} value={element.value}>
            {element.type}
          </option>
        ))}
      </select>
    </span>
  );
};

export default Algorithms;
