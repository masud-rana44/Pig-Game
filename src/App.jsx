import { useReducer } from "react";

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

const initialState = {
  diceImg: null,
  playing: true,
  winner: null,
  activePlayer: 0,
  scores: [0, 0],
  currentScore: 0,
};

const WIN_SCORE = 20;

function reducer(state, action) {
  switch (action.type) {
    case "diceUpdate": {
      return { ...state, diceImg: action.payload };
    }
    case "currentScoreUpdate":
      return { ...state, currentScore: state.currentScore + action.payload };
    case "playerSwitch":
      return {
        ...state,
        currentScore: 0,
        activePlayer: state.activePlayer === 0 ? 1 : 0,
      };
    case "totalScoreUpdate":
      // eslint-disable-next-line no-case-declarations
      const newScores = [...state.scores];
      newScores[state.activePlayer] += state.currentScore;

      return { ...state, scores: newScores };
    case "checkedWinner":
      return state.scores[state.activePlayer] >= WIN_SCORE
        ? {
            ...state,
            playing: false,
            winner: state.activePlayer,
            currentScore: 0,
            diceImg: null,
            activePlayer: null,
          }
        : {
            ...state,
            currentScore: 0,
            activePlayer: state.activePlayer === 0 ? 1 : 0,
          };
    case "restart":
      return {
        ...state,
        playing: true,
        winner: null,
        currentScore: 0,
        activePlayer: 0,
        scores: [0, 0],
      };
    default:
      throw new Error("Unknown action type");
  }
}

function App() {
  const [
    { diceImg, playing, winner, activePlayer, scores, currentScore },
    dispatch,
  ] = useReducer(reducer, initialState);

  function handleRoll() {
    if (!playing) return;

    const dice = Math.floor(Math.random() * 6) + 1;
    dispatch({ type: "diceUpdate", payload: img[dice] });

    if (dice !== 1) {
      dispatch({ type: "currentScoreUpdate", payload: dice });
    } else {
      dispatch({ type: "playerSwitch" });
    }
  }

  function handleHold() {
    if (!playing) return;

    dispatch({ type: "totalScoreUpdate" });
    dispatch({ type: "checkedWinner" });
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
        <Button
          text="New game"
          emoji="🔄"
          type="new"
          onClick={() => dispatch({ type: "restart" })}
        />
        <Button text="Roll dice" emoji="🎲" type="roll" onClick={handleRoll} />
        <Button text="Hold" emoji="📥" type="hold" onClick={handleHold} />
      </main>
    </div>
  );
}

export default App;
