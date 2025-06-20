import { Paper, Typography, Box } from "@mui/material";
import { useApiRequest } from "../../../hooks/useApiRequest";
import { CustomSelect } from "../../../components/form/formInputs/CustomSelect";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import { useColors } from "../../../context/ColorContext";
import Form from "../../../components/form/Form";
import { schema } from "./shared/quizSchema";

const QuizSelector = ({ onQuizFetched }) => {
  const { request } = useApiRequest();
  const { colors } = useColors();

  const handleSubmit = async (data) => {
    const result = await request({
      url: "/quiz",
      method: "GET",
      params: { ...data, count: 10 },
    });

    if (result.success) {
      onQuizFetched(result.data);
    } else {
      throw new Error(result.error || "Quiz alınamadı");
    }
  };

  return (
    <Paper
      elevation={5}
      sx={{
        maxWidth: 460,
        height:400,
        mx: "auto",
        mt: 8,
        p: 4,
        borderRadius: 4,
        bgcolor: colors.background || "#fff",
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
        Hemen seviyeni ve kategorini seçerek eğlenceli bir test çöz!
      </Typography>

      <Form
        schema={schema}
        onSubmit={handleSubmit}
        submitText="🚀 Quizi Başlat"
        buttonSx={{
          py: 1.5,
          fontWeight: 600,
          borderRadius: 10,
          backgroundColor: colors.primary,
          color: colors.textOnPrimary || "#fff",
          textTransform: "none",
          fontSize: "1rem",
          "&:hover": {
            backgroundColor: colors.primaryDark,
          },
          width:"100%"
        }}
        sx={{ mt: 1 }}
      >
        <CustomSelect
          name="level"
          label="Seviye"
          options={["A1", "A2", "B1", "B2", "C1"]}
        />

        <CustomSelect
          name="category"
          label="Kategori"
          options={[
            "Greetings",
            "People",
            "Numbers",
            "Family",
            "Colors",
            "Months & Seasons",
          ]}
        />
      </Form>
    </Paper>
  );
};

export default QuizSelector;
