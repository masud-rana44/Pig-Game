function Button({ text, emoji, type, onClick }) {
  return (
    <a src="#" className={`btn btn--${type}`} onClick={onClick}>
      {emoji} {text}
    </a>
  );
}

export default Button;
