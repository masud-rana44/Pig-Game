import { useState } from "react";

import Player from "./components/Player";
import Button from "./components/Button";
import diceImg_1 from "./assets/img/dice-1.png";
import diceImg_2 from "./assets/img/dice-2.png";
import diceImg_3 from "./assets/img/dice-3.png";
import diceImg_4 from "./assets/img/dice-4.png";
import diceImg_5 from "./assets/img/dice-5.png";
import diceImg_6 from "./assets/img/dice-6.png";

const img = {
  1: diceImg_1,
  2: diceImg_2,
  3: diceImg_3,
  4: diceImg_4,
  5: diceImg_5,
  6: diceImg_6,
};

function App() {
  const [diceImg, setDiceImg] = useState(null);
  const [playing, setPlaying] = useState(true);
  const [activePlayer, setActivePlayer] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [scores, setScores] = useState([0, 0]);
  const [winner, setWinner] = useState(null);

  function switchPlayer() {
    setCurrentScore(0);
    setActivePlayer((curActive) => (curActive === 0 ? 1 : 0));
  }

  function handleRoll() {
    if (!playing) return;

    const dice = Math.floor(Math.random() * 6) + 1;
    setDiceImg(img[dice]);

    if (dice !== 1) {
      setCurrentScore((score) => score + dice);
    } else {
      switchPlayer();
    }
  }

  function handleHold() {
    if (!playing) return;

    setScores((scores) => {
      const newScores = [...scores];
      newScores[activePlayer] = scores[activePlayer] + currentScore;
      return newScores;
    });

    // check if player win or not
    if (scores[activePlayer] + currentScore >= 10) {
      setPlaying(false);
      setWinner(activePlayer);
      setActivePlayer(null);
      setDiceImg(null);
      setCurrentScore(0);
    } else {
      switchPlayer();
    }
  }

  function handleNewGame() {
    setActivePlayer(0);
    setPlaying(true);
    setWinner(null);
    setCurrentScore(0);
    setScores([0, 0]);
  }

  return (
    <div className="app">
      <main className="playground">
        <Player
          name="Player 1"
          score={scores[0]}
          currentScore={activePlayer === 0 ? currentScore : 0}
          isActive={activePlayer === 0}
          isWinner={winner === 0}
        />
        <Player
          name="Player 2"
          score={scores[1]}
          currentScore={activePlayer === 1 ? currentScore : 0}
          isActive={activePlayer === 1}
          isWinner={winner === 1}
        />

        <img className="dice" src={diceImg} />
        <Button text="New game" emoji="🔄" type="new" onClick={handleNewGame} />
        <Button text="Roll dice" emoji="🎲" type="roll" onClick={handleRoll} />
        <Button text="Hold" emoji="📥" type="hold" onClick={handleHold} />
      </main>
    </div>
  );
}

export default App;
