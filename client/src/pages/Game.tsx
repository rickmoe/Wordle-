import { useSearchParams } from "react-router-dom";
import { GameMode } from "../types";
import { useGameState } from "../hooks/useGameState";
import GameDisplay from "../components/GameDisplay";
import Keyboard from "../components/Keyboard";
import Scoreboard from "../components/Scoreboard";
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

interface GameProps {
  mode: GameMode;
  minWordLength: number;
  maxWordLength: number;
}

const Game = ({ mode, minWordLength, maxWordLength }: GameProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const wordLength = getWordLength(searchParams, minWordLength, maxWordLength);

  const { tileData, handleInput, gameState, score } = useGameState(
    mode,
    wordLength,
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
      <GameDisplay tileData={tileData} />
      <Keyboard handleInput={handleInput} />
    </section>
  );
};

export default Game;
