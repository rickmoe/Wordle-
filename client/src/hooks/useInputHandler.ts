type GameStatus = "win" | "lose" | "in progress";

export const useInputHandler = (
  status: GameStatus,
  routeGuessInput: (letter: string) => void,
  reset: VoidFunction
) => {
  const handleInput = (letter: string): void => {
    if (status === "in progress") routeGuessInput(letter.toLowerCase());
    else if (status === "win" && letter === ">") reset();
    else if (status === "lose" && letter === ">") reset();
  };

  return { handleInput };
};
