import { useCallback, useEffect } from "react";
import { GameMode, GameState } from "../types/types";

export const useInputHandler = (
  gameMode: GameMode,
  gameState: GameState,
  setScore: React.Dispatch<React.SetStateAction<number>>,
  resetGame: VoidFunction,
  pushGuess: (keyName: string) => void,
  popGuess: VoidFunction,
  submitGuess: VoidFunction
) => {
  const handleGuessInput = (keyName: string) => {
    if (/^[a-z]$/i.test(keyName)) pushGuess(keyName);
    else if (keyName === "Backspace") popGuess();
    else if (keyName === "Enter") submitGuess();
  };

  const handleInput = useCallback(
    (keyName: string): void => {
      switch (gameMode) {
        case "endless":
          switch (gameState) {
            case "in progress":
              handleGuessInput(keyName);
              break;
            case "win":
              if (keyName === "Enter") {
                resetGame();
                setScore((prev) => prev + 1);
              }
              break;
            case "lose":
              if (keyName === "Enter") {
                resetGame();
                setScore(0);
              }
              break;
          }
          break;
        case "daily":
          if (gameState === "in progress") handleGuessInput(keyName);
          break;
      }
    },
    [gameState, gameMode, handleGuessInput, resetGame, setScore]
  );

  const handleKeyDown = (event: KeyboardEvent) => {
    if (/^[a-z]$/i.test(event.key)) return handleInput(event.key);
    if (event.key === "Backspace") return handleInput("Backspace");
    if (event.key === "Enter") return handleInput("Enter");
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
};
