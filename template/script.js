const player1El = document.getElementById("player--0");
const player2El = document.getElementById("player--1");
const score1El = document.getElementById("score--0");
const score2El = document.getElementById("score--1");
const current1El = document.getElementById("current--0");
const current2El = document.getElementById("current--1");

const btnNew = document.getElementById("btn--new");
const btnRoll = document.getElementById("btn--roll");
const btnHold = document.getElementById("btn--hold");

const diceEl = document.getElementById("dice");

let activePlayer, scores, currentScore, playing;

function init() {
  playing = true;
  activePlayer = 0;
  currentScore = 0;
  scores = [0, 0];

  diceEl.classList.add("hidden");

  current1El.textContent = 0;
  current2El.textContent = 0;
  score1El.textContent = 0;
  score2El.textContent = 0;

  player1El.classList.remove("player--winner");
  player2El.classList.remove("player--winner");
  player1El.classList.add("player--active");
  player2El.classList.remove("player--active");
}
init();

function toggleActivePlayer() {
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  current1El.textContent = 0;
  current2El.textContent = 0;
  player1El.classList.toggle("player--active");
  player2El.classList.toggle("player--active");
}

btnRoll.addEventListener("click", () => {
  if (!playing) return;

  // generate a random dice
  const point = Math.floor(Math.random() * 6) + 1;

  // display the dice
  diceEl.classList.remove("hidden");
  diceEl.src = `./img/dice-${point}.png`;

  // check if the point > 1, or not
  if (point !== 1) {
    currentScore += point;

    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;

    // if 1, switch the player
  } else {
    toggleActivePlayer();
  }
});

btnHold.addEventListener("click", () => {
  if (!playing) return;

  scores[activePlayer] += currentScore;

  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  // Check if score is >= 100 or Not
  if (scores[activePlayer] >= 100) {
    // finish the game
    playing = false;
    diceEl.classList.add("hidden");

    player1El.classList.remove("player--active");
    player2El.classList.remove("player--active");

    current1El.textContent = 0;
    current2El.textContent = 0;

    document
      .getElementById(`player--${activePlayer}`)
      .classList.add("player--winner");
  } else {
    toggleActivePlayer();
  }
});

btnNew.addEventListener("click", init);
