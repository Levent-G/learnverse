import React, { useState } from "react";
import QuizSelector from "./QuizSelector";
import Quizler from "./Quizler";
import QuizStats from "./components/QuizStats";

export default function QuizMain() {
  const [quizData, setQuizData] = useState(null);

  return quizData ? (
    <Quizler quizData={quizData} />
  ) : (
    <>
      <QuizSelector onQuizFetched={setQuizData} />
      <QuizStats />
    </>
  );
}
