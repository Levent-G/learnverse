import React from "react";
import { Box, Typography, Grid, Card } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import QuizIcon from "@mui/icons-material/Quiz";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { useNavigate } from "react-router-dom";

const features = [
  {
    path: "/feature/kelime-kartlari",
    icon: <SchoolIcon sx={{ fontSize: 30, color: "#7e57c2" }} />,
    title: "Kelime Kartları",
    description:
      "En sık kullanılan İngilizce kelimeleri görsellerle destekleyerek öğren.",
  },
  {
    path: "/feature/kalip-cumleler",
    icon: <MenuBookIcon sx={{ fontSize: 30, color: "#8e24aa" }} />,
    title: "Kalıp Cümleler",
    description: "Günlük konuşmalarda sık kullanılan cümle kalıplarını öğren.",
  },
  {
    path: "/feature/quizler",
    icon: <QuizIcon sx={{ fontSize: 30, color: "#ab47bc" }} />,
    title: "Quiz & Test Modülü",
    description: "Seviyene uygun testlere katılarak eksiklerini keşfet.",
  },
  {
    path: "/feature/topluluk",
    icon: <PeopleAltIcon sx={{ fontSize: 30, color: "#6a1b9a" }} />,
    title: "Topluluk & Eşleşme",
    description: "Diğer kullanıcılarla eşleşerek birlikte öğren.",
  },
  {
    path: "/feature/ai-asistan",
    icon: <SmartToyIcon sx={{ fontSize: 30, color: "#9c27b0" }} />,
    title: "AI Asistan",
    description: "Yapay zeka ile kişisel çalışma planları oluştur.",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: 1280, mx: "auto", px: 3, py: 10 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 600, color: "#4a148c", mb: 4, textAlign: "center" }}
      >
        LearnVerse: İngilizceyi Farklı Öğren
      </Typography>

      <Grid container spacing={4}>
        {features.map(({ path, icon, title, description }) => (
          <Grid item xs={12} sm={6} md={4} key={path}>
            <Card
              sx={{
                borderRadius: 4,
                p: 3,
                height: "100%",
                cursor: "pointer",
                backgroundColor: "#fafafa",
                transition: "transform 0.3s ease",
                ":hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                },
              }}
              onClick={() => navigate(path)}
            >
              <Box sx={{ mb: 2 }}>{icon}</Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                {title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#555", fontSize: "0.85rem" }}
              >
                {description}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
