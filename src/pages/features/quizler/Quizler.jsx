import React, { useState, useEffect, useRef, useCallback } from "react";
import { Box } from "@mui/material";
import { useColors } from "../../../context/ColorContext";
import { useApiRequest } from "../../../hooks/useApiRequest";

// Alt bileşenler
import QuizHeader from "./QuizHeader";
import QuestionCard from "./QuestionCard";
import NavigationButtons from "./NavigationButtons";
import QuizResult from "./QuizResult";

export default function DetailedQuiz({ quizData }) {
  const { colors } = useColors();
  const { request } = useApiRequest();

  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [mcAnswers, setMcAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [quizStats, setQuizStats] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);

  const totalTimeSeconds = 600;
  const [timeLeft, setTimeLeft] = useState(totalTimeSeconds);
  const timerRef = useRef(null);

  const handleFinishQuiz = useCallback(async () => {
    setQuizFinished(true);

    const answersPayload = quizData.map((item, idx) => ({
      english: item.question,
      selected: mcAnswers[idx] || "",
    }));

    await request({
      url: "/quiz/check",
      method: "POST",
      body: {
        answers: answersPayload,
        userEmail: userInfo.email,
      },
    });

    const correct = quizData.filter(
      (item, i) => mcAnswers[i] === item.correctAnswer
    ).length;

    setScore({ correct, total: quizData.length });

    const { data } = await request({
      url: "/quiz/stats",
      params: { email: userInfo.email },
    });

    if (data) setQuizStats(data);
  }, [quizData, mcAnswers, request, userInfo]);

  useEffect(() => {
    if (quizFinished) {
      clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleFinishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [quizFinished, handleFinishQuiz]);

  const handleAnswerChange = (val) => {
    setMcAnswers((prev) => ({ ...prev, [currentQuestionIndex]: val }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex((idx) => idx + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((idx) => idx - 1);
    }
  };

  if (!quizData?.length) {
    return (
      <Box sx={{ textAlign: "center", mt: 10, color: "error.main" }}>
        Quiz verisi yüklenemedi.
      </Box>
    );
  }

  if (quizFinished && score) {
    return <QuizResult score={score} quizStats={quizStats} colors={colors} />;
  }

  const currentQuestion = quizData[currentQuestionIndex];
  const userAnswer = mcAnswers[currentQuestionIndex] || "";
  const isNextEnabled = userAnswer !== "";
  const isLastQuestion = currentQuestionIndex === quizData.length - 1;
  const allAnswered = quizData.every((_, idx) => mcAnswers[idx]);

  return (
    <Box
      sx={{
        mx: "auto",
        mt: 4,
        p: 4,
        maxWidth: 700,
        bgcolor: colors.background,
        borderRadius: 3,
        boxShadow: 4,
        color: colors.textPrimary,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <QuizHeader
        timeLeft={timeLeft}
        totalTime={totalTimeSeconds}
        current={currentQuestionIndex + 1}
        total={quizData.length}
      />

      <QuestionCard
        question={currentQuestion.question}
        options={currentQuestion.options}
        selectedAnswer={userAnswer}
        onSelect={handleAnswerChange}
        colors={colors}
      />

      <NavigationButtons
        onBack={handleBack}
        onNext={handleNext}
        onFinish={handleFinishQuiz}
        showBack={currentQuestionIndex > 0}
        showNext={!isLastQuestion}
        showFinish={isLastQuestion && allAnswered}
        nextDisabled={!isNextEnabled}
      />
    </Box>
  );
}
