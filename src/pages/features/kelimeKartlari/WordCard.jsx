import React from "react";
import { Card, Typography, Box, IconButton, Chip } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const WordCard = ({ word, isFavorite, onToggleFavorite, onClick }) => {
  return (
    <Card
      sx={{
        p: 2,
        cursor: "pointer",
        borderRadius: 3,
        boxShadow: "0 4px 10px rgba(142,36,170,0.15)",
        "&:hover": { boxShadow: "0 6px 14px rgba(142,36,170,0.35)" },
      }}
      onClick={onClick}
    >
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
        {word.word}
      </Typography>
      <Typography sx={{ color: "#666", mb: 1 }}>{word.meaning}</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Chip
          label={word.category}
          color="secondary"
          size="small"
          sx={{ padding: 1 }}
        />
        <IconButton
          color="error"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(word.id);
          }}
        >
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>
    </Card>
  );
};

export default WordCard;
