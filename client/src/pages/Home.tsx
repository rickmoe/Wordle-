import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <section className="home">
      <h1>Wordle+</h1>
      <Link to="/daily" className="button">
        Daily
      </Link>
      <Link to="/endless" className="button">
        Endless
      </Link>
    </section>
  );
};

export default Home;
