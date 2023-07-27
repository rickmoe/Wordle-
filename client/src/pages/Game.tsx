import { useGameState } from "../hooks/useGameState";
import GameDisplay from "../components/GameDisplay";
import Keyboard from "../components/Keyboard";
import NextButton from "../components/NextButton";
import "./Game.css";
import BackButton from "../components/BackButton";

const wordLength = 5;
const maxGuesses = 6;

const Game = () => {
  const { tileData, handleInput, status } = useGameState(
    wordLength,
    maxGuesses
  );

  return (
    <section className="game">
      <GameDisplay tileData={tileData} />
      <Keyboard handleInput={handleInput} />
      {status === "win" && <NextButton onClick={() => handleInput(">")} />}
      {status === "lose" && <BackButton onClick={() => handleInput(">")} />}
    </section>
  );
};

export default Game;
