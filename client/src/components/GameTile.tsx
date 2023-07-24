import "./GameTile.css";

interface GameTileProps {
  letter: string;
  result?: "green" | "yellow" | "gray";
}

const GameTile = (props: GameTileProps) => {
  let classes = "game-tile " + (props.result ?? "");
  if (props.letter != " ") classes += " filled";

  return (
    <div className={classes}>
      <p className="game-text">{props.letter}</p>
    </div>
  );
};

export default GameTile;
