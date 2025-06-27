// src/components/InfoBox.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

export default function InfoBox() {
  return (
    <Box
      sx={{
        background: "linear-gradient(90deg, #E0F2FE, #C7D2FE)",
        p: 2,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        mb: 3,
      }}
    >
      <InfoIcon sx={{ color: "#0369A1", mr: 2 }} />
      <Typography variant="body1" sx={{ color: "#0369A1" }}>
        Watch videos and unlock your English superpowers! 🚀
      </Typography>
    </Box>
  );
}
