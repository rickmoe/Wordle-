import { checkWordValidity } from "../api/api";
import { Guess, Result } from "../types/types";
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
      return prev.map(({ word, results }) =>
        word === current ? { word: word + letter } : { word, results }
      );
    });
  };

  const popGuess = () => {
    setGuesses((prev) =>
      prev.map(({ word, results }, index) =>
        index === prev.length - 1
          ? { word: word.slice(0, -1) }
          : { word, results }
      )
    );
  };

  const submitGuess = () => {
    setGuesses((prev) => {
      const current = getCurrentGuess(prev).word;
      if (
        current.length < wordLength ||
        prev.slice(0, -1).find(({ word }) => word === current)
      ) {
        return prev.map((guess, index) =>
          index < prev.length - 1
            ? guess
            : { word: guess.word, results: "invalid" }
        );
      }

      (async () => {
        if (!(await checkWordValidity(current))) {
          setGuesses(
            prev.map((guess, index) =>
              index < prev.length - 1
                ? guess
                : { word: guess.word, results: "invalid" }
            )
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

  const resetGuesses = () => setGuesses([{ word: "" }]);

  return {
    guesses,
    resetGuesses,
    pushGuess,
    popGuess,
    submitGuess,
  };
};
