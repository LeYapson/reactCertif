import { useState } from "react";
import { useNavigate } from "react-router-dom";
import questionsData from "../data/questions.json";

function QuizPage({ answers, setAnswers }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const navigate = useNavigate();
    const questions = questionsData.questions;
  
    const handleAnswerClick = (answerTag) => {
      const newAnswers = [...answers, answerTag];
      setAnswers(newAnswers);
  
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        navigate("/result");
      }
    };
  
    return (
      <div className="quiz-container">
        <h2>{questions[currentQuestion].question}</h2>
        <div className="options">
          {questions[currentQuestion].options.map((option, index) => (
            <button key={index} onClick={() => handleAnswerClick(option.tag)}>
              {option.text}
            </button>
          ))}
        </div>
      </div>
    );
  }
  
  export default QuizPage;
  