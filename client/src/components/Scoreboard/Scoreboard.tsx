import { GameState } from "../../types/types";
import "./Scoreboard.css";

const pressEnter = () => {
  document.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
};

interface ScoreboardProps {
  gameState: GameState;
  score: number;
}

const Scoreboard = ({ gameState, score }: ScoreboardProps) => {
  return (
    <section className="scoreboard">
      {gameState === "lose" && (
        <button className="reset" onClick={pressEnter}>
          Reset
        </button>
      )}
      <p>Score: {score}</p>
      {gameState === "win" && (
        <button className="next" onClick={pressEnter}>
          Next
        </button>
      )}
    </section>
  );
};

export default Scoreboard;
