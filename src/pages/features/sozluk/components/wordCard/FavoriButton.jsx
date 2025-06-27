import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { colors, hexToRgba } from "./shared/wordCardEnums";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const FavoriButton = ({ onToggleFavorite, word, isFavorite }) => {
  const [localFavorite, setLocalFavorite] = useState(isFavorite);

  useEffect(() => {
    // dışarıdan gelen değişiklikleri izleyelim
    setLocalFavorite(isFavorite);
  }, [isFavorite]);

  const handleClick = (e) => {
    e.stopPropagation();
    setLocalFavorite((prev) => !prev);
    onToggleFavorite(word.id);
  };

  return (
    <IconButton
      onClick={handleClick}
      sx={{
        color: localFavorite
          ? colors.error
          : hexToRgba(colors.neutralDark, 0.5),
        "&:hover": {
          color: colors.error,
          transform: "scale(1.2)",
        },
      }}
    >
      {localFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

export default FavoriButton;
