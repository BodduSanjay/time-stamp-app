import "./index.css";

const ButtonItem = ({ each, isActive, timeFrameButton }) => {
  const toggleName = isActive ? "active-button" : "normal-button";
  const handleClick = () => {
    timeFrameButton(each.msg, each.id);
  };
  return (
    <button
      className={`${each.msg === "pdf" ? "normal-button" : toggleName}`}
      onClick={handleClick}
    >
      {each.displayText}
    </button>
  );
};

export default ButtonItem;
