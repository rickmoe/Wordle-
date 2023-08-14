import { Guess } from "../../types/types";
import GameTile from "./GameTile";
import "./GameDisplay.css";
import { useTileData } from "../../hooks/useTileData";

interface GameDisplayProps {
  guesses: Guess[];
  wordLength: number;
  maxGuesses: number;
}

const GameDisplay = ({ guesses, wordLength, maxGuesses }: GameDisplayProps) => {
  const { columns, colSize, isSplit } = useTileData(
    guesses,
    wordLength,
    maxGuesses
  );

  return (
    <section className="game-display">
      {columns.map((column, colNum) => (
        <section
          key={colNum}
          className={"game-display-column" + (isSplit ? " split" : "")}
        >
          {column.map((tileRow, rowNum) => {
            const guessNum = colNum * colSize + rowNum;
            return (
              <section
                key={guessNum}
                className={
                  "tile-row " +
                  guessNum +
                  (guesses.length > guessNum &&
                  guesses[guessNum].results === "invalid"
                    ? " invalid"
                    : "")
                }
              >
                {tileRow.map((tile, letterNum) => (
                  <GameTile
                    key={letterNum}
                    letter={tile.letter}
                    result={tile.result}
                  />
                ))}
              </section>
            );
          })}
        </section>
      ))}
    </section>
  );
};

export default GameDisplay;
