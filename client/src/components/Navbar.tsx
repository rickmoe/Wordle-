import { Link } from "react-router-dom";
import { DisplayMode } from "../types";
import "./Navbar.css";

interface NavbarProps {
  displayMode: DisplayMode;
  toggleDisplayMode: () => void;
}

const Navbar = ({ displayMode, toggleDisplayMode }: NavbarProps) => {
  return (
    <nav>
      <h1>
        <Link to="/">
          Wordle<b>+</b>
        </Link>
      </h1>
      <button className="light-dark" onClick={toggleDisplayMode}>
        {displayMode}
      </button>
    </nav>
  );
};

export default Navbar;
