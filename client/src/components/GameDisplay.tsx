import { Guess, TileData } from "../types";
import GameTile from "./GameTile";
import "./GameDisplay.css";

const makeTileData = (
  guesses: Guess[],
  wordLength: number,
  maxGuesses: number
) => {
  let tileData: TileData[][] = [];

  for (let guessNum = 0; guessNum < maxGuesses; guessNum++) {
    // Past Guess
    if (guessNum < guesses.length - 1) {
      const guess = guesses[guessNum];
      tileData.push([]);
      for (let i = 0; i < wordLength; i++) {
        tileData[guessNum].push({
          letter: guess.word[i],
          result: guess.results != "invalid" ? guess.results?.[i] : undefined,
        });
      }
    }
    // Current Guess
    else if (guessNum === guesses.length - 1) {
      const guess = guesses[guessNum].word;
      tileData.push(
        guess
          .padEnd(wordLength, " ")
          .split("")
          .map((letter) => ({
            letter: letter,
          }))
      );
    }
    // Padding
    else {
      tileData.push(Array(wordLength).fill({ letter: " " }));
    }
  }

  return tileData;
};

const splitToColumns = (
  tileData: TileData[][]
): { columns: TileData[][][]; colSize: number } => {
  if (tileData[0].length > 2)
    return { columns: [tileData], colSize: tileData.length };
  // Split small word lengths into columns for better visibility
  const colSize = Math.ceil(tileData.length / 2);
  const column1 = tileData.slice(0, colSize);
  const column2 = tileData
    .slice(colSize)
    .concat(tileData.length % 2 ? [[]] : []);
  return { columns: [column1, column2], colSize };
};

interface GameDisplayProps {
  guesses: Guess[];
  wordLength: number;
  maxGuesses: number;
}

const GameDisplay = ({ guesses, wordLength, maxGuesses }: GameDisplayProps) => {
  const tileData = makeTileData(guesses, wordLength, maxGuesses);
  const { columns, colSize } = splitToColumns(tileData);
  const isSplit = columns.length > 1;

  return (
    <section className="game-display">
      {columns.map((columnData, colNum) => (
        <section
          key={colNum}
          className={"game-display-column" + (isSplit ? " split" : "")}
        >
          {columnData.map((tileRow, rowNum) => {
            const guessNum = colNum * colSize + rowNum;
            return (
              <div
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
              </div>
            );
          })}
        </section>
      ))}
    </section>
  );
};

export default GameDisplay;
