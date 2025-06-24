import {
  Box,
  Typography,
  Divider,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useColors } from "../../../context/ColorContext";
import CategoryCardList from "./components/CategoryCardList";
import { useApiRequest } from "../../../hooks/useApiRequest";

const QuizPage = ({ onQuizFetched }) => {
  const { colors } = useColors();
  const { request } = useApiRequest();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      level: "",
      count: 10,
      mode: "",
      category: [],
    },
  });

  const mode = watch("mode");
  const selectedLevel = watch("level");
  const selectedCategories = watch("category");

  useEffect(() => {
    if (mode !== "choose") {
      setValue("category", []);
      setValue("level", "");
    }
  }, [mode, setValue]);

  const onSubmit = async (data) => {
    const { level, count, mode, category } = data;

    let url = "";
    let params = {};

    if (mode === "choose") {
      url = "/quiz/mixed";
      params = {
        level,
        count: Number(count),
        categories: category.join(","),
      };
    } else if (mode === "random") {
      url = "/quiz/random";
      params = { count: Number(count) }; // sadece count
    } else if (mode === "double") {
      url = "/quiz/random";
      params = { count: Number(count) }; // sadece count
    }

    const response = await request({
      url,
      method: "GET",
      params,
    });

    if (response.success) {
      onQuizFetched(response.data);
    } else {
      alert("Quiz alınamadı: " + response.error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        mt: 6,
        mx: "auto",
        maxWidth: 1000,
        px: 4,
        py: 6,
        background: colors.background || "#fff",
        borderRadius: 4,
        boxShadow: `0 8px 30px ${colors.primary}15`,
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        gap: 4,
      }}
    >
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <EmojiObjectsIcon sx={{ fontSize: 36, color: colors.primary }} />
          <Typography variant="h5" fontWeight={700} ml={1}>
            Quiz Modu Seç
          </Typography>
        </Box>
        <Typography sx={{ mb: 3, color: "text.secondary" }}>
          Kendi seviyene veya karışık modlara göre quiz oluşturabilirsin. 🚀
        </Typography>

        <TextField
          select
          label="Mod"
          fullWidth
          {...register("mode")}
          sx={{ mb: 2 }}
        >
          <MenuItem value="choose">Seviye & Kategori Seç</MenuItem>
          <MenuItem value="random">Seviye: Otomatik (Hızlı Quiz)</MenuItem>
          <MenuItem value="double">Tam Karışık (Seviye + Kategori)</MenuItem>
        </TextField>

        {mode === "choose" && (
          <>
            <TextField
              select
              label="Seviye"
              fullWidth
              value={selectedLevel}
              onChange={(e) => setValue("level", e.target.value)}
              sx={{ mb: 2 }}
            >
              {["A1", "A2", "B1", "B2", "C1"].map((lvl) => (
                <MenuItem key={lvl} value={lvl}>
                  {lvl}
                </MenuItem>
              ))}
            </TextField>

            {selectedLevel && (
              <CategoryCardList
                selectedLevel={selectedLevel}
                selectedCategories={selectedCategories}
                onSelect={(val) => setValue("category", val)}
                setValue={setValue}
              />
            )}
          </>
        )}

        <TextField
          label="Soru Sayısı"
          type="number"
          fullWidth
          inputProps={{ min: 1, max: 100 }}
          {...register("count")}
        />

        <Button
          type="submit"
          fullWidth
          sx={{
            mt: 4,
            py: 1.5,
            fontSize: "1rem",
            fontWeight: 600,
            borderRadius: "1.5rem",
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
            color: "#fff",
            textTransform: "none",
            boxShadow: `0 4px 12px ${colors.primary}55`,
            "&:hover": {
              background: colors.primaryDark,
            },
          }}
        >
          🚀 Quiz'e Başla
        </Button>
      </Box>

      <Box
        sx={{
          p: 3,
          borderRadius: 3,
          background: colors.backgroundLight || "#f4f4f4",
          boxShadow: `inset 0 0 10px ${colors.primary}10`,
          color: "text.secondary",
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight={600}
          mb={1}
          color={colors.primary}
        >
          📌 Açıklama
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body2" sx={{ mb: 2 }}>
          - “Seviye & Kategori Seç” modunda istediğin seviyeyi seçip kategoriye göre quiz oluşturabilirsin.
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          - “Hızlı Quiz” modunda seviyen otomatik alınır, kategoriler rastgele belirlenir.
        </Typography>
        <Typography variant="body2">
          - “Tam Karışık” modunda tüm seviye ve kategorilerden tamamen rastgele sorular gelir.
        </Typography>
      </Box>
    </Box>
  );
};

export default QuizPage;
