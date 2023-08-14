import { useKeydownHandler } from "../../hooks/useKeydownHandler";
import Key from "./Key";
import "./Keyboard.css";

// '>' represents the enter key while '<' represents delete
const KEYS = "qwertyuiopasdfghjkl>zxcvbnm<";

interface KeyboardProps {
  handleInput: (letter: string) => void;
}

const Keyboard = (props: KeyboardProps) => {
  useKeydownHandler(props.handleInput);

  return (
    <section className="keyboard">
      {KEYS.split("").map((letter) => (
        <Key
          key={letter}
          letter={letter}
          className={"key " + (/\w/.test(letter) ? "span-2" : "span-3")}
          onClick={props.handleInput}
        />
      ))}
    </section>
  );
};

export default Keyboard;
