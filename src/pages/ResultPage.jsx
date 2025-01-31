import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Result from "../components/Result";
import getCharacter from "../api/getCharacter";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const playerName = location.state?.playerName || "Joueur";

  useEffect(() => {
    if (!location.state || !location.state.answers) {
      navigate("/quiz");
      return;
    }

    const fetchCharacter = async () => {
      try {
        const result = await getCharacter(location.state.answers);
        setCharacter(result);
      } catch (error) {
        console.error("Erreur lors de la récupération du personnage :", error);
      }
    };

    fetchCharacter();
  }, [location, navigate]);

  if (!character) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="result-container">
      <h2>{playerName}, tu es {character.name} !</h2>
      <img src={character.image} alt={character.name} />
      <p>{character.description}</p>
      <button onClick={() => navigate("/")}>Rejouer</button>
    </div>
  );
}

export default ResultPage;