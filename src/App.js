import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { QUESTIONS } from "./questions";

const App = () => {
  const [questions] = useState(Object.values(QUESTIONS));
  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [overallScore, setOverallScore] = useState(0);
  const [runCount, setRunCount] = useState(0);
  const [averageScore, setAverageScore] = useState(0);

  useEffect(() => {
    setAverageScore((overallScore / runCount) * 100);
  }, [overallScore, runCount]);

  const handleAnswer = (answer) => {
    const updatedAnswers = [...answers, answer];
    setAnswers(updatedAnswers);

    const numYesAnswers = updatedAnswers.filter((ans) => ans === "Yes").length;
    const calculatedScore = (numYesAnswers / questions.length) * 100;
    setScore(calculatedScore);

    if (currentQuestionIndex === questions.length - 1) {
      const totalScore = updatedAnswers.filter((ans) => ans === "Yes").length;
      setOverallScore((prev) => prev + totalScore);
      setRunCount((prev) => prev + 1);
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers([]);
  };

  return (
    <div className="main__wrap">
      <main className="container">
        <h4>TODO</h4>
        <h5 className="mb-4">Yes/No Questions series</h5>

        {currentQuestionIndex < questions.length ? (
          <div>
            <h6 className="mb-4">{questions[currentQuestionIndex]}</h6>
            <Button
              variant="success"
              onClick={() => handleAnswer("Yes")}
              className="mr-2"
            >
              Yes
            </Button>
            <Button variant="danger" onClick={() => handleAnswer("No")}>
              No
            </Button>
          </div>
        ) : (
          <div>
            <h2>Questions Completed!</h2>
            <p>Your score for this run: {score.toFixed(2)}%</p>
            {runCount > 0 && (
              <p>Average score for all runs: {averageScore.toFixed(2)}%</p>
            )}
            <Button variant="primary" onClick={resetQuiz}>
              Restart Quiz
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
