import React from "react";
import { Box, Card, Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router";

const tasksData = [
  {
    title: "Günlük Görev",
    tasks: ["📘 10 kelime kartı tekrarla", "🧠 1 quiz çöz", "🎧 1 podcast dinle"],
    buttonText: "Ek görev al",
    route: "/feature/quizler",
  },
  {
    title: "Öneri",
    tasks: ["📖 “The Curious Incident...” kitabına başla", "💬 “How do you feel?” kalıbını tekrar et"],
    buttonText: "Daha fazla öneri al",
    route: "/feature/quizler",
  },
  {
    title: "Mini Test",
    tasks: ["📌 Bugünkü test hazır!"],
    buttonText: "Teste Başla",
    route: "/feature/quizler",
  },
];

const GunlukGorevler = () => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={4} justifyContent="center" sx={{ mb: 6,mt:5 }}>
      {tasksData.map(({ title, tasks, buttonText, route }, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card
            elevation={3}
            sx={{
              p: 4,
              height: 220,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderRadius: 3,
              bgcolor: "#fff7ed", // pastel turuncu açık
              boxShadow:
                "0 6px 18px rgba(239, 108, 0, 0.12)",

              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 12px 28px rgba(239, 108, 0, 0.3)",
                bgcolor: "#fff3e0",
              },
            }}
            onClick={() => navigate(route)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") navigate(route);
            }}
            aria-label={`${title} kartı, detaylar için tıklayın`}
          >
            <Box>
              <Typography
                variant="h6"
                fontWeight="700"
                color="#ef6c00"
                mb={1.5}
                sx={{ userSelect: "none" }}
              >
                {title}
              </Typography>
              {tasks.map((task, i) => (
                <Typography
                  key={i}
                  variant="body2"
                  color="#6d4c41"
                  sx={{ mb: i !== tasks.length - 1 ? 0.6 : 0 }}
                >
                  {task}
                </Typography>
              ))}
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Button
                variant="contained"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(route);
                }}
                sx={{
                  bgcolor: "#ef6c00",
                  color: "#fff",
                  fontWeight: "600",
                  "&:hover": {
                    bgcolor: "#e65100",
                  },
                  px: 3,
                  borderRadius: 2,
                  textTransform: "none",
                }}
                aria-label={buttonText}
              >
                {buttonText}
              </Button>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default GunlukGorevler;
