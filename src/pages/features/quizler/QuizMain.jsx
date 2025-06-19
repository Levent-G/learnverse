import React, { useState } from "react";
import QuizSelector from "./QuizSelector";
import Quizler from "./Quizler";

export default function QuizMain() {
  const [quizData, setQuizData] = useState(null);

  return quizData ? (
    <Quizler quizData={quizData} />
  ) : (
    <QuizSelector onQuizFetched={setQuizData} />
  );
}
