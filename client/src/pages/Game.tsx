import { useGameState } from "../hooks/useGameState";
import GameDisplay from "../components/GameDisplay";
import Keyboard from "../components/Keyboard";
import "./Game.css";

const wordLength = 5;
const maxGuesses = 6;

const Game = () => {
  const { tileData, handleInput } = useGameState(wordLength, maxGuesses);

  return (
    <section className="game">
      <GameDisplay tileData={tileData} />
      <Keyboard handleInput={handleInput} />
    </section>
  );
};

export default Game;
