import React, { Component } from "react";

const Square = props => {
  return (
    <div
      className={`square ${props.value ? props.value : "unclaimed"}`}
      onClick={() => props.onSelect(props.index)}
    >
      {props.value ? props.value : props.index}
    </div>
  );
};

export default Square;
