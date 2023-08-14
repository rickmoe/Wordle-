import { GameMode } from "../../types/types";
import { useGameState } from "../../hooks/useGameState";
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
  const { guesses, handleInput, gameState, score } = useGameState(
    mode,
    wordLength,
    maxGuesses,
    setWordLength
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
