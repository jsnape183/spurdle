import { useState, useEffect, useCallback } from "react";
import "./styles.css";
import Guesses from "./components/Guesses";
import Keyboard from "./components/Keyboard";
import Modal from "./components/Modal";
import StatsBox from "./components/StatsBox";
import {
  getFromLocalStorage,
  addToLocalStorage,
  daysDiff,
  toUTC,
  getHistory
} from "./utils";
import { validateWord, isValidWord, generateLetters } from "./language";
import words from "./words";

export default function App() {
  const startDate = toUTC(new Date(2022, 1, 2));
  const wordIndex = Math.floor(daysDiff(startDate, toUTC(new Date())));
  const [history, setHistory] = useState(getHistory());
  const word = words[wordIndex].toUpperCase();
  const [guesses, setGuesses] = useState({
    prev: getFromLocalStorage(),
    current: "",
    letters: []
  });

  const guessLetter = (letter) => {
    setGuesses((prevGuess) => ({
      ...prevGuess,
      current:
        prevGuess.current.length < 5
          ? prevGuess.current + letter.toUpperCase()
          : prevGuess.current
    }));
  };

  const removeLetter = () => {
    setGuesses((prevGuess) => ({
      ...prevGuess,
      current:
        prevGuess.current.length > 0
          ? prevGuess.current.substring(0, prevGuess.current.length - 1)
          : ""
    }));
  };

  const makeGuess = () => {
    setGuesses((prevGuess) => ({
      prev:
        prevGuess.current.length >= 5 && isValidWord(words, prevGuess.current)
          ? prevGuess.prev.concat([validateWord(word, prevGuess.current)])
          : prevGuess.prev,
      current:
        prevGuess.current.length >= 5 && isValidWord(words, prevGuess.current)
          ? ""
          : prevGuess.current,
      letters:
        prevGuess.current.length >= 5 && isValidWord(words, prevGuess.current)
          ? generateLetters(
              prevGuess.letters.concat(
                validateWord(word, prevGuess.current).letters
              )
            )
          : prevGuess.letters
    }));
  };

  const onKeyDown = useCallback((event) => {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      setGuesses((prevGuess) => ({
        ...prevGuess,
        current:
          prevGuess.current.length < 5
            ? prevGuess.current + event.key.toUpperCase()
            : prevGuess.current
      }));
      return;
    }

    if (event.keyCode === 8) {
      removeLetter();
      return;
    }
    if (event.keyCode === 13) {
      makeGuess();
      return;
    }
  }, []);

  const onKeyboardClick = (key) => {
    if (key === "GO") {
      makeGuess();
      return;
    }

    if (key === "DEL") {
      removeLetter();
      return;
    }

    guessLetter(key);
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return window.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  useEffect(() => {
    addToLocalStorage(guesses.prev);
    setHistory(getHistory());
  }, [guesses]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  return (
    <div className="App">
      <h1>Spurdle</h1>
      {(guesses.prev.some((g) => g.correct) || guesses.prev.length === 6) && (
        <>
          <h2>{word}</h2>
          <Modal
            header={
              guesses.prev.some((g) => g.correct) ? "You won!" : "Game over!"
            }
            content={<StatsBox history={history} />}
          />
        </>
      )}
      <Guesses
        guesses={[
          ...guesses.prev,
          guesses.current.padEnd(6, " ").substring(0, 5)
        ]}
      />
      <Keyboard letters={guesses.letters} onClick={onKeyboardClick} />
    </div>
  );
}
