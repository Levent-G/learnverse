import React from "react";
import { Paper, Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

export default function QuizResult({ score, quizStats, colors }) {
  const ratio = score.correct / score.total;
  const success = ratio >= 0.8;

  return (
    <Paper
      elevation={3}
      sx={{
        mx: "auto",
        mt: 5,
        p: 4, 
        maxWidth: 720,
        bgcolor: colors.background,
        borderRadius: 5,
        textAlign: "center",
        boxShadow: success
          ? `0 0 10px 3px ${colors.primary}55` 
          : `0 0 10px 3px ${colors.warning}55`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 3,
          color: success ? colors.primary : colors.warning,
          animation: success ? "pulse 2.5s infinite" : "shake 0.6s infinite",
          fontSize: 48,
        }}
        aria-label={success ? "Başarı ikonu" : "Dikkat ikonu"}
      >
        {success ? (
          <CheckCircleIcon fontSize="inherit" />
        ) : (
          <SentimentDissatisfiedIcon fontSize="inherit" />
        )}
      </Box>

      <Typography
        variant="h4" 
        fontWeight={700} 
        color={success ? colors.primaryDark : colors.warningDark}
        gutterBottom
      >
        Quiz Sonuçları
      </Typography>

      <Typography
        variant="h6"
        sx={{ fontFamily: "'Courier New', monospace", fontStyle: "italic" }}
      >
        ✅ Doğru:{" "}
        <Box
          component="span"
          fontWeight={700}
          color={colors.success || "green"}
        >
          {score.correct}
        </Box>{" "}
        / {score.total} &nbsp;|&nbsp; Başarı Oranı:{" "}
        <Box
          component="span"
          fontWeight={700}
          color={success ? colors.primary : colors.warning}
       
        >
          {(ratio * 100).toFixed(1)}%
        </Box>
      </Typography>

      {quizStats?.additionalProp1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 4,
            mt: 3,
            mb: 3,
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              bgcolor: colors.backgroundLight,
              p: 2,
              borderRadius: 3,
              minWidth: 150,
              boxShadow: 1, 
            }}
          >
            <Typography variant="subtitle2" fontWeight={600}>
              Toplam Doğru
            </Typography>
            <Typography variant="subtitle1" color={colors.success || "green"}>
              {quizStats.additionalProp1.totalCorrect}
            </Typography>
          </Box>

          <Box
            sx={{
              bgcolor: colors.backgroundLight,
              p: 2,
              borderRadius: 3,
              minWidth: 150,
              boxShadow: 1,
            }}
          >
            <Typography variant="subtitle2" fontWeight={600}>
              Toplam Yanlış
            </Typography>
            <Typography variant="subtitle1" color={colors.error || "red"}>
              {quizStats.additionalProp1.totalWrong}
            </Typography>
          </Box>
        </Box>
      )}

      {quizStats?.additionalProp2 && (
        <Box sx={{ mt: 3 }}>
          <Typography
            variant="subtitle1"
            fontWeight={700}
            gutterBottom
            sx={{ mb: 2 }}
          >
            📘 Seviye Bazlı Performans
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            {Object.entries(quizStats.additionalProp2).map(([level, data]) => {
              const levelRatio = data.dogru / (data.dogru + data.yanlis);
              const levelSuccess = levelRatio >= 0.8;
              return (
                <Box
                  key={level}
                  sx={{
                    bgcolor: colors.backgroundLight,
                    p: 2,
                    borderRadius: 3,
                    minWidth: 140,
                    boxShadow: 1,
                    borderLeft: `5px solid ${
                      levelSuccess
                        ? colors.success || "green"
                        : colors.warning || "orange"
                    }`,
                  }}
                >
                  <Typography variant="body2" fontWeight={700} mb={0.5}>
                    {level.toUpperCase()}
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    ✅ {data.dogru} / ❌ {data.yanlis}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      )}

      <Box
        sx={{
          mt: 4,
          p: 2.5,
          bgcolor: success
            ? colors.successLight || "#d4edda"
            : colors.warningLight || "#fff3cd",
          borderRadius: 4,
          borderLeft: `6px solid ${
            success ? colors.success || "green" : colors.warning || "orange"
          }`,
          color: success
            ? colors.successDark || "#155724"
            : colors.warningDark || "#856404",
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          {success ? "Harika iş çıkardınız!" : "Gelişmeye devam edin!"}
        </Typography>
        <Typography variant="body2" sx={{ mt: 0.8, fontWeight: 500 }}>
          {success
            ? "Yüksek bir başarı oranı yakaladınız, tebrikler!"
            : "Bazı konulara tekrar göz atmanız faydalı olabilir."}
        </Typography>
      </Box>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1;}
          50% { transform: scale(1.1); opacity: 0.7;}
          100% { transform: scale(1); opacity: 1;}
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0);}
          20%, 60% { transform: translateX(-5px);}
          40%, 80% { transform: translateX(5px);}
        }
      `}</style>
    </Paper>
  );
}
