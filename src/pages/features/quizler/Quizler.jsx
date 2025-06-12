import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import FillInTheBlanks from "./FillInTheBlanks";
import MultipleChoice from "./MultipleChoice";
import TrueFalse from "./TrueFalse";
import Matching from "./Matching";

export default function DetailedQuiz() {
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
    <Box sx={{ mx: "auto", p: 4 }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, color: "#6a1b9a", fontWeight: 700 }}
      >
        Detaylı Quiz Bölümü
      </Typography>

      <FillInTheBlanks
        data={quizData.fillInTheBlanks}
        answers={fillAnswers}
        onChange={handleFillChange}
      />
      <MultipleChoice
        data={quizData.multipleChoice}
        answers={mcAnswers}
        onChange={handleMcChange}
      />
      <TrueFalse
        data={quizData.trueFalse}
        answers={tfAnswers}
        onChange={handleTfChange}
      />
      <Matching
        data={quizData.matching}
        answers={matchAnswers}
        onChange={handleMatchChange}
      />

      <Button
        variant="contained"
        onClick={checkScore}
        sx={{
          px: 5,
          py: 1.5,
          fontWeight: 600,
          borderRadius: 10,
          backgroundColor: "#6a1b9a",
          "&:hover": { backgroundColor: "#4a148c" },
        }}
      >
        Sonuçları Kontrol Et
      </Button>

      {score && (
        <Typography sx={{ mt: 3, fontWeight: 700, fontSize: "1.2rem" }}>
          Doğru: {score.correct} / {score.total} &nbsp; | &nbsp; Başarı Oranı:{" "}
          {((score.correct / score.total) * 100).toFixed(1)}%
        </Typography>
      )}
    </Box>
  );
}
