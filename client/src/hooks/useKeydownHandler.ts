import { useEffect } from "react";

export const useKeydownHandler = (handleInput: (letter: string) => void) => {
  useEffect(() => {
    const detectKeyDown = (event: KeyboardEvent) => {
      if (/^[a-z]$/i.test(event.key)) return handleInput(event.key);
      if (event.key === "Backspace") return handleInput("<");
      if (event.key === "Enter") return handleInput(">");
    };

    document.addEventListener("keydown", detectKeyDown);
    return () => document.removeEventListener("keydown", detectKeyDown);
  }, [handleInput]);
};
