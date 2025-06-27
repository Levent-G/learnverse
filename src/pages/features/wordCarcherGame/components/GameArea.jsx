import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { BearWithArms } from "../../quizler/BearWithArms";
import { useColors } from "../../../../context/ColorContext";

export default function GameArea({
  fallingWord,
  position,
  wordPairs,
  onSelectAnswer,
  bearExpression,
}) {
  const { colors } = useColors();

  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "600px", md: "600px" },
        overflow: "hidden",
        bgcolor: colors.primaryLight,
        borderRadius: 3,
        p: { xs: 3, md: 5 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: `0 8px 24px ${colors.primary}33`,
      }}
    >
      {/* Üst alan - düşen kelime ve ayı */}
      <Box sx={{ position: "relative", flexGrow: 1 }}>
        {fallingWord && (
          <Paper
            elevation={6}
            sx={{
              position: "absolute",
              top: `${position}%`,
              left: "50%",
              transform: "translateX(-50%)",
              px: 4,
              py: 1.5,
              borderRadius: 3,
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(8px)",
              color: colors.primaryDark,
              fontWeight: 700,
              fontSize: { xs: "22px", md: "30px" },
              transition: "top 0.1s linear",
              textAlign: "center",
              zIndex: 10,
              boxShadow: `0 8px 20px ${colors.primary}44`,
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            {fallingWord.word}
          </Paper>
        )}

        {/* Ayı solda */}
        <Box
          sx={{
            position: "absolute",
            bottom: 40,
            left: { xs: "50%", md: 40 },
            transform: { xs: "translateX(-50%)", md: "none" },
            zIndex: 5,
          }}
        >
          <BearWithArms size={130} expression={bearExpression} />
        </Box>
      </Box>

      {/* Alt alan - seçenekler */}
      <Box sx={{ mt: 5 }}>
        <Typography
          variant="subtitle1"
          sx={{
            textAlign: "center",
            color: colors.primaryDark,
            mb: 3,
            fontWeight: 600,
            userSelect: "none",
          }}
        >
          Kelimenin Türkçe anlamını seç!
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {wordPairs.map((word) => (
            <Grid item key={word.id} xs={12} sm="auto">
              <Button
                variant="contained"
                onClick={() => onSelectAnswer(word.meaning)}
                sx={{
                  px: 4,
                  py: 1.75,
                  fontSize: { xs: "16px", md: "18px" },
                  textTransform: "none",
                  bgcolor: colors.primary,
                  color: "#fff",
                  borderRadius: 3,
                  boxShadow: `0 5px 12px ${colors.primary}77`,
                  transition: "background-color 0.3s ease",
                  minWidth: 160,
                  "&:hover": {
                    bgcolor: colors.primaryDark,
                    boxShadow: `0 8px 24px ${colors.primary}aa`,
                  },
                }}
              >
                {word.meaning}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
