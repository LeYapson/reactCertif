import { useState } from "react";

function Quiz({ questions, setAnswers, onFinish }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const handleAnswerClick = (answerTag) => {
    const updatedAnswers = [...userAnswers, answerTag];
    setUserAnswers(updatedAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setAnswers(updatedAnswers);
      onFinish(updatedAnswers);
    }
  };

  return (
    <div>
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

export default Quiz;
