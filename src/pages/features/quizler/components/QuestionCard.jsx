import { Paper, Typography, Box, Button, keyframes } from "@mui/material";
import { BearWithArms } from "../BearWithArms"; // path'ini kendi yapına göre ayarla

// Animasyonlar
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

const slideFadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export default function QuestionCard({
  question,
  options,
  selectedAnswer,
  correctAnswer,
  showResult,
  onSelect,
  colors,
  consecutiveCorrect, 
}) {
  let bearExpression = "neutral";

  if (consecutiveCorrect >= 3) {
    bearExpression = "surprised"; 
  } else if (showResult) {
    if (selectedAnswer === correctAnswer) {
      bearExpression = "happy";
    } else {
      bearExpression = "sad";
    }
  }

  return (
    <Box sx={{ position: "relative", display: "inline-block" }}>
      {/* Ayı karakteri */}
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

      {/* Soru kartı */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          pt: 7,
          borderRadius: 3,
          bgcolor: "#fafafa",
          zIndex: 1,
          position: "relative",
          overflow: "visible",
          animation: `${slideFadeIn} 1s ease`,
        }}
      >
        <Box sx={{ mb: 2 }}>
        
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: colors.textPrimary,
              mb: 1,
              userSelect: "text",
            }}
          >
            {question.toUpperCase()}
          </Typography>
        </Box>

        {/* Seçenekler */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {options.map((option, idx) => {
            let bgColor,
              variant = "outlined",
              animation = "none";

            if (showResult) {
              if (option === correctAnswer) {
                bgColor = colors.success;
                variant = "contained";
                animation = `${pulse} 1s ease forwards`;
              } else if (
                option === selectedAnswer &&
                option !== correctAnswer
              ) {
                bgColor = colors.error;
                variant = "contained";
                animation = `${shake} 1s ease`;
              } else {
                bgColor = "transparent";
                variant = "outlined";
                animation = "none";
              }
            } else {
              if (selectedAnswer === option) {
                bgColor = colors.primary;
                variant = "contained";
                animation = "none";
              } else {
                bgColor = "transparent";
                variant = "outlined";
                animation = "none";
              }
            }

            return (
              <Button
              key={idx}
              variant={variant === "contained" ? "contained" : "outlined"}
              onClick={() => !showResult && onSelect(option)}
              sx={{
                justifyContent: "flex-start",
                textTransform: "none",
                fontWeight: 700,
                borderRadius: 3,
                py: 1.5,
                px: 2,
                bgcolor: bgColor,
                color: variant === "contained" ? "#fff" : colors.primary,
                border:
                  variant === "outlined"
                    ? `2px solid ${colors.primary}`
                    : "none",
                boxShadow:
                  variant === "contained"
                    ? "0 4px 10px rgb(14 165 233 / 0.4)"
                    : "none",
                transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: showResult ? "default" : "pointer",
                pointerEvents: showResult ? "none" : "auto",  // Tıklamayı engelle
            
                "&:hover": {
                  bgcolor: showResult
                    ? undefined  // hover yok
                    : variant === "contained"
                    ? `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.primary} 100%)`
                    : colors.primary,
                  color: showResult
                    ? undefined
                    : variant === "outlined"
                    ? "#fff"
                    : "#fff",
                  boxShadow: showResult
                    ? "none"
                    : variant === "contained"
                    ? "0 6px 14px rgb(14 165 233 / 0.6)"
                    : `0 0 8px ${colors.primary}`,
                  transform: showResult ? "none" : "scale(1.05)",
                },
            
                "&:focus-visible": {
                  outline: `3px solid ${colors.secondary}`,
                  outlineOffset: "2px",
                },
            
                animation: animation,
              }}
            >
              {option.toLocaleUpperCase('tr-TR')}
            </Button>
            
            );
          })}
        </Box>
      </Paper>
    </Box>
  );
}
