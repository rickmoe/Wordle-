import { useGuesses } from "../hooks/useGuesses";
import { useInputHandler } from "./useInputHandler";
import { checkGuess, dequeueWord, fetchWordsIfNeeded } from "../data/WordQueue";

type Result = "green" | "yellow" | "gray";
type TileData = { letter: string; result?: Result };

export const useGameState = (wordLength: number, maxGuesses: number) => {
  const { guesses, status, resetGuesses, routeGuessInput } = useGuesses(
    wordLength,
    maxGuesses,
    checkGuess
  );

  const reset = () => {
    dequeueWord();
    fetchWordsIfNeeded();
    resetGuesses();
  };

  const { handleInput } = useInputHandler(status, routeGuessInput, reset);

  const makeTileData = () => {
    let tileData: TileData[][] = guesses.past.map(({ word, results }) => {
      const tileRowData = [];
      for (let i = 0; i < wordLength; i++) {
        tileRowData.push({ letter: word[i], result: results[i] });
      }
      return tileRowData;
    });
    if (status === "in progress") {
      tileData.push(
        guesses.current
          .padEnd(wordLength, " ")
          .split("")
          .map((letter) => ({
            letter: letter,
          }))
      );
    }
    tileData = tileData.concat(
      Array(maxGuesses - tileData.length).fill(
        Array(wordLength).fill({ letter: " " })
      )
    );
    return tileData;
  };

  return { tileData: makeTileData(), handleInput, status };
};
