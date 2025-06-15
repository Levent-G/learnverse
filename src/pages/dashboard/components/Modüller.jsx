import React from "react";
import { Box, Card, Typography, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router";

const features = [
  // Örnek veri, sen kendi dashboardEnums'dan getirebilirsin
  {
    path: "/module1",
    icon: "📚",
    title: "Temel İngilizce",
    description: "İngilizce öğrenmeye giriş için temel dersler",
  },
  {
    path: "/module2",
    icon: "🗣️",
    title: "Konuşma Pratiği",
    description: "Günlük konuşma kalıplarını öğren ve uygula",
  },
  {
    path: "/module3",
    icon: "📝",
    title: "Dil Bilgisi",
    description: "Gramer kurallarını kolay ve hızlı öğren",
  },
];

const Moduller = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ mt: 6, mb: 6 }}>
      <Typography
        variant="h5"
        fontWeight={700}
        color="#6a1b9a" // Mor / lila ton
        sx={{ mb: 4, textAlign: "center" }}
      >
        Öğrenmeye Devam Et
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {features.map(({ path, icon, title, description }) => (
          <Grid item xs={12} sm={6} md={4} key={path}>
            <Card
              elevation={4}
              sx={{
                p: 3,
                height: 240,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: 3,
                bgcolor: "#f3e5f5", // çok açık lila
                boxShadow: "0 6px 18px rgba(106, 27, 154, 0.15)",
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 12px 28px rgba(106, 27, 154, 0.3)",
                  bgcolor: "#e1bee7",
                },
              }}
              onClick={() => navigate(path)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") navigate(path);
              }}
              aria-label={`${title} modülüne git`}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ fontSize: 40 }}>{icon}</Box>
                <Typography variant="h6" fontWeight={700} color="#4a148c">
                  {title}
                </Typography>
              </Box>
              <Typography variant="body2" color="#4a148c" sx={{ mt: 1.5, flexGrow: 1 }}>
                {description}
              </Typography>
              <Box sx={{ textAlign: "right" }}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(path);
                  }}
                  sx={{
                    bgcolor: "#6a1b9a",
                    color: "#fff",
                    fontWeight: 600,
                    borderRadius: 2,
                    px: 3,
                    textTransform: "none",
                    "&:hover": {
                      bgcolor: "#4a148c",
                    },
                  }}
                  aria-label={`${title} modülüne devam et`}
                >
                  Devam et
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Moduller;
