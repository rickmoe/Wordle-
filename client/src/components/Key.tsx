import "./Key.css";

interface KeyProps {
  letter: string;
  onClick: (letter: string) => void;
  className?: string;
}

const Key = (props: KeyProps) => {
  let display: string = props.letter;
  if (props.letter === ">") display = "enter";
  if (props.letter === "<") display = "del";

  return (
    <button
      className={props.className}
      id={display}
      onClick={() => props.onClick(props.letter)}
    >
      {display}
    </button>
  );
};

export default Key;
