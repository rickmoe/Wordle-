import { useCallback } from "react";
import enterIcon from "../../assets/enter.svg";
import deleteIcon from "../../assets/delete.svg";
import "./Key.css";

const getKeyDisplay = (keyName: string): React.ReactNode => {
  if (keyName === "Enter") return <img className="svg" src={enterIcon} />;
  if (keyName === "Backspace") return <img className="svg" src={deleteIcon} />;
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
