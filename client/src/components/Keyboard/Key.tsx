import { useCallback } from "react";
import { enterIcon, deleteIcon } from "./KeySvgManager";
import "./Key.css";

const getKeyDisplay = (keyName: string): React.ReactNode => {
  if (keyName === "Enter") return enterIcon;
  if (keyName === "Backspace") return deleteIcon;
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
