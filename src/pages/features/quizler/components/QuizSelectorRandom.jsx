import React, { useState } from "react";
import { Typography, Box, Paper } from "@mui/material";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import { useApiRequest } from "../../../../hooks/useApiRequest";
import { useColors } from "../../../../context/ColorContext";
import * as yup from "yup";
import Form from "../../../../components/form/Form";
import { CustomInput } from "../../../../components/form/formInputs/CustomInput";

const categories = [
  "Greetings",
  "People",
  "Numbers",
  "Family",
  "Colors",
  "Months & Seasons",
];

const schema = yup.object({
  count: yup
    .number()
    .typeError("Soru sayısı bir sayı olmalı")
    .min(1, "En az 1 soru olmalı")
    .max(100, "En fazla 100 soru olabilir")
    .required("Soru sayısı zorunlu"),
});

const QuizSelectorRandom = ({ onQuizFetched }) => {
  const { request } = useApiRequest();
  const { colors } = useColors();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const userLevel = "A1";

  const handleStartQuiz = async (data) => {
    const count = Number(data.count);
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];
    setSelectedCategory(randomCategory);

    try {
      const result = await request({
        url: "/quiz",
        method: "GET",
        params: {
          level: userLevel,
          category: randomCategory,
          count,
        },
      });

      if (result.success) {
        onQuizFetched(result.data);
      } else {
        throw new Error(result.error || "Quiz alınamadı");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Paper
      elevation={8}
      sx={{
        mx: "auto",
        mt: 8,
        p: 5,
        borderRadius: 6,
        bgcolor: colors.background || "#fff",
        width: 460,
        height: 600,
        display: "flex",
        flexDirection: "column",
        boxShadow: `0 6px 20px ${colors.primary}30`,
      }}
    >
      {/* Başlık */}
      <Box sx={{ textAlign: "center", mb: 3, flexShrink: 0 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <EmojiObjectsIcon
            sx={{ fontSize: 34, color: colors.primary || "#1976d2" }}
          />
          <Typography
            variant="h4"
            fontWeight={700}
            color={colors.primaryDark || "#0d47a1"}
          >
            Rastgele Quiz 
          </Typography>
        </Box>
        <Typography variant="body1" color={colors.textSecondary} mt={1}>
          Seviye: <strong>{userLevel}</strong> olarak ayarlandı.
          <br />
          {selectedCategory
            ? `Kategori: ${selectedCategory}`
            : "Kategori otomatik seçilecek."}
        </Typography>
      </Box>

      {/* Bilgilendirme alanı */}
      <Box
        sx={{
          mb: 3,
          p: 2,
          borderRadius: 3,
          bgcolor: colors.backgroundLight || "#f5f7fa",
          color: colors.textSecondary,
          fontSize: "0.9rem",
          boxShadow: `inset 0 0 10px ${colors.primary}22`,
          lineHeight: 1.5,
          userSelect: "none",
        }}
      >
        <Typography variant="subtitle1" fontWeight={600} color={colors.primary}>
          📌 Nasıl çalışır?
        </Typography>
        <Typography>
          Seviye otomatik olarak ayarlanmıştır. Kategori ise her quizde rastgele
          seçilir, böylece farklı konularda kendini test edebilirsin.
        </Typography>
        <Typography mt={1}>
          Soru sayısını istediğin gibi ayarlayabilir, hızlıca quiz'e başlayabilirsin.
        </Typography>
      </Box>

      {/* Form */}
      <Form
        schema={schema}
        defaultValues={{ count: 10 }}
        onSubmit={handleStartQuiz}
        submitText={
          selectedCategory
            ? `Kategori: ${selectedCategory} 🚀 Quizi Başlat`
            : "🚀 Quizi Başlat"
        }
        buttonSx={{
          py: 1.6,
          fontWeight: 700,
          fontSize: "1.1rem",
          borderRadius: 12,
          backgroundColor: colors.primary,
          "&:hover": { backgroundColor: colors.primaryDark },
          width: "100%",
          textTransform: "none",
          boxShadow: `0 4px 12px ${colors.primary}55`,
          flexShrink: 0,
          mt: 3,
        }}
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        {/* Bu boşluk, başlık ve bilgilendirme ile form inputları arasında hiza sağlar */}
        <Box />

        <CustomInput
          name="count"
          label="Soru Sayısı"
          type="number"
          autoComplete="off"
          inputProps={{ min: 1, max: 100 }}
          sx={{ mt: 2 }}
        />
      </Form>
    </Paper>
  );
};

export default QuizSelectorRandom;
