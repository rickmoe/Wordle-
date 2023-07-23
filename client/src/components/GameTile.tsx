import "./GameTile.css";

interface GameTileProps {
  letter: string;
}

const GameTile = (props: GameTileProps) => {
  return (
    <div className={"game-tile" + (props.letter !== " " ? " filled" : "")}>
      <p className="game-text">{props.letter}</p>
    </div>
  );
};

export default GameTile;
