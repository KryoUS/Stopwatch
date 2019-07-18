import React from "react";
import ReactDOM from "react-dom";
import Stopwatch from "./components/stopwatch";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <Stopwatch />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
