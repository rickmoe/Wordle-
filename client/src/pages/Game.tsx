import { useEffect } from "react";
import GameDisplay from "../components/GameDisplay";
import Keyboard from "../components/Keyboard";
import { useGuess } from "../hooks/useGuess";
import "./Game.css";

const Game = () => {
  const guessLength = 5;
  const { guesses, currentGuess, handleInput } = useGuess(guessLength);

  useEffect(() => console.log("UPDATED!!!", currentGuess), [currentGuess]);

  return (
    <>
      <GameDisplay guesses={guesses} currentGuess={currentGuess} />
      <Keyboard handleInput={handleInput} />
    </>
  );
};

export default Game;
