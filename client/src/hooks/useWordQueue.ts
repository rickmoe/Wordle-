import { useEffect, useState } from "react";
import { Result } from "../types";
import { getWords } from "../api/api";

const MIN_WORDS_STORED = 3;
let wordQueue: string[] = [];

const fetchWords = async (wordLength: number) => {
  const newWords = await getWords(wordLength);
  wordQueue.push(...newWords);
};

const clearQueue = () => {
  wordQueue = [];
};

const checkGuess = (guess: string, targetWord: string): Result[] => {
  if (!targetWord) return [];
  const letterCount: { [key: string]: number } = targetWord
    .split("")
    .reduce((count: { [key: string]: number }, letter: string) => {
      count[letter] = count[letter] ? count[letter] + 1 : 1;
      return count;
    }, {});
  const result: Result[] = Array(guess.length).fill("gray");
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === targetWord[i]) {
      letterCount[guess[i]]--;
      result[i] = "green";
    }
  }
  for (let i = 0; i < guess.length; i++) {
    if (result[i] !== "green" && letterCount[guess[i]] > 0) {
      letterCount[guess[i]]--;
      result[i] = "yellow";
    }
  }
  return result;
};

export const useWordQueue = (wordLength: number) => {
  const [targetWord, setTargetWord] = useState("");

  const getNextWord = () => {
    setTargetWord(wordQueue.shift() ?? "");
    if (wordQueue.length < MIN_WORDS_STORED) fetchWords(wordLength);
  };

  useEffect(() => {
    fetchWords(wordLength).then(getNextWord);
    return clearQueue;
  }, [wordLength]);

  return {
    getNextWord,
    checkGuess: (guess: string) => checkGuess(guess, targetWord),
  };
};
