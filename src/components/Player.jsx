import CurrentScore from "./CurrentScore";

function Player({ name, score, isActive }) {
  return (
    <section className={`player ${isActive ? "player--active" : ""}`}>
      <h2 className="name">{name}</h2>
      <p className="score">{score}</p>
      <CurrentScore currentScore={0} />
    </section>
  );
}

export default Player;
