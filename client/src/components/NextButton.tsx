import "./NextButton.css";

interface NextButtonProps {
  onClick: VoidFunction;
}

const NextButton = (props: NextButtonProps) => {
  return (
    <button className="next-button" onClick={props.onClick}>
      Next
    </button>
  );
};

export default NextButton;
