import React, { useState } from "react";
import ChoiceButtons from "./components/ChoiceButtons";
import StatsPanel from "./components/StatsPanel";
import "./styles/App.css";

function App() {
  const [playerData, setPlayerData] = useState({
    creativity: 0,
    kindness: 0,
    adventure: 0,
    choices: [],
  });

  const handleChoice = async (choice) => {
    const response = await fetch("/api/game/make_choice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ choice }),
    });
    const data = await response.json();
    setPlayerData(data.playerData);
  };

  return (
    <div className="App">
      <h1>The Echoes of You</h1>
      <ChoiceButtons onChoice={handleChoice} />
      <StatsPanel stats={playerData} />
    </div>
  );
}

export default App;
