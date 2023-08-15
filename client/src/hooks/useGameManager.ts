import { useState } from "react";
import { GameMode } from "../types/types";
import { useGuesses } from "./useGuesses";
import { useKeydownHandler } from "./useKeydownHandler";
import { useWordManager } from "./useWordManager";
import { useGameState } from "./useGameState";

export const useGameManager = (
  gameMode: GameMode,
  wordLength: number,
  maxGuesses: number,
  setWordLength: (length: number) => void
) => {
  const [score, setScore] = useState(0);

  const { getNextWord, checkGuess } = useWordManager(
    gameMode,
    wordLength,
    setWordLength
  );

  const guessManager = useGuesses(wordLength, checkGuess);

  const gameState = useGameState(guessManager.guesses, maxGuesses);
  const resetGame = () => {
    getNextWord();
    guessManager.resetGuesses();
  };

  useKeydownHandler(gameMode, gameState, setScore, resetGame, guessManager);

  return {
    guesses: guessManager.guesses,
    gameState,
    score,
  };
};
