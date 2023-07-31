import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <h1>
        <Link to="/">
          Wordle<b>+</b>
        </Link>
      </h1>
    </nav>
  );
};

export default Navbar;
