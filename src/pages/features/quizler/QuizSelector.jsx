import { Paper, Typography, Box, Button } from "@mui/material";
import { useState } from "react";
import { useApiRequest } from "../../../hooks/useApiRequest";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import { useColors } from "../../../context/ColorContext";

const categories = [
  "Greetings",
  "People",
  "Numbers",
  "Family",
  "Colors",
  "Months & Seasons",
];

const QuizSelector = ({ onQuizFetched }) => {
  const { request } = useApiRequest();
  const { colors } = useColors();

  const userLevel = "A1";

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleStartQuiz = async () => {
    setLoading(true);

    // Rastgele kategori seçimi
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];
    setSelectedCategory(randomCategory);

    try {
      const result = await request({
        url: "/quiz",
        method: "GET",
        params: { level: userLevel, category: randomCategory, count: 10 },
      });

      if (result.success) {
        onQuizFetched(result.data);
      } else {
        throw new Error(result.error || "Quiz alınamadı");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={5}
      sx={{
        maxWidth: 460,
        height: 400,
        mx: "auto",
        mt: 8,
        p: 4,
        borderRadius: 4,
        bgcolor: colors.background || "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          mb: 2,
        }}
      >
        <EmojiObjectsIcon
          sx={{ fontSize: 32, color: colors.primary || "#1976d2" }}
        />
        <Typography
          variant="h5"
          textAlign="center"
          fontWeight={700}
          color={colors.primaryDark || "#0d47a1"}
        >
          Quiz Başlat
        </Typography>
      </Box>

      <Typography
        variant="body2"
        textAlign="center"
        color={colors.textSecondary || "text.secondary"}
        sx={{ mb: 2 }}
      >
        Seviye: <strong>{userLevel}</strong> olarak seçildi.
        <br />
        {selectedCategory
          ? `Seçilen kategori: ${selectedCategory}`
          : "Başlat'a basınca kategori rastgele seçilecek."}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleStartQuiz}
        disabled={loading}
        sx={{
          py: 1.5,
          fontWeight: 600,
          borderRadius: 10,
          textTransform: "none",
          fontSize: "1rem",
          mt: 2,
          backgroundColor: colors.primary,
          "&:hover": { backgroundColor: colors.primaryDark },
          width: "100%",
        }}
      >
        {loading ? "Yükleniyor..." : "🚀 Quizi Başlat"}
      </Button>
    </Paper>
  );
};

export default QuizSelector;
