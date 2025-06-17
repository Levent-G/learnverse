import React from "react";
import { Card, Typography, Box, IconButton, Chip } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useColors } from "../../../context/ColorContext";

const WordCard = ({ word, isFavorite, onToggleFavorite, onClick }) => {
  const { colors } = useColors();

  return (
    <Card
      sx={{
        p: 2,
        cursor: "pointer",
        borderRadius: 3,
        boxShadow: `0 4px 10px ${colors.primary}26`, // 26 = 15% opacity hex alpha
        transition: "box-shadow 0.3s ease",
        "&:hover": {
          boxShadow: `0 6px 14px ${colors.primary}59`, // 59 = 35% opacity
        },
      }}
      onClick={onClick}
    >
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: colors.primaryDark }}>
        {word.word}
      </Typography>
      <Typography sx={{ color: colors.neutralDark, mb: 1 }}>{word.meaning}</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Chip
          label={word.category}
          size="small"
          sx={{
            backgroundColor: colors.secondary,
            color: colors.neutralLight,
            fontWeight: 600,
            padding: "4px 8px",
          }}
        />
        <IconButton
          sx={{ color: isFavorite ? colors.error : colors.neutralDark }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(word.id);
          }}
          aria-label={isFavorite ? "Favorilerden kaldır" : "Favorilere ekle"}
        >
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>
    </Card>
  );
};

export default WordCard;
