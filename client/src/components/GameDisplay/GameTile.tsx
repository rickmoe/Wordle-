import { Result } from "../../types/types";
import "./GameTile.css";

interface GameTileProps {
  tileIndex: number;
  letter: string;
  result?: Result;
}

const GameTile = ({ tileIndex, letter, result }: GameTileProps) => {
  let classes = "game-tile";
  let delay = 0;
  if (result) {
    classes += " " + result;
    delay = tileIndex * 0.1 + 0.1;
  } else if (letter != " ") classes += " filled";

  return (
    <div className={classes} style={{ animationDelay: `${delay}s` }}>
      <p>{letter}</p>
    </div>
  );
};

export default GameTile;
