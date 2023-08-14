import { useCallback } from "react";
import { GameMode, GameState } from "../types/";

export const useInputHandler = (
  gameMode: GameMode,
  gameState: GameState,
  handleGuessInput: (letter: string) => void,
  resetGameState: VoidFunction,
  setScore: React.Dispatch<React.SetStateAction<number>>
) => {
  const handleInput = useCallback(
    (letter: string): void => {
      if (gameMode === "endless") {
        if (gameState === "in progress") handleGuessInput(letter.toLowerCase());
        else if (gameState === "win" && letter === ">") {
          resetGameState();
          setScore((prev) => prev + 1);
        } else if (gameState === "lose" && letter === ">") {
          resetGameState();
          setScore(0);
        }
      } else if (gameMode === "daily") {
        if (gameState === "in progress") handleGuessInput(letter.toLowerCase());
      }
    },
    [gameState, handleGuessInput, resetGameState]
  );

  return { handleInput };
};
