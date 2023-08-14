import { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

interface HomeProps {
  wordLengthBounds: { min: number; max: number };
}

const Home = ({ wordLengthBounds: { min, max } }: HomeProps) => {
  const [wordLength, setWordLength] = useState(5);

  return (
    <section className="home">
      <h1 className="title">Wordle+</h1>
      <Link to="/daily" className="button">
        Daily
      </Link>
      <Link to={`/endless?word-length=${wordLength}`} className="button">
        Endless ({wordLength} Letter Words)
      </Link>
      <input
        type="range"
        value={wordLength}
        onChange={(event) => setWordLength(parseInt(event.target.value))}
        min={min}
        max={max}
      />
    </section>
  );
};

export default Home;
