import { Link } from "react-router-dom";
import { DisplayMode } from "../../types/types";
import "./Navbar.css";

interface NavbarProps {
  displayMode: DisplayMode;
  toggleDisplayMode: () => void;
}

const Navbar = ({ displayMode, toggleDisplayMode }: NavbarProps) => {
  return (
    <nav>
      <Link to="/" className="nav-title">
        Wordle<b>+</b>
      </Link>
      <button className="theme-button" onClick={toggleDisplayMode}>
        {displayMode}
      </button>
    </nav>
  );
};

export default Navbar;
