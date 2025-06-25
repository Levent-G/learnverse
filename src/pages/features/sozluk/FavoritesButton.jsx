import React from "react";
import { IconButton, Badge, Tooltip } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useColors } from "../../../context/ColorContext";

export default function FavoritesButton({ onClick, favoritesCount = 0 }) {
  const { colors } = useColors();

  return (
    <Tooltip title={`${favoritesCount} favori`}>
      <IconButton
        aria-label="Favorilere Git"
        onClick={onClick}
        sx={{
          color: colors.primaryDark,
          transition: "color 0.3s ease",
          "&:hover": { color: colors.accent },
        }}
      >
        <Badge badgeContent={favoritesCount} color="error">
          <FavoriteIcon fontSize="large" />
        </Badge>
      </IconButton>
    </Tooltip>
  );
}
