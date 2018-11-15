import React, { Component } from "react";

const BoardFooter = props => {
  return (
    <div>
      <br />
      {props.currentUser && props.gameStatus === false ? (
        <div>
          The Computer will go first, press start when ready
          <br />
          <button onClick={() => props.startComputer()}>start</button>
        </div>
      ) : (
        ""
      )}
      <br />
      {props.gameStatus === false && (
        <div>
          {props.currentUser ? (
            <button onClick={() => props.toggleComputer()}>
              You first this time?
            </button>
          ) : (
            <button onClick={() => props.toggleComputer()}>
              Computer first this time?
            </button>
          )}
        </div>
      )}

      <button className="reset-button" onClick={() => props.reset()}>
        Reset the game
      </button>
    </div>
  );
};

export default BoardFooter;
