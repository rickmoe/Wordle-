import { useCallback } from "react";
import "./Key.css";

const getKeyDisplay = (keyName: string): string => {
  if (keyName === "Enter") return "enter";
  if (keyName === "Backspace") return "del";
  return keyName;
};

interface KeyProps {
  keyName: string;
}

const Key = ({ keyName }: KeyProps) => {
  const pressKey = useCallback(() => {
    document.dispatchEvent(new KeyboardEvent("keydown", { key: keyName }));
  }, [keyName]);

  return (
    <button
      className={"key " + (/^\w$/.test(keyName) ? "span-2" : "span-3")}
      id={keyName}
      onClick={pressKey}
    >
      {getKeyDisplay(keyName)}
    </button>
  );
};

export default Key;
