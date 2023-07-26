import { useCallback, useState } from "react";

// Results follow the following convention: "green" is in
// the final word and in the correct spot, "yellow" is in
// the final word but in the wrong spot, and "gray" is not
// in the final word
type Result = "green" | "yellow" | "gray";
type CheckFunction = (word: string) => Result[];
type CheckedGuess = { word: string; results: Result[] };
type Guesses = { current: string; past: CheckedGuess[] };

export const useGuesses = (wordLength: number, checkGuess: CheckFunction) => {
  console.log("useGuesses");
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

      const currentResults = checkGuess(lastGuesses.current);
      const newEntry = { word: lastGuesses.current, results: currentResults };

      return {
        current: "",
        past: [...lastGuesses.past, newEntry],
      };
    });
  }, [wordLength]);

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
