import "./BackButton.css";

interface BackButtonProps {
  onClick: VoidFunction;
}

const BackButton = (props: BackButtonProps) => {
  return (
    <button className="back-button" onClick={props.onClick}>
      Back
    </button>
  );
};

export default BackButton;
