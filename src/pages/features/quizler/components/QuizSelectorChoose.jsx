import React, { useState, useEffect } from "react";
import { Paper, Typography, Box } from "@mui/material";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import { useForm } from "react-hook-form";
import { useApiRequest } from "../../../../hooks/useApiRequest";
import { useColors } from "../../../../context/ColorContext";
import { schema } from "../shared/quizSchema";
import Form from "../../../../components/form/Form";
import { CustomSelect } from "../../../../components/form/formInputs/CustomSelect";
import { CustomInput } from "../../../../components/form/formInputs/CustomInput";
import CategoryCardList from "./CategoryCardList";

const QuizSelectorChoose = ({ onQuizFetched }) => {
  const { request } = useApiRequest();
  const { colors } = useColors();

  const methods = useForm({
    defaultValues: { count: 10, level: "", category: "" },
    resolver: null,
  });
  const { watch, setValue } = methods;

  const selectedLevel = watch("level");
  const selectedCategory = watch("category");

  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      if (!selectedLevel) {
        setCategoryOptions([]);
        setValue("category", "");
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
      } catch (error) {
        setCategoryOptions([]);
      }
    };

    fetchCategories();
  }, [selectedLevel, request, setValue]);

  const handleSubmit = async (data) => {
    const result = await request({
      url: "/quiz",
      method: "GET",
      params: {
        ...data,
        count: Number(data.count || 10),
      },
    });

    if (result.success) {
      onQuizFetched(result.data);
    } else {
      throw new Error(result.error || "Quiz alınamadı");
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
        position: "relative",
        width: 460,
        height: 600,
        display: "flex",
        flexDirection: "column",
        boxShadow: `0 6px 20px ${colors.primary}30`,
      }}
    >
      {/* Başlık kısmı */}
      <Box sx={{ textAlign: "center", mb: 2, flexShrink: 0 }}>
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
            Özel Quiz 
          </Typography>
        </Box>
        <Typography
          variant="body1"
          color={colors.textSecondary || "text.secondary"}
          sx={{ mt: 1, fontWeight: 500 }}
        >
          Seviyeni seç, kategorini seç ve testine başla 🎯
        </Typography>
      </Box>

      {/* Form + kategori listesi scroll alanı */}
      <Form
        methods={methods}
        schema={schema}
        onSubmit={handleSubmit}
        submitText="🚀 Quizi Başlat"
        buttonSx={{
          py: 1.6,
          fontWeight: 700,
          borderRadius: 12,
          textTransform: "none",
          fontSize: "1.1rem",
          backgroundColor: colors.primary,
          "&:hover": { backgroundColor: colors.primaryDark },
          width: "100%",
          mt: 3,
          boxShadow: `0 4px 12px ${colors.primary}55`,
          flexShrink: 0,
        }}
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CustomSelect
          name="level"
          label="Seviye"
          options={["A1", "A2", "B1", "B2", "C1"]}
        />

       
          <Box
            sx={{
              flexGrow: 1,
              mt: 2,
              mb: 1,
              overflowY: "auto",
              maxHeight: 150,
              borderRadius: 2,
              border: `1px solid ${colors.primaryLight}`,
              p: 1,
              backgroundColor: colors.backgroundLight || "#f9f9f9",
            }}
          >
            <CategoryCardList
              categories={categoryOptions}
              selectedCategory={selectedCategory}
              onSelect={(cat) =>
                setValue("category", cat, { shouldValidate: true })
              }
            />
          </Box>

        <CustomInput
          name="count"
          label="Soru Sayısı"
          type="number"
          autoComplete="off"
          inputProps={{ min: 1, max: 100 }}
          sx={{ mt: selectedLevel ? 2 : 4 }}
        />
      </Form>
    </Paper>
  );
};

export default QuizSelectorChoose;
