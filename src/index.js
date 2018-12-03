import React, { useState } from "react";
import ReactDOM from "react-dom";
import Handwriting from "./Handwriting";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <Handwriting />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);