import { Paper, Typography, Box, Button, keyframes } from "@mui/material";

// Doğru cevap için hafif bir pulse animasyonu
const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7); }
  70% { box-shadow: 0 0 10px 10px rgba(76, 175, 80, 0); }
  100% { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0); }
`;

// Yanlış cevap için hafif bir shake animasyonu
const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-3px); }
  50% { transform: translateX(3px); }
  75% { transform: translateX(-3px); }
  100% { transform: translateX(0); }
`;

export default function QuestionCard({
  question,
  options,
  selectedAnswer,
  correctAnswer,
  showResult,
  onSelect,
  colors,
  questionNumber,
}) {
  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 3, bgcolor: "#fafafa" }}>
      <Box sx={{ mb: 2 }}>
        {questionNumber !== undefined && (
          <Typography
            variant="overline"
            sx={{ color: colors.textSecondary, fontWeight: 700, mb: 0.5 }}
          >
            Soru {questionNumber}
          </Typography>
        )}
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: colors.textPrimary,
            mb: 1,
            userSelect: "text",
          }}
        >
          {question}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {options.map((option, idx) => {
          let bgColor,
            color,
            variant = "outlined",
            animation = "none";

          if (showResult) {
            if (option === correctAnswer) {
              bgColor = colors.success;
              color = "#fff";
              variant = "contained";
              animation = `${pulse} 1s ease forwards`;
            } else if (option === selectedAnswer && option !== correctAnswer) {
              bgColor = colors.error;
              color = "#fff";
              variant = "contained";
              animation = `${shake} 0.5s ease`;
            } else {
              bgColor = "transparent";
              color = colors.textSecondary;
              variant = "outlined";
              animation = "none";
            }
          } else {
            if (selectedAnswer === option) {
              bgColor = colors.primary;
              color = "#fff";
              variant = "contained";
              animation = "none";
            } else {
              bgColor = "transparent";
              color = colors.textPrimary;
              variant = "outlined";
              animation = "none";
            }
          }

          return (
            <Button
              key={idx}
              variant={variant}
              onClick={() => !showResult && onSelect(option)}
              sx={{
                justifyContent: "flex-start",
                textTransform: "none",
                fontWeight: variant === "contained" ? 700 : 400,
                borderRadius: 2,
                py: 1.5,
                bgcolor: bgColor,
                color: color,
                pointerEvents: showResult ? "none" : "auto",
                transition: "all 0.3s ease",
                animation: animation,
              }}
            >
              {option}
            </Button>
          );
        })}
      </Box>
    </Paper>
  );
}
