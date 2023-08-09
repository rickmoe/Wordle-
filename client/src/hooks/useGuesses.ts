import { checkWordValidity } from "../api/api";
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
    setGuesses(({ current, past }) => {
      if (current.length >= wordLength) return { current, past };
      return {
        current: current + letter,
        past,
      };
    });
  };

  const popGuess = () => {
    setGuesses(({ current, past }) => ({
      current: current.slice(0, -1),
      past,
    }));
  };

  const submitGuess = () => {
    setGuesses(({ current, past }) => {
      if (
        current.length < wordLength ||
        past.some(({ word }) => word == current)
      ) {
        return { current, past };
      }

      (async () => {
        const isValid = await checkWordValidity(current);
        if (!isValid) {
          setGuesses({ current: "", past });
          return;
        }

        const currentResults = checkGuess(current);
        const newEntry = { word: current, results: currentResults };

        setGuesses({
          current: "",
          past: [...past, newEntry],
        });
      })();

      return { current, past };
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
