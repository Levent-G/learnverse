import React, { useState } from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import FillInTheBlanks from "./FillInTheBlanks";
import MultipleChoice from "./MultipleChoice";
import TrueFalse from "./TrueFalse";
import Matching from "./Matching";
import { useColors } from "../../../context/ColorContext";

export default function DetailedQuiz() {
  const { colors } = useColors();

  const [fillAnswers, setFillAnswers] = useState({});
  const [mcAnswers, setMcAnswers] = useState({});
  const [tfAnswers, setTfAnswers] = useState({});
  const [matchAnswers, setMatchAnswers] = useState({});
  const [score, setScore] = useState(null);

  const quizData = {
    fillInTheBlanks: [
      { sentence: "I ___ to the store yesterday.", answer: "went" },
      { sentence: "She ___ playing the piano.", answer: "is" },
    ],
    multipleChoice: [
      {
        question: "What is the past tense of 'go'?",
        options: ["goed", "went", "gone", "goes"],
        answer: "went",
      },
      {
        question: "Choose the correct sentence:",
        options: [
          "He don't like apples.",
          "He doesn't like apples.",
          "He not like apples.",
          "He no like apples.",
        ],
        answer: "He doesn't like apples.",
      },
    ],
    trueFalse: [
      { question: "The capital of England is London.", answer: true },
      { question: "Cats can fly.", answer: false },
    ],
    matching: [
      {
        left: ["Dog", "Cat", "Bird"],
        right: ["Kuş", "Kedi", "Köpek"],
        answer: { Dog: "Köpek", Cat: "Kedi", Bird: "Kuş" },
      },
    ],
  };

  const handleFillChange = (idx, val) => {
    setFillAnswers((prev) => ({ ...prev, [idx]: val }));
  };

  const handleMcChange = (idx, val) => {
    setMcAnswers((prev) => ({ ...prev, [idx]: val }));
  };

  const handleTfChange = (idx, val) => {
    setTfAnswers((prev) => ({ ...prev, [idx]: val }));
  };

  const handleMatchChange = (leftItem, val) => {
    setMatchAnswers((prev) => ({ ...prev, [leftItem]: val }));
  };

  const checkScore = () => {
    let total = 0;
    let correct = 0;

    quizData.fillInTheBlanks.forEach(({ answer }, i) => {
      total++;
      if (
        (fillAnswers[i] || "").trim().toLowerCase() === answer.toLowerCase()
      ) {
        correct++;
      }
    });

    quizData.multipleChoice.forEach(({ answer }, i) => {
      total++;
      if ((mcAnswers[i] || "") === answer) {
        correct++;
      }
    });

    quizData.trueFalse.forEach(({ answer }, i) => {
      total++;
      if (tfAnswers[i] !== undefined && tfAnswers[i] === answer) {
        correct++;
      }
    });

    quizData.matching.forEach(({ answer, left }) => {
      left.forEach((item) => {
        total++;
        if (matchAnswers[item] === answer[item]) {
          correct++;
        }
      });
    });

    setScore({ correct, total });
  };

  return (
    <Box
      sx={{
        mx: "auto",
        p: 4,
        maxWidth: 700,
        bgcolor: colors.background || "background.paper",
        borderRadius: 3,
        boxShadow: 3,
        color: colors.textPrimary || "text.primary",
        userSelect: "text",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Typography
        variant="h4"
        sx={{ color: colors.primaryDark, fontWeight: 700, textAlign: "center" }}
      >
        Detaylı Quiz Bölümü
      </Typography>

      <Divider sx={{ borderColor: colors.primaryLight }} />

      <FillInTheBlanks
        data={quizData.fillInTheBlanks}
        answers={fillAnswers}
        onChange={handleFillChange}
      />

      <Divider sx={{ borderColor: colors.primaryLight }} />

      <MultipleChoice
        data={quizData.multipleChoice}
        answers={mcAnswers}
        onChange={handleMcChange}
      />

      <Divider sx={{ borderColor: colors.primaryLight }} />

      <TrueFalse
        data={quizData.trueFalse}
        answers={tfAnswers}
        onChange={handleTfChange}
      />

      <Divider sx={{ borderColor: colors.primaryLight }} />

      <Matching
        data={quizData.matching}
        answers={matchAnswers}
        onChange={handleMatchChange}
      />

      <Button
        variant="contained"
        onClick={checkScore}
        sx={{
          px: 6,
          py: 1.5,
          fontWeight: 600,
          borderRadius: 10,
          backgroundColor: colors.primary,
          color: colors.textOnPrimary,
          alignSelf: "center",
          "&:hover": { backgroundColor: colors.primaryDark },
          mt: 2,
          userSelect: "none",
        }}
      >
        Sonuçları Kontrol Et
      </Button>

      {score && (
        <Typography
          sx={{
            mt: 3,
            fontWeight: 700,
            fontSize: "1.25rem",
            color: colors.successText || "green",
            textAlign: "center",
            userSelect: "text",
          }}
        >
          Doğru: {score.correct} / {score.total} &nbsp; | &nbsp; Başarı Oranı:{" "}
          {((score.correct / score.total) * 100).toFixed(1)}%
        </Typography>
      )}
    </Box>
  );
}
