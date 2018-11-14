import * as React from "react";
import Board from "./Components/Board";

import "./App.css";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Tic Tac Toe</h1>
        </header>
        <Board />
      </div>
    );
  }
}

export default App;
