import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { UserProvider } from "./components/UserContext";
import Header from "./components/Header";
import UserForm from "./components/UserForm";
import Question from "./components/Question";
import Results from "./components/Results";

const questions = [
  { question: "What's your favorite color?", options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"] },
  { question: "What's your ideal weekend activity?", options: ["Camping 🏕️", "Swimming 🏊‍♂️", "Hiking ⛰️", "Skydiving 🪂"] },
  { question: "Which animal do you like the most?", options: ["Lion 🦁", "Dolphin 🐬", "Turtle 🐢", "Eagle 🦅"] },
];

const keywords = { Fire: "fire", Water: "water", Earth: "earth", Air: "air" };

const elements = {
  "Red 🔴": "Fire", "Blue 🔵": "Water", "Green 🟢": "Earth", "Yellow 🟡": "Air",
  "Camping 🏕️": "Earth", "Swimming 🏊‍♂️": "Water", "Hiking ⛰️": "Earth", "Skydiving 🪂": "Air",
  "Lion 🦁": "Fire", "Dolphin 🐬": "Water", "Turtle 🐢": "Earth", "Eagle 🦅": "Air",
};

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [element, setElement] = useState("");
  const [artwork, setArtwork] = useState(null);

  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  function determineElement(answers) {
    const counts = {};
    answers.forEach((answer) => {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
  }

  async function fetchArtwork(query) {
    try {
      const response = await axios.get(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}`
      );

      if (response.data.objectIDs && response.data.objectIDs.length > 0) {
        const artworkId = response.data.objectIDs[0];
        const artworkResponse = await axios.get(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${artworkId}`
        );

        setArtwork(artworkResponse.data);
      }
    } catch (error) {
      console.error("Error fetching artwork:", error);
      setArtwork(null);
    }
  }

  useEffect(() => {
    if (currentQuestionIndex === questions.length) {
      const selectedElement = determineElement(answers);
      setElement(selectedElement);
      fetchArtwork(keywords[selectedElement]);
    }
  }, [currentQuestionIndex]);

  // 🔹 Nouvelle fonction pour réinitialiser le quiz
  function resetQuiz() {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setElement("");
    setArtwork(null);
  }

  return (
    <UserProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<UserForm resetQuiz={resetQuiz} />} />
          <Route
            path="/quiz"
            element={
              currentQuestionIndex < questions.length ? (
                <Question
                  question={questions[currentQuestionIndex].question}
                  options={questions[currentQuestionIndex].options}
                  onAnswer={handleAnswer}
                />
              ) : (
                <Results element={element} artwork={artwork} resetQuiz={resetQuiz} />
              )
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
