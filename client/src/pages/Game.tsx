import { useGuesses } from "../hooks/useGuesses";
import GameDisplay from "../components/GameDisplay";
import Keyboard from "../components/Keyboard";
import "./Game.css";

const Game = () => {
  const wordLength = 5;
  const { guesses, handleInput } = useGuesses(wordLength);

  return (
    <>
      <GameDisplay
        guesses={guesses.past}
        currentGuess={guesses.current.padEnd(wordLength, " ")}
      />
      <Keyboard handleInput={handleInput} />
    </>
  );
};

export default Game;
