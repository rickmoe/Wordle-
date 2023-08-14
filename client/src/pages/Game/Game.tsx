import { useSearchParams } from "react-router-dom";
import { GameMode } from "../../types/types";
import { useGameState } from "../../hooks/useGameState";
import GameDisplay from "../../components/GameDisplay/GameDisplay";
import Keyboard from "../../components/Keyboard/Keyboard";
import Scoreboard from "../../components/Scoreboard/Scoreboard";
import "./Game.css";

const getWordLength = (
  searchParams: URLSearchParams,
  min: number,
  max: number
): number => {
  const wordLengthString = searchParams.get("word-length");
  const wordLength = wordLengthString == null ? 5 : parseInt(wordLengthString);
  if (wordLength < min) return min;
  if (wordLength > max) return max;
  return wordLength;
};

const getMaxGuesses = (wordLength: number) => {
  return 11 - wordLength;
};

interface GameProps {
  mode: GameMode;
  wordLengthBounds: { min: number; max: number };
}

const Game = ({ mode, wordLengthBounds: { min, max } }: GameProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const wordLength = getWordLength(searchParams, min, max);
  const maxGuesses = getMaxGuesses(wordLength);

  const { guesses, handleInput, gameState, score } = useGameState(
    mode,
    wordLength,
    maxGuesses,
    setSearchParams
  );

  return (
    <section className={`game ${mode}`}>
      {mode === "endless" && (
        <Scoreboard
          gameState={gameState}
          handleInput={handleInput}
          score={score}
        />
      )}
      <GameDisplay
        guesses={guesses}
        wordLength={wordLength}
        maxGuesses={maxGuesses}
      />
      <Keyboard handleInput={handleInput} />
    </section>
  );
};

export default Game;
