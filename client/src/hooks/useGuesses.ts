import { checkWordValidity } from "../api/api";
import { Guess, Result } from "../types";
import { useState } from "react";

const getCurrentGuess = (array: Guess[]): Guess => {
  return array.slice(-1)[0];
};

export const useGuesses = (
  wordLength: number,
  checkGuess: (word: string) => Result[]
) => {
  const [guesses, setGuesses] = useState<Guess[]>([{ word: "" }]);

  const pushGuess = (letter: string) => {
    setGuesses((prev) => {
      const current = getCurrentGuess(prev).word;
      if (current.length >= wordLength) return prev;

      return prev.map(({ word, results }, index) => {
        if (index !== prev.length - 1) return { word, results };
        return { word: word + letter };
      });
    });
  };

  const popGuess = () => {
    setGuesses((prev) =>
      prev.map(({ word, results }, index) => {
        if (index !== prev.length - 1) return { word, results };
        return { word: word.slice(0, -1) };
      })
    );
  };

  const submitGuess = () => {
    setGuesses((prev) => {
      const current = getCurrentGuess(prev).word;
      if (
        current.length < wordLength ||
        prev.slice(0, -1).find(({ word }) => word === current)
      ) {
        return prev.map((guess, index) => {
          if (index !== prev.length - 1) return guess;
          return { word: guess.word, results: "invalid" };
        });
      }

      (async () => {
        const isValid = await checkWordValidity(current);
        if (!isValid) {
          setGuesses(
            prev.map((guess, index) => {
              if (index !== prev.length - 1) return guess;
              return { word: guess.word, results: "invalid" };
            })
          );
          return;
        }

        const currentResults = checkGuess(current);
        const newEntry = { word: current, results: currentResults };

        setGuesses(
          prev
            .map((guess, index) => {
              if (index !== prev.length - 1) return guess;
              return newEntry;
            })
            .concat({ word: "" })
        );
      })();

      return prev;
    });
  };

  const handleGuessInput = (letter: string) => {
    if (/^[a-z]$/i.test(letter)) pushGuess(letter.toLowerCase());
    else if (letter === "<") popGuess();
    else if (letter === ">") submitGuess();
  };

  const resetGuesses = () => setGuesses([{ word: "" }]);

  return { guesses, handleGuessInput, resetGuesses };
};
