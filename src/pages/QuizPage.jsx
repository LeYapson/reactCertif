import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Quiz from "../components/Quiz";
import questionsData from "../data/questions.json";

function QuizPage() {
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const playerName = location.state?.playerName || "Joueur";

  const handleQuizEnd = (finalAnswers) => {
    navigate("/result", { state: { answers: finalAnswers, playerName } });
  };

  return (
    <div className="quiz-container">
      <h2>Bienvenue, {playerName} ! Prépare-toi pour le quiz.</h2>
      <Quiz questions={questionsData.questions} setAnswers={setAnswers} onFinish={handleQuizEnd} />
    </div>
  );
}

export default QuizPage;
