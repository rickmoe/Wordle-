import { useEffect } from "react";
import Key from "./Key";
import "./Keyboard.css";

interface KeyboardProps {
  handleInput: (letter: string) => void;
}

const Keyboard = (props: KeyboardProps) => {
  /* '>' represents the enter key while '<' represents delete */
  const keyRows = ["qwertyuiop", "asdfghjkl", ">zxcvbnm<"];

  useEffect(() => {
    // const cbRef = useRef(detectKeyDown);
    document.addEventListener("keydown", detectKeyDown);
    return () => document.removeEventListener("keydown", detectKeyDown);
  }, []);

  const detectKeyDown = (event: KeyboardEvent) => {
    //   event.preventDefault();
    // console.log(event.key);
    if (/^[a-z]$/i.test(event.key)) return props.handleInput(event.key);
    if (event.key === "Backspace") return props.handleInput("<");
    if (event.key === "Enter") return props.handleInput(">");
  };

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
