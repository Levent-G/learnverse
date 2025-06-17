import React from "react";
import { Card, Typography, Chip } from "@mui/material";
import { useColors } from "../../../context/ColorContext";

const PhraseCard = ({ phrase, onClick }) => {
  const { colors } = useColors();

  return (
    <Card
      sx={{
        p: 2,
        cursor: "pointer",
        borderRadius: 3,
        boxShadow: `0 4px 10px ${colors.primaryDark}26`, // 15% opacity
        transition: "box-shadow 0.3s ease",
        "&:hover": {
          boxShadow: `0 6px 14px ${colors.primaryDark}59`, // 35% opacity
        },
      }}
      onClick={onClick}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: colors.primaryDark }}>
        {phrase.text}
      </Typography>
      <Chip
        label={phrase.category}
        size="small"
        sx={{
          backgroundColor: colors.secondary,
          color: colors.neutralLight,
          fontWeight: 600,
          padding: "4px 8px",
        }}
      />
    </Card>
  );
};

export default PhraseCard;
