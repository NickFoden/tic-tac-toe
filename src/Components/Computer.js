import React, { Component } from "react";
import { setTimeout } from "timers";

const Computer = props => {
  const { currentMove, gameOver } = props;
  const makeMove = props => {
    const { board, selectMove } = props;
    let options = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        options.push(i);
      }
    }
    let final = options[Math.floor(Math.random() * options.length)];
    selectMove(final);
    return null;
  };

  if (currentMove !== true && gameOver === false) {
    setTimeout(() => {
      makeMove(props);
    }, 5000);
  }

  return null;
};

export default Computer;
