import React, { Component } from "react";

const History = props => {
  return (
    <div className="history-container">
      <div>
        <label>HAL has won:</label>
        <p>{props.winsComputer}</p>
      </div>
      <div>
        <label>You have won:</label>
        <p>{props.winsPerson}</p>
      </div>
    </div>
  );
};

export default History;
