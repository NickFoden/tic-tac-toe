import React, { Component } from "react";

const BoardFooter = props => {
  return (
    <div>
      <br />
      {props.currentUser ? (
        <div>
          The Computer will go first
          <br />
          <button>start</button>
        </div>
      ) : (
        "Waiting on you . . ."
      )}
      <br />
      {props.currentUser ? (
        <button onClick={() => props.toggleComputer()}>
          You first this time?
        </button>
      ) : (
        <button onClick={() => props.toggleComputer()}>
          Or Computer first this time?
        </button>
      )}
      <br />
      <br />
      <button onClick={() => props.reset()}> Reset the game</button>
      <br />
    </div>
  );
};

export default BoardFooter;
