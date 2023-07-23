interface GameDisplayProps {
  guesses: string[];
  currentGuess: string;
}

const GameDisplay = (props: GameDisplayProps) => {
  return (
    <>
      {props.guesses.map((guess) => (
        <h1 key={guess}>{guess}</h1>
      ))}
      <h1>{props.currentGuess}</h1>
    </>
  );
};

export default GameDisplay;
