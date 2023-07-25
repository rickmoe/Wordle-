import { useCallback, useState } from "react";
import { getWord } from "../api/api";

export const useGuesses = (wordLength: number) => {
  // Results follow the following convention: "green" is in
  // the final word and in the correct spot, "yellow" is in
  // the final word but in the wrong spot, and "gray" is not
  // in the final word
  type Result = "green" | "yellow" | "gray";
  type CheckedGuess = { word: string; results: Result[] };
  type Guesses = { current: string; past: CheckedGuess[] };
  const [guesses, setGuesses] = useState<Guesses>({
    current: "",
    past: [],
  });

  const pushGuess = useCallback(
    (letter: string) => {
      setGuesses((lastGuesses) => {
        if (lastGuesses.current.length >= wordLength) return lastGuesses;
        return {
          current: lastGuesses.current + letter,
          past: lastGuesses.past,
        };
      });
    },
    [wordLength]
  );

  const popGuess = useCallback(() => {
    setGuesses((lastGuesses) => ({
      current: lastGuesses.current.slice(0, -1),
      past: lastGuesses.past,
    }));
  }, [wordLength]);

  const submitGuess = useCallback(() => {
    setGuesses((lastGuesses) => {
      if (
        lastGuesses.current.length < wordLength ||
        lastGuesses.past.some((guess) => guess.word == lastGuesses.current)
      ) {
        return lastGuesses;
      }

      const currentResults = checkGuess(lastGuesses.current, getWord());
      const newEntry = { word: lastGuesses.current, results: currentResults };

      return {
        current: "",
        past: [...lastGuesses.past, newEntry],
      };
    });
  }, [wordLength]);

  const checkGuess = (guess: string, targetWord: string): Result[] => {
    const letterCount: { [key: string]: number } = targetWord
      .split("")
      .reduce((count: { [key: string]: number }, letter: string) => {
        count[letter] = count[letter] ? count[letter] + 1 : 1;
        return count;
      }, {});
    const result: Result[] = Array(wordLength).fill("gray");
    for (let i = 0; i < wordLength; i++) {
      if (guess[i] === targetWord[i]) {
        letterCount[guess[i]]--;
        result[i] = "green";
      }
    }
    for (let i = 0; i < guess.length; i++) {
      if (result[i] !== "green" && letterCount[guess[i]] > 0) {
        letterCount[guess[i]]--;
        result[i] = "yellow";
      }
    }
    return result;
  };

  const handleInput = useCallback(
    (letter: string): void => {
      if (/^[a-z]$/i.test(letter)) return pushGuess(letter.toLowerCase());
      if (letter === "<") return popGuess();
      if (letter === ">") return submitGuess();
    },
    [pushGuess, popGuess, submitGuess]
  );

  return { guesses, handleInput };
};
