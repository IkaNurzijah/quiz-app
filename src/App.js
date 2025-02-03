import React, { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";

const QuizApp = () => {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const questions = [
    {
      question: "What is the powerhouse of the cell?",
      options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"],
      answer: "Mitochondria",
    },
    {
      question: "Which organ pumps blood throughout the body?",
      options: ["Lungs", "Liver", "Heart", "Kidney"],
      answer: "Heart",
    },
  ];

  const handleAnswer = (selectedOption) => {
    if (selectedOption === questions[step].answer) {
      setScore(score + 1);
    }
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      setQuizFinished(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-lg p-6 shadow-lg rounded-xl">
        <CardContent>
          {quizFinished ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
              <p className="text-lg">Your Score: {score} / {questions.length}</p>
              <Button className="mt-4" onClick={() => { setStep(0); setScore(0); setQuizFinished(false); }}>Restart Quiz</Button>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold mb-4">{questions[step].question}</h2>
              <div className="grid grid-cols-1 gap-2">
                {questions[step].options.map((option, index) => (
                  <Button key={index} className="w-full" onClick={() => handleAnswer(option)}>{option}</Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizApp;
