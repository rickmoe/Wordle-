import { useEffect, useState } from "react";
import { SetURLSearchParams } from "react-router-dom";
import { GameMode, Result } from "../types/";
import { getDailyWord, getWords } from "../api/api";

const MIN_WORDS_STORED = 3;
const FETCH_BATCH_SIZE = 10;
let wordQueue: string[] = [];

const fetchWords = async (wordLength: number) => {
  const newWords = await getWords(wordLength, FETCH_BATCH_SIZE);
  wordQueue.push(...newWords);
};

const fetchDailyWord = async () => {
  const dailyWord = await getDailyWord();
  wordQueue.push(dailyWord);
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

export const useWordQueue = (
  gameMode: GameMode,
  wordLength: number,
  setSearchParams: SetURLSearchParams
) => {
  const [targetWord, setTargetWord] = useState("");

  const getNextWord = () => {
    setTargetWord(wordQueue.shift() ?? "");
    if (gameMode === "endless" && wordQueue.length < MIN_WORDS_STORED)
      fetchWords(wordLength);
  };

  useEffect(() => {
    if (gameMode === "endless") fetchWords(wordLength).then(getNextWord);
    if (gameMode === "daily")
      fetchDailyWord().then(() => {
        setSearchParams((params) => {
          const newParams = new URLSearchParams(params);
          newParams.set("word-length", wordQueue[0].length.toString());
          return newParams;
        });
        getNextWord();
      });
    return clearQueue;
  }, [wordLength]);

  return {
    getNextWord,
    checkGuess: (guess: string) => checkGuess(guess, targetWord),
  };
};
