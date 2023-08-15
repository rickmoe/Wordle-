import { useEffect } from "react";
import { GameMode, GameState } from "../types/types";

export const useKeydownHandler = (
  gameMode: GameMode,
  gameState: GameState,
  setScore: React.Dispatch<React.SetStateAction<number>>,
  resetGame: VoidFunction,
  guessManager: {
    pushGuess: (keyName: string) => void;
    popGuess: VoidFunction;
    submitGuess: VoidFunction;
  }
) => {
  const handleGuessKeydown = (keyName: string) => {
    if (/^[a-z]$/i.test(keyName)) guessManager.pushGuess(keyName);
    else if (keyName === "Backspace") guessManager.popGuess();
    else if (keyName === "Enter") guessManager.submitGuess();
  };

  const handleKeyDown = ({ key }: KeyboardEvent): void => {
    switch (gameMode) {
      case "endless":
        switch (gameState) {
          case "in progress":
            handleGuessKeydown(key);
            break;
          case "win":
            if (key === "Enter") {
              setScore((prev) => prev + 1);
              resetGame();
            }
            break;
          case "lose":
            if (key === "Enter") {
              setScore(0);
              resetGame();
            }
            break;
        }
        break;
      case "daily":
        if (gameState === "in progress") handleGuessKeydown(key);
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
};
