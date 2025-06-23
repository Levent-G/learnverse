import { Typography, Box, Paper, Divider } from "@mui/material";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import { useApiRequest } from "../../../../hooks/useApiRequest";
import { useColors } from "../../../../context/ColorContext";
import Form from "../../../../components/form/Form";
import { CustomInput } from "../../../../components/form/formInputs/CustomInput";
import { schemaRandom } from "../shared/quizSchema";
import { notify } from "../../../../utils/notify";

const QuizSelectorRandom = ({ onQuizFetched }) => {
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo")) || {};
  const { level: userLevel } = userInfo;

  const { request } = useApiRequest();
  const { colors } = useColors();

  const handleStartQuiz = async (data) => {
    const count = Number(data.count);

    try {
      const result = await request({
        url: "/quiz",
        method: "GET",
        params: {
          level: userLevel,
          count,
        },
      });

      if (result.success) {
        onQuizFetched(result.data);
      } else {
        notify("Quiz alınamadı ", "error");
      }
    } catch (error) {
      alert(error.message);
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
      {/* Başlık */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <EmojiObjectsIcon
          sx={{
            fontSize: 36,
            mb: 1,
            color: colors.primary || "#1976d2",
          }}
        />
        <Typography variant="h5" fontWeight={700}>
          Hızlı Quiz
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
          Seviye: <strong>{userLevel}</strong>
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Bilgilendirme kutusu */}
      <Box
        sx={{
          mb: 3,
          mt: 9,
          p: 2,
          borderRadius: 3,
          bgcolor: colors.backgroundLight || "#f9f9f9",
          color: colors.textSecondary,
          fontSize: "0.9rem",
          boxShadow: `inset 0 0 10px ${colors.primary}15`,
          lineHeight: 1.6,
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight={600}
          color={colors.primary}
          mb={1}
        >
          📌 Nasıl çalışır?
        </Typography>
        <Typography>
          Seviye otomatik ayarlandı. Her quizde kategori rastgele belirlenir, bu
          sayede farklı konuları öğrenmiş olursun.
        </Typography>
        <Typography mt={1}>Sadece soru sayısını girmen yeterli.</Typography>
      </Box>

      {/* Form */}
      <Form
        schema={schemaRandom}
        defaultValues={{ count: 10 }}
        onSubmit={handleStartQuiz}
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
