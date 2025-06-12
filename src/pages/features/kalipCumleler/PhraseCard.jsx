import React from "react";
import { Card, Typography, Chip } from "@mui/material";

const PhraseCard = ({ phrase, onClick }) => (
  <Card
    sx={{
      p: 2,
      cursor: "pointer",
      borderRadius: 3,
      boxShadow: "0 4px 10px rgba(106,27,154,0.15)",
      transition: "box-shadow 0.3s ease",
      "&:hover": { boxShadow: "0 6px 14px rgba(106,27,154,0.35)" },
    }}
    onClick={onClick}
  >
    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
      {phrase.text}
    </Typography>
    <Chip label={phrase.category} color="secondary" size="small" />
  </Card>
);

export default PhraseCard;
