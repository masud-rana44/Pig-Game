import Player from "./components/Player";
import Button from "./components/Button";

import diceImg from "./assets/img/dice-6.png";

function App() {
  return (
    <div className="app">
      <main className="playground">
        <Player name="Player 1" score={0} isActive />
        <Player name="Player 2" score={0} />
        <img className="dice" src={diceImg} />
        <Button text="New game" emoji="🔄" type="new" />
        <Button text="Roll dice" emoji="🎲" type="roll" />
        <Button text="Hold" emoji="📥" type="hold" />
      </main>
    </div>
  );
}

export default App;
