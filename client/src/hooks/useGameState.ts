import { useGuesses } from "../hooks/useGuesses";
import { useWordManager } from "./useWordManager";

type Result = "green" | "yellow" | "gray";
type TileData = { letter: string; result?: Result };

export const useGameState = (wordLength: number, maxGuesses: number) => {
  console.log("useGameState");
  const { checkGuess } = useWordManager(wordLength);
  const { guesses, handleInput } = useGuesses(wordLength, checkGuess);

  const makeTileData = () => {
    let tileData: TileData[][] = guesses.past.map(({ word, results }) => {
      const tileRowData = [];
      for (let i = 0; i < wordLength; i++) {
        tileRowData.push({ letter: word[i], result: results[i] });
      }
      return tileRowData;
    });
    tileData.push(
      guesses.current
        .padEnd(wordLength, " ")
        .split("")
        .map((letter) => ({
          letter: letter,
        }))
    );
    return tileData.concat(
      Array(maxGuesses - guesses.past.length - 1).fill(
        Array(wordLength).fill({ letter: " " })
      )
    );
  };

  return { tileData: makeTileData(), handleInput };
};
