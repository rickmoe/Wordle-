import { GameMode } from "../../types/types";
import { useGameManager } from "../../hooks/useGameManager";
import { useWordParams } from "../../hooks/useWordParams";
import GameDisplay from "../../components/GameDisplay/GameDisplay";
import Keyboard from "../../components/Keyboard/Keyboard";
import Scoreboard from "../../components/Scoreboard/Scoreboard";
import "./Game.css";

interface GameProps {
  mode: GameMode;
  wordLengthBounds: { min: number; max: number };
}

const Game = ({ mode, wordLengthBounds: { min, max } }: GameProps) => {
  const { wordLength, maxGuesses, setWordLength } = useWordParams(min, max);
  const { guesses, gameState, score } = useGameManager(
    mode,
    wordLength,
    maxGuesses,
    setWordLength
  );

  return (
    <section className={`game ${mode}`}>
      {mode === "endless" && <Scoreboard gameState={gameState} score={score} />}
      <GameDisplay
        guesses={guesses}
        wordLength={wordLength}
        maxGuesses={maxGuesses}
      />
      <Keyboard />
    </section>
  );
};

export default Game;
