/*global chrome*/

import React, { useState } from "react";
import { Readability } from "@mozilla/readability";
import "./App.css";

const App = () => {
  const [page, setPage] = useState(0);

  const onClick = () => {
    const article = new Readability(document).parse();
    const text = new DOMParser()
      .parseFromString(article.content, "text/html")
      .body.innerText.replace(/\s+/g, " ");
    // Generate a word array
    // There shouldn't be any words over 31 letters so those are usually mistakes
    const wordArr = text
      .split(" ")
      .filter((word) => word.length > 0 && word.length < 31);
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
