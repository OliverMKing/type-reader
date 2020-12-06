/*global chrome*/

import React, { useState, useEffect } from "react";
import { Readability } from "@mozilla/readability";
import "./App.css";
import { Grid, TextField } from '@material-ui/core';

const App = () => {
  const wordsPerLine = 8;
  const [input, setInput] = useState("");
  const [words, setWords] = useState([]);
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [totalCharacters, setTotalCharacters] = useState(0);
  const [wpm, setWPM] = useState(0);

  // TODO: Track and display words per minute
  // we will use Date() to set the initial time
  // after every word , we will calculate words per minute and display figure

  // TODO: Keep words per minute high score in chrome.storage
  // https://developer.chrome.com/apps/storage

  // TODO: Handle last word entered (display "done reading / typing")
  const onUserInput = (e) => {
    if(startTime == 0){
      setStartTime(new Date());
    }
    if (e.target.value === words[currWordIndex] + " ") {
      // Move to next word + calculate wpm and update icon
      setTotalCharacters(totalCharacters + words[currWordIndex].length);
      setWPM(calculateWPM());
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

  // TODO: Make this handle the end of the word array (will out of bounds)
  const getLineWords = (line = 1, generatedWords = wordsPerLine) => {
    const startIndex =
      (Math.floor(currWordIndex / wordsPerLine) + line - 1) * wordsPerLine;
    let lineWords = [];
    //I added this part - BTH:
    if(currWordIndex+1 > words.length){
      return lineWords;
    }
    else{
      for (let i = 0; i < generatedWords; i++) {
        const index = startIndex + i;
        lineWords.push({ word: words[index], index });
      }
      return lineWords;
    }
  };

  const calculateWPM = () =>{
    let currentTime = new Date();
    return Math.round(((totalCharacters/5)/((currentTime - startTime) /60000) + Number.EPSILON)*100)/100;
  }


  // TODO: Style this with Material UI or tailwind
  return (
      <Grid className="App" direction="column" justify="flex-start">

          <h1>Type Reader</h1>

          <h2>Average Words Per Minute is: <span>{wpm}</span></h2>
          <p className="typeText">
            {
              /* Display current line with current word highlighted */
              words.length > 0 &&
              getLineWords(1).map((x) => {
                if (x.index === currWordIndex) {
                  return <span className="currWord">{x.word} </span>;
                }
                return <span>{x.word} </span>;
              })
            }
            {
              /* Display second line */
              words.length > 0 &&
              getLineWords(2).map((x) => {
                return <span>{x.word} </span>;
              })
            }
          </p>
          {currWordIndex+1 <= words.length && <TextField id="outlined-basic" value={input} onChange={onUserInput} autoComplete = "off"/>}

          {currWordIndex+1 > words.length && <h3 onChange={onUserInput}>Success! You've typed this entire page!</h3>}

      </Grid>
  );
};

export default App;

//{words.length > 0 && <input value={input} onChange={onUserInput}></input>}