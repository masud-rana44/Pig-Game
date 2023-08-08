import { memo } from "react";
import CurrentScore from "./CurrentScore";

function Player({ name, score, currentScore, isActive, isWinner }) {
  return (
    <section
      className={`player ${isActive ? "player--active" : ""} ${
        isWinner ? "player--winner" : ""
      }`}
    >
      <h2 className="name">{name}</h2>
      <p className="score">{score}</p>
      <CurrentScore currentScore={currentScore} />
    </section>
  );
}

export default memo(Player);
