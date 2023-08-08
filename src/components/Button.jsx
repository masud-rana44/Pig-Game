function Button({ text, emoji, type, onClick, isComputerActive }) {
  return (
    <a
      src="#"
      className={`btn btn--${type} ${isComputerActive ? "hidden" : ""}`}
      onClick={onClick}
    >
      {emoji} {text}
    </a>
  );
}

export default Button;
