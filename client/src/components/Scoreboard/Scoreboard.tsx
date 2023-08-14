import { GameState } from "../../types/types";
import "./Scoreboard.css";

interface ScoreboardProps {
  gameState: GameState;
  handleInput: (letter: string) => void;
  score: number;
}

const Scoreboard = ({ gameState, handleInput, score }: ScoreboardProps) => {
  return (
    <section className="scoreboard">
      {gameState === "lose" && (
        <button className="reset" onClick={() => handleInput(">")}>
          Reset
        </button>
      )}
      <p>Score: {score}</p>
      {gameState === "win" && (
        <button className="next" onClick={() => handleInput(">")}>
          Next
        </button>
      )}
    </section>
  );
};

export default Scoreboard;
