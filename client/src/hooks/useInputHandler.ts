import { useCallback } from "react";
import { GameState } from "../types";

export const useInputHandler = (
  status: GameState,
  handleGuessInput: (letter: string) => void,
  resetGameState: VoidFunction,
  setScore: React.Dispatch<React.SetStateAction<number>>
) => {
  const handleInput = useCallback(
    (letter: string): void => {
      if (status === "in progress") handleGuessInput(letter.toLowerCase());
      else if (status === "win" && letter === ">") {
        resetGameState();
        setScore((prev) => prev + 1);
      } else if (status === "lose" && letter === ">") {
        resetGameState();
        setScore(0);
      }
    },
    [status, handleGuessInput, resetGameState]
  );

  return { handleInput };
};
