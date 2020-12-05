/*global chrome*/

import React, { useState } from "react";
import { Readability } from "@mozilla/readability";
import "./App.css";

const App = () => {
  const [page, setPage] = useState(0);

  const onClick = () => {
    const article = new Readability(document).parse();
    console.log(
      new DOMParser().parseFromString(article.content, "text/html").body
        .innerText
    );
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
