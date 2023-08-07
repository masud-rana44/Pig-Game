function CurrentScore({ currentScore }) {
  return (
    <div className="current">
      <p className="current-label">Current</p>
      <p className="current-score">{currentScore}</p>
    </div>
  );
}

export default CurrentScore;
