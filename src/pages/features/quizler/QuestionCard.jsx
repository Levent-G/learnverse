import { Paper, Typography, Box, Button, keyframes } from "@mui/material";
import { BearWithArms } from "./BearWithArms";

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7); }
  70% { box-shadow: 0 0 10px 10px rgba(76, 175, 80, 0); }
  100% { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0); }
`;

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
  let bearExpression = "neutral";
  if (showResult) {
    if (selectedAnswer === correctAnswer) {
      bearExpression = "happy";
    } else {
      bearExpression = "sad";
    }
  }
  return (
    <Box sx={{ position: "relative", display: "inline-block" }}>
      {/* Ayının kafa kısmı dışarıda kalacak şekilde */}
      <Box
        sx={{
          position: "absolute",
          top: -40,
          left: 24,
          width: 60,
          height: 40,
          overflow: "visible",
          zIndex: 2,
        }}
      >
        <BearWithArms size={60} expression={bearExpression} />
      </Box>

      <Paper
        elevation={3}
        sx={{
          p: 4,
          pt: 7, // üst boşluk ayıya çarpmasın
          borderRadius: 3,
          bgcolor: "#fafafa",
          zIndex: 1,
          position: "relative",
          overflow: "visible", // kollar görünür kalsın
        }}
      >
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
              } else if (
                option === selectedAnswer &&
                option !== correctAnswer
              ) {
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
    </Box>
  );
}
