import { useKeydownHandler } from "../hooks/useKeydownHandler";
import Key from "./Key";
import "./Keyboard.css";

interface KeyboardProps {
  handleInput: (letter: string) => void;
}

const Keyboard = (props: KeyboardProps) => {
  // '>' represents the enter key while '<' represents delete
  const keyRows = ["qwertyuiop", "asdfghjkl", ">zxcvbnm<"];
  useKeydownHandler(props.handleInput);

  return (
    <section className="keyboard">
      {keyRows.map((keys) =>
        keys
          .split("")
          .map((letter) => (
            <Key
              key={letter}
              letter={letter}
              className={"key " + (/\w/.test(letter) ? "span-2" : "span-3")}
              onClick={props.handleInput}
            />
          ))
      )}
    </section>
  );
};

export default Keyboard;
