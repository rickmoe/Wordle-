import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <section className="home">
      <h1>Wordle+</h1>
      <Link to="/game" className="button">
        Daily
      </Link>
      <Link to="/game" className="button">
        Endless
      </Link>
    </section>
  );
};

export default Home;
