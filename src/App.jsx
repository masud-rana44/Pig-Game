import Player from "./components/Player";

function App() {
  return (
    <div className="app">
      <main className="playground">
        <Player name="Player 1" score={0} />
        <Player name="Player 2" score={0} />
      </main>
    </div>
  );
}

export default App;
