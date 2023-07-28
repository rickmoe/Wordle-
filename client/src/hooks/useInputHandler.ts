import { useCallback } from "react";

type GameStatus = "win" | "lose" | "in progress";

export const useInputHandler = (
  status: GameStatus,
  handleGuessInput: (letter: string) => void,
  reset: VoidFunction
) => {
  const handleInput = useCallback(
    (letter: string): void => {
      if (status === "in progress") handleGuessInput(letter.toLowerCase());
      else if (status === "win" && letter === ">") reset();
      else if (status === "lose" && letter === ">") reset();
    },
    [status, handleGuessInput, reset]
  );

  return { handleInput };
};
