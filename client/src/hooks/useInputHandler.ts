import { useCallback } from "react";
import { GameMode, GameState } from "../types/types";

export const useInputHandler = (
  gameMode: GameMode,
  gameState: GameState,
  handleGuessInput: (letter: string) => void,
  resetGame: VoidFunction,
  setScore: React.Dispatch<React.SetStateAction<number>>
) => {
  const handleInput = useCallback(
    (letter: string): void => {
      if (gameMode === "endless") {
        if (gameState === "in progress") handleGuessInput(letter.toLowerCase());
        else if (gameState === "win" && letter === ">") {
          resetGame();
          setScore((prev) => prev + 1);
        } else if (gameState === "lose" && letter === ">") {
          resetGame();
          setScore(0);
        }
      } else if (gameMode === "daily") {
        if (gameState === "in progress") handleGuessInput(letter.toLowerCase());
      }
    },
    [gameState, handleGuessInput, resetGame]
  );

  return { handleInput };
};
