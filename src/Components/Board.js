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
    if (this.state.gameUnderway === false) {
      this.setState({
        gameUnderway: true
      });
    }
    if (updatedBoard[index] === "") {
      updatedBoard[index] = this.state.move;
    }
    if (this.state.move === "X") {
      move = "O";
    } else if (this.state.move === "O") {
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
      computerFirst: false,
      computerSymbol: "O",
      currentMoveHuman: true,
      gameOver: false,
      gameUnderway: false,
      next: true,
      move: "X",
      winner: ""
    });
  };
  boardResize = e => {
    e.preventDefault();
    const num = parseInt(e.target.value, 10);
    const finalNum = Math.pow(num, 2);
    if (num < 10) {
      this.setState({
        board: new Array(finalNum).fill("")
      });
    } else {
      if (
        window.confirm(
          `Do you really have time to finish a game w/ ${finalNum} moves ?`
        )
      ) {
        this.setState({
          board: new Array(finalNum).fill("")
        });
        window.alert("Ok hold your horses, just a second");
      } else {
        this.setState({
          board: new Array(9).fill("")
        });
      }
    }
  };
  computerMove = id => {
    this.assignMove(id);
  };
  declareWinner = id => {
    if (id === this.state.computerSymbol) {
      this.setState({
        winner: "Computer takes another one",
        gameOver: true,
        gameUnderway: false
      });
    } else {
      this.setState({
        winner: "You won!",
        gameOver: true,
        gameUnderway: false
      });
    }
  };
  gradeTheGame = () => {
    if (this.state.gameOver === true) {
      return null;
    }
    const boardArray = this.state.board;
    const root = parseInt(Math.sqrt(boardArray.length));
    //start with false for if statement but switch to true at start of grading arrays
    let aWin = false;
    let id = "";
    let diagonalArray = [];
    let diagonalTwoArray = [];
    let horizontalArray = [];
    let verticalArray = [];
    let ultimateAnswerArray = [];

    let current = 0;
    //create the horizontal grading array
    for (let i = 0; i < root; i++) {
      horizontalArray[i] = new Array(root);
      for (let j = 0; j < root; j++) {
        horizontalArray[i][j] = current;
        current++;
      }
    }
    // console.log(horizontalArray);
    //then the vertical
    for (let i = 0; i < root; i++) {
      verticalArray[i] = new Array(root);
      for (let j = 0; j < root; j++) {
        verticalArray[i][j] = horizontalArray[j][i];
      }
    }
    // console.log(verticalArray);
    // then the diagonals
    for (let i = 0; i < 1; i++) {
      for (let j = 0; j < root; j++) {
        diagonalArray[j] = horizontalArray[j][j];
      }
    }
    // console.log(diagonalArray + " Diagonals");
    //Then the second diagonal

    for (let i = 0; i < 1; i++) {
      for (let j = 0; j < root; j++) {
        diagonalTwoArray[j] = horizontalArray[j][root - 1 - j];
      }
    }
    // console.log(diagonalTwoArray + " diagonal two array");

    ultimateAnswerArray.push(
      diagonalArray,
      diagonalTwoArray,
      ...verticalArray,
      ...horizontalArray
    );
    const gradeThisSucker = (ultimateAnswerArray, boardArray) => {
      for (let i = 0; i < ultimateAnswerArray.length; i++) {
        let firstCheck = boardArray[ultimateAnswerArray[i][0]];
        console.log(firstCheck + " first Check and i = " + i);
        if (firstCheck === "X" || firstCheck === "O") {
          let realCheck = firstCheck;
          console.log(realCheck + "  realcheck");
          aWin = true;
          for (let j = 0; j < root; j++) {
            console.log(realCheck + " j equals " + j);
            if (boardArray[ultimateAnswerArray[i][j]] !== realCheck) {
              aWin = false;
              console.log("failed the check + real check " + realCheck);
              return;
            } else {
              aWin = true;
            }
          }
          if (aWin === true) {
            return aWin;
          }
        }
      }
    };
    gradeThisSucker(ultimateAnswerArray, boardArray);
    {
      /*//then grade it after putting all the possible array matches together
    for (let i = 0; i < ultimateAnswerArray.length; i++) {
      let firstCheck = boardArray[ultimateAnswerArray[i][0]];
      for (let j = 0; j < root; j++) {
        if (boardArray[ultimateAnswerArray[i][j]] !== firstCheck) {
          aWin = false;
        }
        return aWin;
      }
      console.log(aWin + " line 172");
    } */
    }

    if (aWin !== true) {
      return null;
    } else if (aWin === true) {
      console.log("Winner");
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
    // console.log(board);
    return board.map((item, index) => {
      return (
        <Square
          onSelect={() => this.assignMove(index)}
          index={index}
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

  startComputer = () => {
    this.setState({
      currentMoveHuman: false,
      gameUnderway: true
    });
  };

  render() {
    {
      this.gradeTheGame();
    }
    return (
      <div className="board-container">
        <h1 className="winning-h1-message">{this.state.winner}</h1>
        <div
          className="board-grid"
          style={{
            display: "grid",
            gridTemplateColumns: this.grids(this.state.board)
          }}
        >
          {this.renderBoard(this.state.board)}
        </div>
        <div>
          <br />
          <label>
            You are: {this.state.computerSymbol === "O" ? "X" : "O"}
          </label>
          <br />
          <br />
          <label> Board Width : </label>
          <input
            type="text"
            onChange={e => this.boardResize(e)}
            placeholder="3"
          />
        </div>
        <BoardFooter
          reset={() => this.boardReset()}
          currentUser={this.state.computerFirst}
          toggleComputer={() => this.toggleUser()}
          startComputer={() => this.startComputer()}
          gameStatus={this.state.gameUnderway}
        />
        <Computer
          board={this.state.board}
          selectMove={id => this.computerMove(id)}
          currentMove={this.state.currentMoveHuman}
          gameOver={this.state.gameOver}
          computerSymbol={this.state.computerSymbol}
        />
      </div>
    );
  }
}

export default Board;