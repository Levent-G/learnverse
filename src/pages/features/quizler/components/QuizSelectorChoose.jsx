// QuizSelectorChoose.tsx
import React, { useState, useEffect } from "react";
import { Paper, Typography, Box, Divider } from "@mui/material";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import { useForm } from "react-hook-form";
import { useApiRequest } from "../../../../hooks/useApiRequest";
import { useColors } from "../../../../context/ColorContext";
import { schemaChoose } from "../shared/quizSchema";
import Form from "../../../../components/form/Form";
import { CustomSelect } from "../../../../components/form/formInputs/CustomSelect";
import { CustomInput } from "../../../../components/form/formInputs/CustomInput";
import CategoryCardList from "./CategoryCardList";
import { notify } from "../../../../utils/notify";

const QuizSelectorChoose = ({ onQuizFetched }) => {
  const { request } = useApiRequest();
  const { colors } = useColors();

  const methods = useForm({
    defaultValues: { count: 10, level: "", category: [] },
    resolver: null,
  });

  const { watch, setValue } = methods;
  const selectedLevel = watch("level");
  const selectedCategories = watch("category");

  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      if (!selectedLevel) {
        setCategoryOptions([]);
        setValue("category", []);
        return;
      }

      try {
        const result = await request({
          url: `/words/level/${selectedLevel}`,
          method: "GET",
        });

        if (result.success && Array.isArray(result.data)) {
          const uniqueCategories = Array.from(
            new Set(result.data.map((word) => word.category))
          );
          setCategoryOptions(uniqueCategories);
        } else {
          setCategoryOptions([]);
        }
      } catch {
        setCategoryOptions([]);
      }
    };

    fetchCategories();
  }, [selectedLevel, request, setValue]);

  const handleSubmit = async (data) => {
    const { level, count, category } = data;

    const result = await request({
      url: "/quiz/mixed",
      method: "GET",
      params: {
        level,
        count: Number(count || 10),
        categories: category.join(","),
      },
    });

    if (result.success) {
      onQuizFetched(result.data);
    } else {
      notify("Quiz alınamadı ","error");
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        mx: "auto",
        mt: 8,
        p: 4,
        borderRadius: 5,
        bgcolor: colors.background || "#fff",
        maxWidth: 480,
        minHeight: 650,
        display: "flex",
        flexDirection: "column",
        border: `1px solid ${colors.primaryLight}`,
        boxShadow: `0 10px 30px ${colors.primary}10`,
      }}
    >
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <EmojiObjectsIcon
          sx={{
            fontSize: 36,
            mb: 1,
            color: colors.primary || "#1976d2",
          }}
        />
        <Typography variant="h5" fontWeight={700}>
          Kendi Quiz'ini Oluştur
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
          Seviyeni seç, ilgi alanlarını belirle, hemen başla 🎯
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Form
        methods={methods}
        schema={schemaChoose}
        onSubmit={handleSubmit}
        submitText={"🚀 Quiz'e Başla"}
        buttonSx={{
          mt: 3,
          py: 1.5,
          fontWeight: 600,
          fontSize: "1rem",
          borderRadius: "1.5rem",
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
          color: "#fff",
          textTransform: "none",
          boxShadow: `0 4px 12px ${colors.primary}55`,
          "&:hover": {
            background: colors.primaryDark,
          },
        }}
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <CustomSelect
          name="level"
          label="Seviye Seç"
          options={["A1", "A2", "B1", "B2", "C1"]}
        />

        <Box
          sx={{
            flexGrow: 1,
            mt: 2,
            overflowY: "auto",
            border: `1px solid ${colors.primaryLight}`,
            p: 1,
            borderRadius: 3,
            backgroundColor: colors.backgroundLight || "#f9f9f9",
            maxHeight: 200,
          }}
        >
          <CategoryCardList
            selectedLevel={selectedLevel}
            categories={categoryOptions}
            selectedCategories={selectedCategories}
            onSelect={(updatedList) =>
              setValue("category", updatedList, { shouldValidate: true })
            }
          />
        </Box>

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

export default QuizSelectorChoose;
