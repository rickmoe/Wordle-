import { useState } from "react";
import { CheckedGuess, GameState, Guesses, TileData } from "../types";
import { useGuesses } from "./useGuesses";
import { useInputHandler } from "./useInputHandler";
import { checkGuess, dequeueWord, fetchWordsIfNeeded } from "../data/WordQueue";

const getGameState = (
  checkedGuesses: CheckedGuess[],
  maxGuesses: number
): GameState => {
  if (
    checkedGuesses.length > 0 &&
    checkedGuesses.slice(-1)[0].results.every((result) => result === "green")
  )
    return "win";
  if (checkedGuesses.length === maxGuesses) return "lose";
  return "in progress";
};

const makeTileData = (
  guesses: Guesses,
  gameState: GameState,
  wordLength: number,
  maxGuesses: number
) => {
  let tileData: TileData[][] = guesses.past.map(({ word, results }) => {
    const tileRowData = [];
    for (let i = 0; i < wordLength; i++) {
      tileRowData.push({ letter: word[i], result: results[i] });
    }
    return tileRowData;
  });
  if (gameState === "in progress") {
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

export const useGameState = (wordLength: number, maxGuesses: number) => {
  const [score, setScore] = useState(0);

  const { guesses, resetGuesses, handleGuessInput } = useGuesses(
    wordLength,
    checkGuess
  );

  const gameState = getGameState(guesses.past, maxGuesses);
  const resetGameState = () => {
    dequeueWord();
    fetchWordsIfNeeded();
    resetGuesses();
  };

  const { handleInput } = useInputHandler(
    gameState,
    handleGuessInput,
    resetGameState,
    setScore
  );

  return {
    tileData: makeTileData(guesses, gameState, wordLength, maxGuesses),
    handleInput,
    gameState,
    score,
  };
};
