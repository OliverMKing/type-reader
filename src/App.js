/*global chrome*/

import React, { useState, useEffect } from "react";
import { Readability } from "@mozilla/readability";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("");
  const [words, setWords] = useState([]);
  const [currWordIndex, setCurrWordIndex] = useState(0);

  const onUserInput = (e) => {
    if (e.target.value === words[currWordIndex]) {
      // Move to next word
      setCurrWordIndex(currWordIndex + 1);
      setInput("");
    } else {
      setInput(e.target.value);
    }
  };

  useEffect(() => {
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
      setWords(wordArr);
    } catch (err) {
      // TODO: Add better error handling
      console.log(err);
    }
  }, []);

  return (
    <div className="App">
      <h1>Type Racer</h1>
      <p>Learn to type effortlessly</p>
      {words.length > 0 && words[currWordIndex]}
      <br />
      {words.length > 0 && <input value={input} onChange={onUserInput}></input>}
    </div>
  );
};

export default App;
