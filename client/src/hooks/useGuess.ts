import { useState } from "react";

export const useGuess = (wordLength: number) => {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  
  const pushGuess = (letter: string) => {
    console.log(currentGuess, currentGuess.length, letter);
    if (currentGuess.length >= wordLength) return;
    setCurrentGuess((prev) => prev + letter);
  }
  const popGuess = () => {
    console.log(currentGuess);
    setCurrentGuess((prev) => prev.slice(0, -1));
  }
  const submitGuess = () => {
    console.log(currentGuess, guesses);
    if (currentGuess.length < wordLength) return;
    setGuesses(prev => [...prev, currentGuess]);
    setCurrentGuess("");
  }

  const handleInput = (letter: string): void => {
    // console.log(letter);
    if (/^[a-z]$/i.test(letter)) return pushGuess(letter.toLowerCase());
    if (letter === "<") return popGuess();
    if (letter === ">") return submitGuess();
  };

  return {guesses, currentGuess, handleInput};
}