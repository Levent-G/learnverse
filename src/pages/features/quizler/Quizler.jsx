import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import MultipleChoice from "./MultipleChoice";
import { useColors } from "../../../context/ColorContext";
import axios from "axios";

export default function DetailedQuiz() {
  const { colors } = useColors();

  const userInfoString = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(userInfoString);

  const [quizData, setQuizData] = useState([]);
  const [mcAnswers, setMcAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(null);
  const [quizStats, setQuizStats] = useState(null); // ← istatistik state’i

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get("http://localhost:8010/quiz", {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
          params: {
            level: "A1",
            category: "Greetings",
            count: 10,
          },
        });

        setQuizData(response.data);
      } catch (error) {
        console.error("Quiz verisi alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, []);

  const checkScore = async () => {
    const answersPayload = quizData.map((item, idx) => ({
      english: item.question,
      selected: mcAnswers[idx] || "",
    }));

    try {
      // 1. Cevapları gönder
      await axios.post(
        "http://localhost:8010/quiz/check",
        {
          answers: answersPayload,
          userEmail: userInfo.email,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      // 2. Skoru yerel hesapla
      let total = quizData.length;
      let correct = 0;

      quizData.forEach((item, i) => {
        if (mcAnswers[i] === item.correctAnswer) {
          correct++;
        }
      });

      setScore({ correct, total });

      // 3. İstatistikleri al
      const statsRes = await axios.get("http://localhost:8010/quiz/stats", {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
        params: {
          email: userInfo.email,
        },
      });

      setQuizStats(statsRes.data);
      console.log("Kullanıcı istatistikleri:", statsRes.data);
    } catch (error) {
      console.error("Cevap gönderme veya istatistik çekme hatası:", error);
    }
  };

  const handleMcChange = (idx, val) => {
    setMcAnswers((prev) => ({ ...prev, [idx]: val }));
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress color="primary" />
        <Typography mt={2}>Quiz yükleniyor...</Typography>
      </Box>
    );
  }

  if (!quizData.length) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography color="error">Quiz verisi yüklenemedi.</Typography>
      </Box>
    );
  }

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

      <MultipleChoice
        data={quizData.map((item) => ({
          question: item.question,
          options: item.options,
          answer: item.correctAnswer, // MultipleChoice bileşeni `answer` bekliyorsa
        }))}
        answers={mcAnswers}
        onChange={handleMcChange}
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
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "1.25rem",
              color: colors.successText || "green",
              userSelect: "text",
            }}
          >
            ✅ Doğru: {score.correct} / {score.total} &nbsp; | &nbsp; Başarı
            Oranı: {((score.correct / score.total) * 100).toFixed(1)}%
          </Typography>

          {quizStats && (
            <Box
              sx={{
                mt: 2,
                textAlign: "center",
                color: colors.textSecondary || "#555",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mt: 2 }}>
                📊 Kullanıcı İstatistikleri
              </Typography>

              {/* Örnek: Toplam doğru-yanlış */}
              {quizStats.additionalProp1 && (
                <Typography sx={{ mt: 1 }}>
                  Toplam Doğru: {quizStats.additionalProp1.totalCorrect} <br />
                  Toplam Yanlış: {quizStats.additionalProp1.totalWrong}
                </Typography>
              )}

              {/* Örnek: Seviye bazlı doğru/yanlış */}
              {quizStats.additionalProp2 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    📚 Seviye Bazlı Performans
                  </Typography>
                  {Object.entries(quizStats.additionalProp2).map(
                    ([level, data]) => (
                      <Typography key={level}>
                        {level.toUpperCase()} - ✅ {data.dogru || 0} / ❌{" "}
                        {data.yanlis || 0}
                      </Typography>
                    )
                  )}
                </Box>
              )}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
