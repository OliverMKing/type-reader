/*global chrome*/

import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [page, setPage] = useState(0);

  const onClick = () => {
    const body = document.body.innerText;
    console.log(body);
    setPage(body);
  };

  return (
    <div className="App">
      <h1>Type Racer</h1>
      <p>Learn to type effortlessly</p>
      <button onClick={onClick}></button>
      <p>{page}</p>
    </div>
  );
};

export default App;
