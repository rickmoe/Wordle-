import GameTile from "./GameTile";
import "./GameDisplay.css";

type TileData = { letter: string; result?: "green" | "yellow" | "gray" };
interface GameDisplayProps {
  tileData: TileData[][];
}

const GameDisplay = (props: GameDisplayProps) => {
  return (
    <section className="game-display">
      {props.tileData.map((tileRow) => (
        <div className="tile-row">
          {tileRow.map((tile, index) => (
            <GameTile
              key={`${tileRow.map((tile) => tile.letter).join()}[${index}]`}
              letter={tile.letter}
              result={tile.result}
            />
          ))}
        </div>
      ))}
    </section>
  );
};

export default GameDisplay;
