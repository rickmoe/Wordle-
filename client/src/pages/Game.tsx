import { useSearchParams } from "react-router-dom";
import { GameMode } from "../types";
import { useGameState } from "../hooks/useGameState";
import GameDisplay from "../components/GameDisplay";
import Keyboard from "../components/Keyboard";
import Scoreboard from "../components/Scoreboard";
import "./Game.css";

interface GameProps {
  mode: GameMode;
}

const Game = ({ mode }: GameProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const wordLength = parseInt(searchParams.get("word-length") ?? "5");
  console.log(wordLength);

  const { tileData, handleInput, gameState, score } = useGameState(
    mode,
    wordLength
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
