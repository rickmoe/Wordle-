import { useState } from "react";
import { GameMode, GameState, Guess, Result } from "../types/types";
import { useGuesses } from "./useGuesses";
import { useInputHandler } from "./useInputHandler";
import { useWordManager } from "./useWordManager";

const isValidResult = (results: Result[] | "invalid"): results is Result[] => {
  return results !== "invalid";
};

const getGameState = (guesses: Guess[], maxGuesses: number): GameState => {
  if (guesses.length > 1) {
    const lastResults = guesses.slice(-2)[0].results;
    if (
      lastResults &&
      isValidResult(lastResults) &&
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
  setWordLength: (length: number) => void
) => {
  const { getNextWord, checkGuess } = useWordManager(
    gameMode,
    wordLength,
    setWordLength
  );
  const [score, setScore] = useState(0);

  const { guesses, resetGuesses, pushGuess, popGuess, submitGuess } =
    useGuesses(wordLength, checkGuess);

  const gameState = getGameState(guesses, maxGuesses);
  const resetGame = () => {
    getNextWord();
    resetGuesses();
  };

  useInputHandler(
    gameMode,
    gameState,
    setScore,
    resetGame,
    pushGuess,
    popGuess,
    submitGuess
  );

  return {
    guesses,
    gameState,
    score,
  };
};
