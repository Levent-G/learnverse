import React, { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import confetti from "canvas-confetti";

export default function GameOverScreen({ score, onRestart }) {
  useEffect(() => {
    // Konfeti patlat
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      // Sağdan ve soldan patlat
      confetti({
        ...defaults,
        particleCount,
        origin: { x: Math.random(), y: Math.random() * 0.6 + 0.1 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        height: 400,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        color: "neutralDark",
        position: "relative",
        overflow: "hidden",
        px: 3,
      }}
    >
      <Typography variant="h4" fontWeight={700}>
        Oyun Bitti!
      </Typography>
      <Typography variant="body1">Puanın: {score}</Typography>
      <Button
        variant="contained"
        onClick={onRestart}
        sx={{
          backgroundColor: "primary.main",
          px: 5,
          py: 1,
          borderRadius: 4,
          fontWeight: 700,
          textTransform: "none",
          boxShadow: "0 4px 12px rgba(14,165,233,0.5)",
          "&:hover": {
            backgroundColor: "primary.dark",
            boxShadow: "0 6px 18px rgba(3,105,161,0.6)",
          },
          mt: 2,
        }}
      >
        Tekrar Oyna
      </Button>
    </Box>
  );
}
