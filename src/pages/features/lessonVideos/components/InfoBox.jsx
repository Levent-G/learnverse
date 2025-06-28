import React from "react";
import { Box, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function InfoBox() {
  return (
    <Box
      sx={{
        backgroundColor: "#EFF6FF",
        borderLeft: "5px solid #3B82F6",
        p: 2.5,
        mb: 5,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        boxShadow: "0 2px 8px rgba(59, 130, 246, 0.15)",
        color: "#1E40AF",
      }}
      role="alert"
      aria-live="polite"
    >
      <InfoOutlinedIcon fontSize="medium" />
      <Typography variant="body1" sx={{ fontWeight: 600, fontSize: 16 }}>
        Watch videos and unlock your English superpowers! 🚀
      </Typography>
    </Box>
  );
}
