import { useGameState } from "../hooks/useGameState";
import GameDisplay from "../components/GameDisplay";
import Keyboard from "../components/Keyboard";
import Scoreboard from "../components/Scoreboard";
import "./Game.css";

const wordLength = 5;
const maxGuesses = 6;

const Game = () => {
  const { tileData, handleInput, gameState, score } = useGameState(
    wordLength,
    maxGuesses
  );

  return (
    <section className="game">
      <Scoreboard
        gameState={gameState}
        handleInput={handleInput}
        score={score}
      />
      <GameDisplay tileData={tileData} />
      <Keyboard handleInput={handleInput} />
    </section>
  );
};

export default Game;
