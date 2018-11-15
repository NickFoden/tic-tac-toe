import * as React from "react";

import Board from "./Components/Board";

import "./App.css";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <a
            className="App-title-link"
            href="https://www.wikihow.com/Win-at-Tic-Tac-Toe"
            rel="noopener noreferrer"
            target="_blank"
          >
            <h1 className="App-title">Welcome! Try and beat the 💻 </h1>
          </a>
        </header>
        <Board />
      </div>
    );
  }
}

export default App;
