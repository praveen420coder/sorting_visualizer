import React from "react";
import Algorithms from "./algorithms";
import "./navbar.css";
import Size from "./size";
import Speed from "./speed";

/**
 * @author
 * @function Navbar
 **/

const Navbar = (props) => {
  const handleClick = (e) => {
    e.preventDefault();
    props.response();
  };
  return (
    <div className="navbar">
      <h3>Sorting Visualizer</h3>
      <button className="btn" id="random" onClick={() => props.newList(1)}>
        Random
      </button>
      <Algorithms onChange={props.onChange} />
      <Size onChange={props.onChange} />
      <Speed onChange={props.onChange} />
      <button className="btn" id="start" onClick={() => props.start()}>
        Start
      </button>
      <a className="icon" onClick={(e) => handleClick(e)} href="/">
        <i className="fa fa-bars"></i>
      </a>
    </div>
  );
};

export default Navbar;
