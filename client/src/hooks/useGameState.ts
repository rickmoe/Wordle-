import { useState } from "react";
import { SetURLSearchParams } from "react-router-dom";
import { GameMode, GameState, Guess, TileData } from "../types";
import { useGuesses } from "./useGuesses";
import { useInputHandler } from "./useInputHandler";
import { useWordQueue } from "./useWordQueue";

const getGameState = (guesses: Guess[], maxGuesses: number): GameState => {
  if (
    guesses.length > 1 &&
    guesses.slice(-2)[0].results?.every((result) => result === "green")
  )
    return "win";
  if (guesses.length > maxGuesses) return "lose";
  return "in progress";
};

const makeTileData = (
  guesses: Guess[],
  wordLength: number,
  maxGuesses: number
) => {
  let tileData: TileData[][] = [];

  for (let guessNum = 0; guessNum < maxGuesses; guessNum++) {
    // Past Guess
    if (guessNum < guesses.length - 1) {
      const guess = guesses[guessNum];
      tileData.push([]);
      for (let i = 0; i < wordLength; i++) {
        tileData[guessNum].push({
          letter: guess.word[i],
          result: guess.results?.[i],
        });
      }
    }
    // Current Guess
    else if (guessNum === guesses.length - 1) {
      const guess = guesses[guessNum].word;
      tileData.push(
        guess
          .padEnd(wordLength, " ")
          .split("")
          .map((letter) => ({
            letter: letter,
          }))
      );
    }
    // Padding
    else {
      tileData.push(Array(wordLength).fill({ letter: " " }));
    }
  }

  return tileData;
};

const getMaxGuesses = (wordLength: number) => {
  return 11 - wordLength;
};

export const useGameState = (
  gameMode: GameMode,
  wordLength: number,
  setSearchParams: SetURLSearchParams
) => {
  const { getNextWord, checkGuess } = useWordQueue(
    gameMode,
    wordLength,
    setSearchParams
  );
  const [score, setScore] = useState(0);
  const maxGuesses = getMaxGuesses(wordLength);

  const { guesses, resetGuesses, handleGuessInput } = useGuesses(
    wordLength,
    checkGuess
  );

  const gameState = getGameState(guesses, maxGuesses);
  const resetGameState = () => {
    getNextWord();
    resetGuesses();
  };

  const { handleInput } = useInputHandler(
    gameMode,
    gameState,
    handleGuessInput,
    resetGameState,
    setScore
  );

  return {
    tileData: makeTileData(guesses, wordLength, maxGuesses),
    handleInput,
    gameState,
    score,
  };
};
