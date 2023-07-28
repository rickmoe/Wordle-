import { useReducer } from "react";
import { GameState } from "../types";
import "./Scoreboard.css";

const scoreReducer = (score: number, action: { type: string }) => {
  console.log(action);
  switch (action.type) {
    case "incrememnt":
      return score + 1;
    case "reset":
      return 0;
    default:
      return score;
  }
};

const handleNextButton = (
  dispatch: React.Dispatch<{ type: string }>,
  handleInput: (letter: string) => void
) => {
  console.log("next");
  dispatch({ type: "increment" });
  handleInput(">");
};

const handleBackButton = (
  dispatch: React.Dispatch<{ type: string }>,
  handleInput: (letter: string) => void
) => {
  console.log("back");
  dispatch({ type: "reset" });
  handleInput(">");
};

interface ScoreboardProps {
  gameState: GameState;
  handleInput: (letter: string) => void;
}

const Scoreboard = ({ gameState, handleInput }: ScoreboardProps) => {
  console.log("scoreboard");
  const [score, dispatchScore] = useReducer(scoreReducer, 0);

  return (
    <section className="scoreboard">
      {gameState === "lose" && (
        <button
          className="back"
          onClick={() => handleBackButton(dispatchScore, handleInput)}
        >
          Back
        </button>
      )}
      <p>Score: {score}</p>
      {gameState === "win" && (
        <button
          className="next"
          onClick={() => handleNextButton(dispatchScore, handleInput)}
        >
          Next
        </button>
      )}
    </section>
  );
};

export default Scoreboard;
