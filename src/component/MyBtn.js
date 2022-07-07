const MyBtn = ({ text, type = "default", onClick }) => {
  const btnType = ["positive", "negative"].includes(type) ? type : "default";

  return (
    <button
      className={["MyBtn", `MyBtn_${btnType}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default MyBtn;
