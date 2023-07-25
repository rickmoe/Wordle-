import GameTile from "./GameTile";
import "./GameDisplay.css";

type TileData = { letter: string; result?: "green" | "yellow" | "gray" };
interface GameDisplayProps {
  tileData: TileData[][];
}

const GameDisplay = (props: GameDisplayProps) => {
  return (
    <section className="game-display">
      {props.tileData.map((tileRow, rowNum) => (
        <div key={rowNum} className="tile-row">
          {tileRow.map((tile, colNum) => (
            <GameTile key={colNum} letter={tile.letter} result={tile.result} />
          ))}
        </div>
      ))}
    </section>
  );
};

export default GameDisplay;
