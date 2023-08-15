import { GameState, Guess, Result } from "../types/types";

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

export const useGameState = (guesses: Guess[], maxGuesses: number) => {
  return getGameState(guesses, maxGuesses);
};
