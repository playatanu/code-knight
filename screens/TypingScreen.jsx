import { useEffect, useRef, useState } from "react";
import styles from "../styles/TypingScreen.module.css";
import { FiRefreshCcw } from "react-icons/fi";
import React from "react";
import randomWords from "random-words";

import Timer from "../components/typing/Timer";

var Word = ({ text, active, correct }) => {
  if (correct === true) {
    return <span className={styles.correct}>{text} </span>;
  }

  if (correct === false) {
    return <span className={styles.incorrect}>{text} </span>;
  }

  if (active === true) {
    return <span className={styles.active}>{text} </span>;
  }

  return <span>{text} </span>;
};

Word = React.memo(Word);

const getrendomWords = () => randomWords(200);

const TypingScreen = () => {
  const [userInput, setUserInput] = useState("");
  const cloude = useRef(getrendomWords());
  const [startCounting, setStartCounting] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [correctWordArray, setCorrectWordArray] = useState([]);
  const [restart, setRestart] = useState(false);
  const processInput = (value) => {
    setRestart(false);
    if (activeWordIndex === cloude.current.length) {
      return;
    }
    if (setStartCounting) {
      setStartCounting(true);
    }

    if (value.endsWith(" ")) {
      if (activeWordIndex === cloude.current.length - 1) {
        // overflow
        setStartCounting(false);
        setUserInput("Finnished");
        return;
      } else {
        setUserInput("");
      }
      setActiveWordIndex((index) => index + 1);

      setCorrectWordArray((data) => {
        const word = value.trim();
        const newResult = [...data];
        newResult[activeWordIndex] = word === cloude.current[activeWordIndex];
        return newResult;
      });
    } else {
      setUserInput(value);
    }
  };

  const restartTyping = () => {
    setRestart(true);
    setUserInput("");
    setStartCounting(false);
    setActiveWordIndex(0);
    setCorrectWordArray([]);
  };

  return (
    <div className={styles.main}>
      <div className={styles.timeandrefress}>
        <Timer
          startCounting={startCounting}
          restart={restart}
          correctWords={correctWordArray.filter(Boolean).length}
        />
        <div onClick={restartTyping}>
          Restart <FiRefreshCcw />
        </div>
      </div>

      <input
        className={styles.input}
        type="text"
        value={userInput}
        onChange={(e) => processInput(e.target.value)}
      />
      <p>
        {cloude.current.map((word, index) => {
          return (
            <Word
              text={word}
              active={index == activeWordIndex}
              correct={correctWordArray[index]}
            />
          );
        })}
      </p>
    </div>
  );
};

export default TypingScreen;
