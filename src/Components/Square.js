import React, { Component } from "react";

const Square = props => {
  return (
    <div className="square" onClick={() => props.onSelect(props.index)}>
      {props.value}
    </div>
  );
};

export default Square;
