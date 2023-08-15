import Key from "./Key";
import "./Keyboard.css";

// Keyboard represented as abbreviations for compactness
const ABBREVIATED_KEYS = "qwertyuiopasdfghjkl>zxcvbnm<";
const keyAbbreviationToName = (abbr: string): string => {
  if (abbr === ">") return "Enter";
  if (abbr === "<") return "Backspace";
  return abbr;
};

const Keyboard = () => {
  return (
    <section className="keyboard">
      {ABBREVIATED_KEYS.split("").map((keyAbbr) => (
        <Key key={keyAbbr} keyName={keyAbbreviationToName(keyAbbr)} />
      ))}
    </section>
  );
};

export default Keyboard;
