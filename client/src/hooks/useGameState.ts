import { useState } from "react";
import { SetURLSearchParams } from "react-router-dom";
import { GameMode, GameState, Guess, Result } from "../types";
import { useGuesses } from "./useGuesses";
import { useInputHandler } from "./useInputHandler";
import { useWordQueue } from "./useWordQueue";

const isResultArray = (
  results: Result[] | "invalid" | undefined
): results is Result[] => {
  return results !== undefined && results !== "invalid";
};

const getGameState = (guesses: Guess[], maxGuesses: number): GameState => {
  if (guesses.length > 1) {
    const lastResults = guesses.slice(-2)[0].results;
    if (
      isResultArray(lastResults) &&
      lastResults.every((result) => result === "green")
    )
      return "win";
  }
  if (guesses.length > maxGuesses) return "lose";
  return "in progress";
};

export const useGameState = (
  gameMode: GameMode,
  wordLength: number,
  maxGuesses: number,
  setSearchParams: SetURLSearchParams
) => {
  const { getNextWord, checkGuess } = useWordQueue(
    gameMode,
    wordLength,
    setSearchParams
  );
  const [score, setScore] = useState(0);

  const { guesses, resetGuesses, handleGuessInput } = useGuesses(
    wordLength,
    checkGuess
  );

  const gameState = getGameState(guesses, maxGuesses);
  const resetGameState = () => {
    getNextWord();
    resetGuesses();
  };

  const { handleInput } = useInputHandler(
    gameMode,
    gameState,
    handleGuessInput,
    resetGameState,
    setScore
  );

  return {
    guesses,
    handleInput,
    gameState,
    score,
  };
};
