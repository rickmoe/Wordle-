import { useCallback, useState } from "react";

export const useGuesses = (wordLength: number) => {
  type GuessesType = { current: string; past: string[] };
  const [guesses, setGuesses] = useState<GuessesType>({
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
        lastGuesses.past.indexOf(lastGuesses.current) >= 0
      ) {
        return lastGuesses;
      }
      return {
        current: "",
        past: [...lastGuesses.past, lastGuesses.current],
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
