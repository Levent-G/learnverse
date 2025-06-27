// components/ScoreBoard.jsx
import React from "react";
import { Box, Typography } from "@mui/material";

export default function ScoreBoard({ score, lives }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: { xs: 6, md: 10 },
        mb: 6,
      }}
    >
      {/* Skor */}
      <Box
        sx={{
          bgcolor: "primaryLight",
          borderRadius: "50%",
          width: 110,
          height: 110,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
          fontSize: 30,
          color: "primaryDark",
          boxShadow: "0 0 14px 3px rgba(14,165,233,0.3)",
          animation: "scorePulse 3000ms ease-in-out infinite",
          "@keyframes scorePulse": {
            "0%, 100%": { boxShadow: "0 0 14px 3px rgba(14,165,233,0.3)" },
            "50%": { boxShadow: "0 0 24px 8px rgba(14,165,233,0.15)" },
          },
        }}
      >
        <Typography variant="h6" sx={{ mb: 0.5 }}>
          Skor
        </Typography>
        {score}
      </Box>

      {/* Can */}
      <Box
        sx={{
          bgcolor: "errorLight",
          borderRadius: "50%",
          width: 110,
          height: 110,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
          fontSize: 30,
          color: "errorDark",
          boxShadow: "0 0 14px 3px rgba(252,165,165,0.3)",
          animation: "lifePulse 3000ms ease-in-out infinite",
          "@keyframes lifePulse": {
            "0%, 100%": { boxShadow: "0 0 14px 3px rgba(252,165,165,0.3)" },
            "50%": { boxShadow: "0 0 24px 8px rgba(252,165,165,0.15)" },
          },
        }}
      >
        <Typography variant="h6" sx={{ mb: 0.5 }}>
          Can
        </Typography>
        {lives}
      </Box>
    </Box>
  );
}
