import { Guesses, Result } from "../types";
import { useState } from "react";

export const useGuesses = (
  wordLength: number,
  checkGuess: (word: string) => Result[]
) => {
  const [guesses, setGuesses] = useState<Guesses>({
    current: "",
    past: [],
  });

  const pushGuess = (letter: string) => {
    setGuesses((lastGuesses) => {
      if (lastGuesses.current.length >= wordLength) return lastGuesses;
      return {
        current: lastGuesses.current + letter,
        past: lastGuesses.past,
      };
    });
  };

  const popGuess = () => {
    setGuesses((lastGuesses) => ({
      current: lastGuesses.current.slice(0, -1),
      past: lastGuesses.past,
    }));
  };

  const submitGuess = () => {
    setGuesses((lastGuesses) => {
      if (
        lastGuesses.current.length < wordLength ||
        lastGuesses.past.some((guess) => guess.word == lastGuesses.current)
      ) {
        return lastGuesses;
      }

      const currentResults = checkGuess(lastGuesses.current);
      const newEntry = { word: lastGuesses.current, results: currentResults };

      return {
        current: "",
        past: [...lastGuesses.past, newEntry],
      };
    });
  };

  const handleGuessInput = (letter: string) => {
    if (/^[a-z]$/i.test(letter)) pushGuess(letter.toLowerCase());
    else if (letter === "<") popGuess();
    else if (letter === ">") submitGuess();
  };

  const resetGuesses = () => setGuesses({ current: "", past: [] });

  return { guesses, handleGuessInput, resetGuesses };
};
