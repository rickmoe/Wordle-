import GameDisplay from "../components/GameDisplay";
import Keyboard from "../components/Keyboard";
import { useGameState } from "../hooks/useGameState";

const Game = () => {
  console.log("Game");
  const wordLength = 5;
  const maxGuesses = 6;
  const { tileData, handleInput } = useGameState(wordLength, maxGuesses);

  return (
    <>
      <GameDisplay tileData={tileData} />
      <Keyboard handleInput={handleInput} />
    </>
  );
};

export default Game;
