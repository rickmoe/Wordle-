import { GameMode } from "../types";
import { useGameState } from "../hooks/useGameState";
import GameDisplay from "../components/GameDisplay";
import Keyboard from "../components/Keyboard";
import Scoreboard from "../components/Scoreboard";
import "./Game.css";

const wordLength = 5;
const maxGuesses = 6;

interface GameProps {
  mode: GameMode;
}

const Game = ({ mode }: GameProps) => {
  const { tileData, handleInput, gameState, score } = useGameState(
    mode,
    wordLength,
    maxGuesses
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
