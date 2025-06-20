import React, { useState, useEffect, useCallback } from "react";
import { Box } from "@mui/material";
import { useColors } from "../../../context/ColorContext";
import { useApiRequest } from "../../../hooks/useApiRequest";

import QuizHeader from "./QuizHeader";
import QuestionCard from "./QuestionCard";
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

  // countdown sadece kullanıcı seçim yaptıktan sonra 5'ten geriye sayar, null ise gösterilmez
  const [countdown, setCountdown] = useState(null);


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

    const correctCount = quizData.filter(
      (item, i) => mcAnswers[i] === item.correctAnswer
    ).length;

    setScore({ correct: correctCount, total: quizData.length });

    const { data } = await request({
      url: "/quiz/stats",
      params: { email: userInfo.email },
    });

    if (data) setQuizStats(data);
  }, [quizData, mcAnswers, request, userInfo]);

  const handleAnswerChange = (val) => {
    // Aynı soruya birden fazla cevap verilmesin
    if (mcAnswers[currentQuestionIndex] !== undefined) return;

    setMcAnswers((prev) => ({ ...prev, [currentQuestionIndex]: val }));
    setCountdown(3); // Sayaç başlat
  };

  useEffect(() => {
    if (countdown === null) return;

    if (countdown <= 0) {
      if (currentQuestionIndex === quizData.length - 1) {
        handleFinishQuiz();
      } else {
        setCurrentQuestionIndex((idx) => idx + 1);
      }
      setCountdown(null); // Sayaç sıfırla
      return;
    }

    const interval = setInterval(() => {
      setCountdown((c) => (c !== null ? c - 1 : null));
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown, currentQuestionIndex, quizData.length, handleFinishQuiz]);

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
  const showResult = userAnswer !== "";

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
        countdown={countdown} // sadece countdown gönder
        current={currentQuestionIndex + 1}
        total={quizData.length}
      />

      <QuestionCard
        question={currentQuestion.question}
        options={currentQuestion.options}
        selectedAnswer={userAnswer}
        correctAnswer={currentQuestion.correctAnswer}
        showResult={showResult}
        onSelect={handleAnswerChange}
        colors={colors}
      />
    </Box>
  );
}
