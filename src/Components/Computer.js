import React, { Component } from "react";
import { setTimeout } from "timers";
import ComputerOptions from "./ComputerOptions";

const Computer = props => {
  var openOptions = [];
  const { currentMove, gameOver } = props;
  //countdown clock tbd
  // const startClock = () => {};

  const makeMove = (props, options) => {
    const { board, selectMove } = props;

    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        options.push(i);
      }
    }
    openOptions = options;
    console.log("Computer has options: " + openOptions);
    let final = options[Math.floor(Math.random() * options.length)];
    selectMove(final);
    console.log("Computer picks: " + final);
  };

  if (gameOver === true) {
    console.log(props.computerSymbol);
    return <h1 className="winning-h1-message"> Good Game</h1>;
  } else if (currentMove !== true && gameOver === false) {
    var options = [];
    // startClock();
    setTimeout(() => {
      makeMove(props, options);
    }, 1000);

    return null;
  } else {
    return null;
  }
};

export default Computer;
