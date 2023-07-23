import GameTile from "./GameTile";
import "./GameDisplay.css";

interface GameDisplayProps {
  guesses: string[];
  currentGuess: string;
}

const GameDisplay = (props: GameDisplayProps) => {
  return (
    <section className="game-display">
      {props.guesses.map((guess) => (
        <div className="tile-row">
          {guess.split("").map((letter, index) => (
            <GameTile key={`${guess}[${index}]`} letter={letter} />
          ))}
        </div>
      ))}
      <div className="tile-row">
        {props.currentGuess.split("").map((letter, index) => (
          <GameTile key={`${props.currentGuess}[${index}]`} letter={letter} />
        ))}
      </div>
    </section>
  );
};

export default GameDisplay;
