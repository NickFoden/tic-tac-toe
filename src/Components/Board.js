import React, { Component } from "react";
import BoardFooter from "./BoardFooter";
import Computer from "./Computer";
import Square from "./Square";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: new Array(9).fill(""),
      computerFirst: false,
      computerSymbol: "O",
      currentMoveHuman: true,
      gameOver: false,
      gameUnderway: false,
      next: true,
      move: "X",
      winner: ""
    };
    this.assignMove = this.assignMove.bind(this);
  }

  assignMove = index => {
    let move = "";
    let updatedBoard = this.state.board;
    let nextMove = this.state.currentMoveHuman;
    if (this.state.gameOver === true || updatedBoard[index] !== "") {
      return;
    }
    if (updatedBoard[index] === "") {
      updatedBoard[index] = this.state.move;
    }
    if (this.state.move === "X") {
      move = "Y";
    } else if (this.state.move === "Y") {
      move = "X";
    }
    this.setState({
      board: updatedBoard,
      currentMoveHuman: !this.state.currentMoveHuman,
      move
    });
  };
  boardReset = () => {
    this.setState({
      board: new Array(9).fill(""),
      gameOver: false,
      gameUnderway: false,
      winner: ""
    });
  };
  computerMove = id => {
    this.assignMove(id);
  };
  declareWinner = id => {
    this.setState({
      winner: id,
      gameOver: true,
      gameUnderway: false
    });
  };
  gradeTheGame = () => {
    if (this.state.gameOver === true) {
      return null;
    }
    let aWin = false;
    let id = "";
    const boardArray = this.state.board;
    // let root = Math.sqrt(boardArray.length);
    // let check = "m";
    // for (let i = 0; i < boardArray.length; i++) {
    //   if (boardArray[i] !== "") {
    //     check = boardArray[i];
    //   }
    // }
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        boardArray[a] &&
        boardArray[a] === boardArray[b] &&
        boardArray[a] === boardArray[c]
      ) {
        console.log("Winner");
        aWin = true;
        id = boardArray[a];
      }
    }
    if (aWin !== true) {
      return null;
    } else if (aWin === true) {
      this.declareWinner(id);
    }
  };

  grids = board => {
    let finalString = "1fr";
    const depth = Math.sqrt(board.length);
    for (let i = 1; i < depth; i++) {
      finalString += " 1fr";
    }
    return finalString;
  };
  renderBoard = board => {
    console.log(board);
    return board.map((item, index) => {
      return (
        <Square
          onSelect={() => this.assignMove(index)}
          key={index}
          value={item}
        />
      );
    });
  };
  toggleUser = () => {
    if (this.state.computerFirst !== true) {
      this.setState({
        computerFirst: true,
        computerSymbol: "X"
      });
    } else {
      this.setState({
        computerFirst: false,
        computerSymbol: "O"
      });
    }
  };

  render() {
    {
      this.gradeTheGame();
    }
    return (
      <div>
        <h1>This is a board</h1>
        {this.state.winner}
        <div
          className="boardContainer"
          style={{
            display: "grid",
            gridTemplateColumns: this.grids(this.state.board)
          }}
        >
          {this.renderBoard(this.state.board)}
        </div>

        <BoardFooter
          reset={() => this.boardReset()}
          currentUser={this.state.computerFirst}
          toggleComputer={() => this.toggleUser()}
        />
        <Computer
          board={this.state.board}
          selectMove={id => this.computerMove(id)}
          currentMove={this.state.currentMoveHuman}
          gameOver={this.state.gameOver}
        />
      </div>
    );
  }
}

export default Board;
