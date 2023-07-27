import { getWords } from "../api/api";

type Result = "green" | "yellow" | "gray";

export const MIN_WORDS_STORED = 2;
let wordQueue: string[] = [];

export const fetchWords = async () => {
  const newWords = await getWords();
  wordQueue.push(...newWords);
};

export const fetchWordsIfNeeded = async () => {
  if (wordQueue.length < MIN_WORDS_STORED) fetchWords();
};

export const dequeueWord = () => {
  wordQueue.shift();
};

export const checkGuess = (guess: string): Result[] => {
  if (wordQueue.length <= 0) return [];
  const letterCount: { [key: string]: number } = wordQueue[0]
    .split("")
    .reduce((count: { [key: string]: number }, letter: string) => {
      count[letter] = count[letter] ? count[letter] + 1 : 1;
      return count;
    }, {});
  const result: Result[] = Array(guess.length).fill("gray");
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === wordQueue[0][i]) {
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

// To populate the queue initially
fetchWords();
