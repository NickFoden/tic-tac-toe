import React, { Component } from "react";
import { setTimeout } from "timers";
import ComputerOptions from "./ComputerOptions";

const Computer = props => {
  var openOptions = [];
  const { currentMove, gameOver } = props;
  const makeMove = (props, options) => {
    const { board, selectMove } = props;

    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        options.push(i);
      }
    }
    openOptions = options;
    let final = options[Math.floor(Math.random() * options.length)];
    selectMove(final);
    // console.log(options + " first options");
  };

  if (gameOver === true) {
    return <h1> Good Game Chap</h1>;
  } else if (currentMove !== true && gameOver === false) {
    var options = [];
    setTimeout(() => {
      makeMove(props, options);
    }, 5000);

    return <ComputerOptions moves={openOptions} />;
  } else {
    return null;
  }
};

export default Computer;
