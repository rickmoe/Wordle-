import { useSearchParams } from "react-router-dom";

const clamp = (num: number, min: number, max: number) => {
  return Math.min(Math.max(num, min), max);
};

export const useWordParams = (min: number, max: number) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setWordLength = (length: number) =>
    setSearchParams((params) => {
      const newParams = new URLSearchParams(params);
      newParams.set("word-length", length.toString());
      return newParams;
    });

  const wordLengthString = searchParams.get("word-length") ?? "5";
  const wordLength = clamp(parseInt(wordLengthString), min, max);

  const maxGuesses = 11 - wordLength;

  return { wordLength, maxGuesses, setWordLength };
};
