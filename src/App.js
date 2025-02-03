import React, { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import * as XLSX from 'xlsx';

const QuizApp = () => {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [records, setRecords] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

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
      setRecords([...records, { name: studentName, number: studentNumber, class: studentClass, score: score + 1 }]);
    }
  };

  const handleStartQuiz = () => {
    if (studentName && studentNumber && studentClass) {
      setIsRegistered(true);
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(records);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Quiz Records");
    XLSX.writeFile(workbook, "quiz_records.xlsx");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-lg p-6 shadow-lg rounded-xl">
        <CardContent>
          {!isAdmin ? (
            !isRegistered ? (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Enter Student Details</h2>
                <input 
                  type="text" 
                  placeholder="Student Name" 
                  className="mb-2 p-2 w-full border rounded-lg" 
                  value={studentName} 
                  onChange={(e) => setStudentName(e.target.value)}
                />
                <input 
                  type="text" 
                  placeholder="Student Number" 
                  className="mb-2 p-2 w-full border rounded-lg" 
                  value={studentNumber} 
                  onChange={(e) => setStudentNumber(e.target.value)}
                />
                <input 
                  type="text" 
                  placeholder="Student Class" 
                  className="mb-2 p-2 w-full border rounded-lg" 
                  value={studentClass} 
                  onChange={(e) => setStudentClass(e.target.value)}
                />
                <Button className="mt-4" onClick={handleStartQuiz}>Start Quiz</Button>
              </div>
            ) : quizFinished ? (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
                <p className="text-lg">{studentName} ({studentNumber}, {studentClass})</p>
                <p className="text-lg">Your Score: {score} / {questions.length}</p>
                <Button className="mt-4" onClick={() => { setStep(0); setScore(0); setQuizFinished(false); setIsRegistered(false); setStudentName(""); setStudentNumber(""); setStudentClass(""); }}>Restart Quiz</Button>
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
            )
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
              <Button className="mb-4" onClick={exportToExcel}>Export to Excel</Button>
              <ul className="text-left">
                {records.map((record, index) => (
                  <li key={index} className="mt-2">{record.name} ({record.number}, {record.class}) - Score: {record.score}</li>
                ))}
              </ul>
            </div>
          )}
          <Button className="mt-4" onClick={() => setIsAdmin(!isAdmin)}>{isAdmin ? "Exit Admin Panel" : "Enter Admin Panel"}</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizApp;
