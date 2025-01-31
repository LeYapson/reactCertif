import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState("");

  const handleStartQuiz = () => {
    if (playerName.trim() !== "") {
      navigate("/quiz", { state: { playerName } });
    }
  };

  return (
    <div className="home-container">
      <h1>Quel personnage de League of Legends es-tu ?</h1>
      <p>Réponds à quelques questions et découvre quel champion de LoL te correspond le mieux !</p>
      <input
        type="text"
        placeholder="C quoi ton blaze ?"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <button onClick={handleStartQuiz} disabled={!playerName.trim()}>Commencer le Quiz</button>
    </div>
  );
}

export default Home;
