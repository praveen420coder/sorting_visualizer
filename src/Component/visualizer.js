import React, { useEffect, useState } from "react";
import Frame from "./Frame/frame";
import Generator from "./Middleware/generator";
import { getKeysCopy } from "./Middleware/keys";
import Navbar from "./navbar/navbar";
import { bubbleSort } from "./algorithms/bubbleSort.js";
import { insertionSort } from "./algorithms/insertionSort.js";
import { selectionSort } from "./algorithms/selectionSort.js";
import { mergeSort } from "./algorithms/mergeSort.js";
import { quickSort } from "./algorithms/quickSort.js";
import { heapSort } from "./algorithms/heapSort.js";
import { twistSort } from "./algorithms/twistSort.js";
import {
  ALGORITHM,
  SPEED,
  SIZE,
  SWAP,
  CURRENT,
  NORMAL,
  DONE,
} from "./Middleware/constants";
import pause from "./Middleware/pause";
import Footer from "./footer";

/**
 * @author
 * @function Visualizer
 **/

const Visualizer = (props) => {
  const [list, setList] = useState([]);
  const [size, setSize] = useState(10);
  const [speed, setSpeed] = useState(1);
  const [algorithm, setAlgorithm] = useState(1);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    generateRandomArray();
  }, []);

  useEffect(() => {
    onChange();
    generateRandomArray();
  }, [list, size, speed, algorithm, running]);

  const onChange = (value, option) => {
    if (option === ALGORITHM && !running) {
      setAlgorithm(Number(value));
    } else if (option === SPEED) {
      setSpeed(Number(value));
    } else if (option === SIZE && !running) {
      setSize(Number(value));
      generateRandomArray();
    }
  };

  const generateRandomArray = (value = 0) => {
    if ((list.length !== size && !running) || Number(value) === 1) {
      setList(Generator(size));
    }
  };

  const start = async () => {
    lock(true);
    console.log(list);
    let moves = await getMoves(algorithm);
    await visualizeMoves(moves);
    await done();
    lock(false);
  };

  const visualizeMoves = async (moves) => {
    if (moves.length === 0) {
      return;
    }
    if (moves[0].length === 4) {
      await visualizeMovesInRange(moves);
    } else {
      await visualizeMovesBySwapping(moves);
    }
  };

  const visualizeMovesInRange = async (Moves) => {
    let prevRange = [];
    while (Moves.length > 0 && Moves[0].length === 4) {
      // change range only when required to avoid blinking
      if (prevRange !== Moves[0][3]) {
        await updateElementClass(prevRange, NORMAL);
        prevRange = Moves[0][3];
        await updateElementClass(Moves[0][3], CURRENT);
      }
      await updateElementValue([Moves[0][0], Moves[0][1]]);
      Moves.shift();
    }
    await visualizeMoves(Moves);
  };

  const visualizeMovesBySwapping = async (Moves) => {
    while (Moves.length > 0) {
      let currMove = Moves[0];
      console.log(currMove);
      // if container doesn't contains 3 elements then return
      if (currMove.length !== 3) {
        await visualizeMoves(Moves);
        return;
      } else {
        let indexes = [currMove[0], currMove[1]];
        await updateElementClass(indexes, CURRENT);
        if (currMove[2] === SWAP) {
          await updateList(indexes);
        }
        await updateElementClass(indexes, NORMAL);
      }
      Moves.shift();
    }
  };
  const getMoves = async (Name) => {
    let moves = [];
    let array = await getKeysCopy(list, size);
    if (Name === 1) {
      moves = await bubbleSort(array, array.length);
    }
    if (Name === 2) {
      moves = await selectionSort(array, array.length);
    }
    if (Name === 3) {
      moves = await insertionSort(array, array.length);
    }
    if (Name === 4) {
      moves = await mergeSort(array, array.length);
    }
    if (Name === 5) {
      moves = await quickSort(array, array.length);
    }
    if (Name === 6) {
      moves = await heapSort(array, array.length);
    }
    if (Name === 7) {
      moves = await twistSort(array, array.length);
    }
    return moves;
  };
  const updateList = async (indexes) => {
    let array = [...list];
    console.log(array);
    let stored = array[indexes[0]].key;
    console.log(stored);
    array[indexes[0]].key = array[indexes[1]].key;
    array[indexes[1]].key = stored;
    await updateStateChanges(array);
  };

  // update value of list element
  const updateElementValue = async (indexes) => {
    let array = [...list];
    array[indexes[0]].key = indexes[1];
    await updateStateChanges(array);
  };

  // update classType of list element
  const updateElementClass = async (indexes, classType) => {
    let array = [...list];
    for (let i = 0; i < indexes.length; ++i) {
      array[indexes[i]].classType = classType;
    }
    await updateStateChanges(array);
  };

  // Updating the state attribute list every time on modification
  const updateStateChanges = async (newList) => {
    setList(newList);
    await pause(speed);
  };
  const lock = (status) => {
    setRunning(Boolean(status));
  };

  // Mark list as done
  const done = async () => {
    let indexes = [];
    for (let i = 0; i < size; ++i) {
      indexes.push(i);
    }
    await updateElementClass(indexes, DONE);
  };

  // For responsive navbar
  const response = () => {
    let Navbar = document.querySelector(".navbar");
    if (Navbar.className === "navbar") Navbar.className += " responsive";
    else Navbar.className = "navbar";
  };

  return (
    <div>
      <Navbar
        start={start}
        response={response}
        onChange={onChange}
        newList={generateRandomArray}
      />
      <Frame list={list} />
      <Footer />
    </div>
  );
};

export default Visualizer;
