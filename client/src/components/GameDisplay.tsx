import { TileData } from "../types";
import GameTile from "./GameTile";
import "./GameDisplay.css";

const splitToColumns = (tileData: TileData[][]): TileData[][][] => {
  if (tileData[0].length > 2) return [tileData];
  // Split small word lengths into columns for better visibility
  const midIndex = Math.ceil(tileData.length / 2);
  const column1 = tileData.slice(0, midIndex);
  const column2 = tileData
    .slice(midIndex)
    .concat(tileData.length % 2 ? [[]] : []);
  return [column1, column2];
};

interface GameDisplayProps {
  tileData: TileData[][];
}

const GameDisplay = ({ tileData }: GameDisplayProps) => {
  const displayColumns = splitToColumns(tileData);
  const isSplit = displayColumns.length > 1;

  return (
    <section className="game-display">
      {displayColumns.map((columnData) => (
        <section className={"game-display-column" + (isSplit ? " split" : "")}>
          {columnData.map((tileRow, rowNum) => (
            <div key={rowNum} className="tile-row">
              {tileRow.map((tile, colNum) => (
                <GameTile
                  key={colNum}
                  letter={tile.letter}
                  result={tile.result}
                />
              ))}
            </div>
          ))}
        </section>
      ))}
    </section>
  );
};

export default GameDisplay;
