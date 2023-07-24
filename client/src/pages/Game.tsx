import { useGuesses } from "../hooks/useGuesses";
import GameDisplay from "../components/GameDisplay";
import Keyboard from "../components/Keyboard";
import "./Game.css";

const Game = () => {
  const wordLength = 5;
  const maxGuesses = 6;
  const { guesses, handleInput } = useGuesses(wordLength);

  type TileData = { letter: string; result?: "green" | "yellow" | "gray" };
  const makeTileData = () => {
    let tileData: TileData[][] = guesses.past.map(({ word, results }) => {
      const tileRowData = [];
      for (let i = 0; i < wordLength; i++) {
        tileRowData.push({ letter: word[i], result: results[i] });
      }
      return tileRowData;
    });
    tileData.push(
      guesses.current
        .padEnd(wordLength, " ")
        .split("")
        .map((letter) => ({
          letter: letter,
        }))
    );
    return tileData.concat(
      Array(maxGuesses - guesses.past.length - 1).fill(
        Array(wordLength).fill({ letter: " " })
      )
    );
  };

  return (
    <>
      <GameDisplay tileData={makeTileData()} />
      <Keyboard handleInput={handleInput} />
    </>
  );
};

export default Game;
