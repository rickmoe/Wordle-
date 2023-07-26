import { useEffect, useRef } from "react";
import { getWords } from "../api/api";

type Result = "green" | "yellow" | "gray";

export const useWordManager = (wordLength: number) => {
  console.log("useWordManager");
  const MIN_WORDS_STORED = 2;
  const wordQueue = useRef<string[]>([]);
  // Ensures no updated to wordQueue are requested while fetching
  const wordQueueLock = useRef(false);

  const enqueueWords = (newWords: string[]) => {
    wordQueue.current = [...wordQueue.current, ...newWords];
    console.log("Enqueue", wordQueue);
  };
  const dequeueWord = () => {
    console.log("Dequeue", wordQueue);
    wordQueue.current = wordQueue.current.slice(1);
    if (wordQueue.current.length <= MIN_WORDS_STORED && !wordQueueLock.current)
      fetchNewWords();
  };

  const fetchNewWords = async () => {
    wordQueueLock.current = true;
    enqueueWords(await getWords());
    wordQueueLock.current = false;
  };

  const checkGuess = (guess: string): Result[] => {
    console.log("Check", wordQueue.current);
    if (wordQueue.current.length <= 0) return [];
    const letterCount: { [key: string]: number } = wordQueue.current[0]
      .split("")
      .reduce((count: { [key: string]: number }, letter: string) => {
        count[letter] = count[letter] ? count[letter] + 1 : 1;
        return count;
      }, {});
    const result: Result[] = Array(wordLength).fill("gray");
    for (let i = 0; i < wordLength; i++) {
      if (guess[i] === wordQueue.current[0][i]) {
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
    if (guess === wordQueue.current[0]) dequeueWord();
    return result;
  };

  useEffect(() => {
    if (wordQueue.current.length <= MIN_WORDS_STORED && !wordQueueLock.current)
      fetchNewWords();
  }, []);

  return { checkGuess };
};
