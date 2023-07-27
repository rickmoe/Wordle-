import { useState } from "react";

// Results follow the following convention: "green" is in
// the final word and in the correct spot, "yellow" is in
// the final word but in the wrong spot, and "gray" is not
// in the final word
type Result = "green" | "yellow" | "gray";
type CheckFunction = (word: string) => Result[];
type CheckedGuess = { word: string; results: Result[] };
type Guesses = { current: string; past: CheckedGuess[] };
type GameStatus = "win" | "lose" | "in progress";

const getStatus = (guesses: CheckedGuess[], maxGuesses: number): GameStatus => {
  if (
    guesses.length > 0 &&
    guesses.slice(-1)[0].results.every((result) => result === "green")
  )
    return "win";
  if (guesses.length === maxGuesses) return "lose";
  return "in progress";
};

export const useGuesses = (
  wordLength: number,
  maxGuesses: number,
  checkGuess: CheckFunction,
  dequeueWord: VoidFunction,
  fetchWordsIfNeeded: VoidFunction
) => {
  console.log("useGuesses");
  const [guesses, setGuesses] = useState<Guesses>({
    current: "",
    past: [],
  });
  const status = getStatus(guesses.past, maxGuesses);

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
    console.log("Submit");
    setGuesses((lastGuesses) => {
      console.log("Set < Submit", lastGuesses);
      if (
        lastGuesses.current.length < wordLength ||
        lastGuesses.past.some((guess) => guess.word == lastGuesses.current)
      ) {
        return lastGuesses;
      }

      const currentResults = checkGuess(lastGuesses.current);
      const newEntry = { word: lastGuesses.current, results: currentResults };
      console.log(lastGuesses.current, currentResults);

      return {
        current: "",
        past: [...lastGuesses.past, newEntry],
      };
    });
  };

  const resetGuesses = () => setGuesses({ current: "", past: [] });

  const reset = () => {
    dequeueWord();
    fetchWordsIfNeeded();
    resetGuesses();
  };

  const handleInput = (letter: string): void => {
    if (status === "in progress") {
      if (/^[a-z]$/i.test(letter)) pushGuess(letter.toLowerCase());
      else if (letter === "<") popGuess();
      else if (letter === ">") submitGuess();
    } else if (status === "win" && letter === ">") reset();
    else if (status === "lose" && letter === ">") reset();
  };

  return { guesses, handleInput, status };
};
