function Button({ text, emoji, type }) {
  return (
    <a src="#" className={`btn btn--${type}`}>
      {emoji} {text}
    </a>
  );
}

export default Button;
