import React from "react";
import {
  Card,
  IconButton,
  Typography,
  Box,
  Avatar,
  Chip,
  Tooltip,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useColors } from "../../../context/ColorContext";

export default function WordCard({ word, isFavorite, onToggleFavorite, onClick }) {
  const { colors } = useColors();

  return (
    <Card
      onClick={onClick}
      sx={{
        height: "100%",
        cursor: "pointer",
        borderRadius: 3,
        backgroundColor: colors.neutralLight,
        boxShadow: "0 3px 10px rgba(0,0,0,0.07)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: `0 10px 25px ${colors.accent}99`,
          backgroundColor: colors.primaryLight,
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 3,
        minHeight: 180,
      }}
      elevation={6}
    >
      <Box display="flex" alignItems="center" gap={2} mb={1}>
        <Avatar
          sx={{
            bgcolor: colors.accent,
            color: colors.primaryDark,
            fontWeight: "bold",
            fontSize: 18,
            width: 44,
            height: 44,
            boxShadow: `0 2px 8px ${colors.accent}aa`,
            userSelect: "none",
          }}
          aria-label={`Kelimenin ilk harfi: ${word.word[0]}`}
        >
          {word.word[0]?.toUpperCase()}
        </Avatar>

        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h6"
            sx={{
              color: colors.primaryDark,
              fontWeight: 700,
              userSelect: "none",
              textTransform: "capitalize",
              fontSize: "1.1rem",
            }}
          >
            {word.word}
          </Typography>
          {word.type && (
            <Typography
              variant="caption"
              sx={{ color: colors.neutralDark, fontStyle: "italic" }}
            >
              {word.type}
            </Typography>
          )}
        </Box>

        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(word.id);
          }}
          size="small"
          aria-label={isFavorite ? "Favorilerden kaldır" : "Favorilere ekle"}
          sx={{
            color: isFavorite ? colors.error : colors.neutralDark,
            transition: "transform 0.3s ease, color 0.3s ease",
            "&:hover": {
              transform: "scale(1.3)",
              color: colors.error,
            },
          }}
        >
          {isFavorite ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
        </IconButton>
      </Box>

      <Typography
        variant="body2"
        sx={{
          color: colors.neutralDark,
          fontWeight: 500,
          fontSize: "0.9rem",
          minHeight: 48,
          lineHeight: 1.4,
          userSelect: "text",
          mb: 1,
        }}
      >
        {word.meaning}
      </Typography>

      <Box display="flex" gap={1} flexWrap="wrap" mb={1}>
        {word.tags?.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            sx={{
              bgcolor: colors.primaryLight,
              color: colors.primaryDark,
              fontWeight: 600,
              textTransform: "capitalize",
              userSelect: "none",
              boxShadow: `0 1px 3px ${colors.accent}66`,
            }}
          />
        ))}
      </Box>

      {word.example && (
        <Tooltip title="Örnek cümle" placement="top">
          <Typography
            variant="caption"
            sx={{
              fontStyle: "italic",
              color: colors.neutralDark,
              userSelect: "text",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              cursor: "help",
            }}
          >
            "{word.example}"
          </Typography>
        </Tooltip>
      )}
    </Card>
  );
}
