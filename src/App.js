/*global chrome*/

import React, { useState } from "react";
import { Readability } from "@mozilla/readability";
import "./App.css";

const App = () => {
  const [page, setPage] = useState(0);

  const onClick = () => {
    try {
      const clonedDom = document.cloneNode(true);
      const article = new Readability(clonedDom).parse();
      const text = new DOMParser()
        .parseFromString(article.content, "text/html")
        .body.innerText.replace(/\s+/g, " ");
      // Generate a word array
      // There shouldn't be any words over 31 letters so those are usually mistakes
      const wordArr = text
        .split(" ")
        .filter((word) => word.length > 0 && word.length < 31);
    } catch (err) {
      // TODO: Add better error handling
      console.log(err);
    }
  };

  return (
    <div className="App">
      <h1>Type Racer</h1>
      <p>Learn to type effortlessly</p>
      <button onClick={onClick}></button>
    </div>
  );
};

export default App;
