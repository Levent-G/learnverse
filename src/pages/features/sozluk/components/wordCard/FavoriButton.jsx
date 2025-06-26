import { IconButton } from "@mui/material";
import { colors, hexToRgba } from "./shared/wordCardEnums";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const FavoriButton = ({ onToggleFavorite, word, isFavorite }) => {
  return (
    <>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(word.id); // Bu satır doğru şekilde sadece ilgili kelimeyi günceller
        }}
        sx={{
          color: isFavorite ? colors.error : hexToRgba(colors.neutralDark, 0.5),
          "&:hover": {
            color: colors.error,
            transform: "scale(1.2)",
          },
        }}
      >
        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </>
  );
};

export default FavoriButton;
