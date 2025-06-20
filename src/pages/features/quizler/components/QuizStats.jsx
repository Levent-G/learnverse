import React, { useEffect, useState, useMemo } from "react";
import { Box, Paper, Typography, Grid } from "@mui/material";

import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import QuizIcon from "@mui/icons-material/AssignmentTurnedIn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InsightsIcon from "@mui/icons-material/Insights";
import { useApiRequest } from "../../../../hooks/useApiRequest";
import { useColors } from "../../../../context/ColorContext";
import ErrorPage from "../../../../components/errorPage/ErrorPage";

export default function QuizStats() {
  const { colors } = useColors();
  const { request } = useApiRequest();

  const userInfo = useMemo(() => {
    return JSON.parse(sessionStorage.getItem("userInfo"));
  }, []);

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userInfo?.email) {
      setError("Kullanıcı bilgisi bulunamadı.");
      setLoading(false);
      return;
    }

    const fetchStats = async () => {
      setLoading(true);
      try {
        const { data } = await request({
          url: "/quiz/stats",
          params: { email: userInfo.email },
        });
        setStats(data);
      } catch (e) {
        setError("İstatistikler alınamadı.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [request, userInfo?.email]);

  if (loading) return <Typography>İstatistikler yükleniyor...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!stats) return <ErrorPage title={"İstatistik bulunamadı."} />;

  const total = (stats.totalCorrect || 0) + (stats.totalWrong || 0);
  const successRatio = total ? (stats.totalCorrect / total) * 100 : 0;

  const statCards = [
    {
      label: "Toplam Soru",
      value: stats.totalQuestions ?? "-",
      icon: <QuizIcon sx={{ fontSize: 36 }} />,
      color: colors.primary,
    },
    {
      label: "Toplam Doğru",
      value: stats.totalCorrect ?? "-",
      icon: <CheckCircleIcon sx={{ fontSize: 36 }} />,
      color: colors.success,
    },
    {
      label: "Başarı Oranı",
      value: `${successRatio.toFixed(1)}%`,
      icon: <InsightsIcon sx={{ fontSize: 36 }} />,
      color: successRatio >= 80 ? colors.success : colors.warning,
    },
    {
      label: "Çözülen Quiz",
      value: stats.quizCount ?? "-",
      icon: <EmojiEventsIcon sx={{ fontSize: 36 }} />,
      color: colors.info,
    },
  ];

  return (
    <Box sx={{ mt: 4, px: 2 }}>
      <Typography
        variant="h5"
        fontWeight={700}
        textAlign="center"
        color={colors.primaryDark}
        gutterBottom
      >
        📊 Quiz Performans İstatistikleriniz
      </Typography>

      <Grid container spacing={3} justifyContent="center" mt={2}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={4}
              sx={{
                p: 3,
                borderRadius: 4,
                height: 200,
                bgcolor: colors.background,
                textAlign: "center",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: `0 8px 16px ${card.color}33`,
                },
              }}
            >
              <Box sx={{ color: card.color, mb: 1 }}>{card.icon}</Box>
              <Typography
                variant="subtitle2"
                fontWeight={600}
                color={colors.textSecondary}
              >
                {card.label}
              </Typography>
              <Typography
                variant="h5"
                fontWeight={700}
                color={card.color}
                mt={1}
              >
                {card.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {stats.additionalProp2 && (
        <Box mt={5}>
          <Typography
            variant="h6"
            fontWeight={700}
            textAlign="center"
            mb={2}
            color={colors.primaryDark}
          >
            🧠 Seviye Bazlı Performans
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 2,
            }}
          >
            {Object.entries(stats.additionalProp2).map(([level, data]) => {
              const ratio = data.dogru / (data.dogru + data.yanlis || 1);
              const levelSuccess = ratio >= 0.8;
              return (
                <Box
                  key={level}
                  sx={{
                    bgcolor: colors.backgroundLight,
                    p: 2,
                    minWidth: 140,
                    borderRadius: 3,
                    borderLeft: `6px solid ${
                      levelSuccess
                        ? colors.success || "green"
                        : colors.warning || "orange"
                    }`,
                    boxShadow: 2,
                  }}
                >
                  <Typography variant="subtitle2" fontWeight={700}>
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
    </Box>
  );
}
