import React, { useState } from "react";
import {
  Card,
  IconButton,
  Typography,
  Box,
  Avatar,
  Chip,
  Collapse,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { useColors } from "../../../../context/ColorContext";

const WordCard = ({ word, isFavorite, onToggleFavorite, onClick }) => {
  const { colors } = useColors();
  const [showExample, setShowExample] = useState(false);

  // Yardımcı fonksiyon: rgba oluştur (hex to rgba)
  const hexToRgba = (hex, alpha = 1) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  };

  return (
    <Card
      onClick={onClick}
      sx={{
        height: "100%",
        cursor: "pointer",
        borderRadius: 4,
        backgroundColor: hexToRgba(colors.neutralLight, 0.9), // biraz transparan
        boxShadow: `0 6px 15px ${hexToRgba(colors.primaryDark, 0.35)}`, // Daha koyu gölge
        transition: "transform 0.35s ease, box-shadow 0.35s ease",
        "&:hover": {
          transform: "translateY(-8px) scale(1.02)",
          boxShadow: `0 14px 30px ${hexToRgba(colors.primaryDark, 0.55)}`, // Hoverda gölge koyulaştı
          backgroundColor: hexToRgba(colors.primaryLight, 0.85), // transparan hover
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 3,
        minHeight: 210,
      }}
      elevation={8}
    >
      <Box display="flex" alignItems="center" gap={2} mb={1}>
        <Avatar
          sx={{
            bgcolor: colors.accent,
            color: hexToRgba(colors.primaryDark, 0.95), // Yazı biraz daha koyu
            fontWeight: "bold",
            fontSize: 20,
            width: 50,
            height: 50,
            boxShadow: `0 4px 10px ${hexToRgba(colors.primaryDark, 0.6)}`, // İkon gölgesi koyu yapıldı
            userSelect: "none",
          }}
          aria-label={`Kelimenin ilk harfi: ${word.word[0]}`}
        >
          {word.word[0]?.toUpperCase()}
        </Avatar>

        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h5"
            sx={{
              color: hexToRgba(colors.primaryDark, 0.95),
              fontWeight: 800,
              userSelect: "none",
              textTransform: "capitalize",
              fontSize: "1.3rem",
              letterSpacing: 1,
            }}
          >
            {word.word}
          </Typography>
          {word.type && (
            <Typography
              variant="subtitle2"
              sx={{
                color: hexToRgba(colors.neutralDark, 0.8), // Yazı biraz açık
                fontStyle: "italic",
                fontWeight: 600,
                letterSpacing: 0.5,
              }}
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
          size="medium"
          aria-label={isFavorite ? "Favorilerden kaldır" : "Favorilere ekle"}
          sx={{
            color: isFavorite ? colors.error : hexToRgba(colors.neutralDark, 0.6),
            transition: "transform 0.3s ease, color 0.3s ease",
            "&:hover": {
              transform: "scale(1.4)",
              color: colors.error,
              boxShadow: `0 0 8px ${hexToRgba(colors.error, 0.7)}`, // Hoverda hafif kırmızı ışıltı
            },
          }}
        >
          {isFavorite ? (
            <FavoriteIcon fontSize="medium" />
          ) : (
            <FavoriteBorderIcon fontSize="medium" />
          )}
        </IconButton>
      </Box>

      <Typography
        variant="body1"
        sx={{
          color: hexToRgba(colors.neutralDark, 0.85),
          fontWeight: 600,
          fontSize: "1rem",
          minHeight: 56,
          lineHeight: 1.5,
          userSelect: "text",
          mb: 1,
        }}
      >
        {word.meaning}
      </Typography>

      {word.level && (
        <Chip
          label={`Seviye: ${word.level}`}
          size="small"
          color="primary"
          sx={{
            fontWeight: "bold",
            borderRadius: 2,
            userSelect: "none",
            mb: 1,
            boxShadow: `0 2px 6px ${hexToRgba(colors.primaryDark, 0.4)}`, // Daha koyu gölge
            backgroundColor: hexToRgba(colors.primaryLight, 0.9),
            color: hexToRgba(colors.primaryDark, 0.9),
          }}
        />
      )}

      {word.hint && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: hexToRgba(colors.accent, 0.9),
            fontStyle: "italic",
            userSelect: "text",
            mb: 1,
            fontSize: "0.9rem",
          }}
        >
          <LightbulbIcon
            fontSize="small"
            sx={{
              filter: `drop-shadow(0 0 1.5px ${hexToRgba(colors.accent, 0.7)})`, // İkon gölgesi
            }}
          />
          {word.hint}
        </Box>
      )}

      <Box display="flex" gap={1} flexWrap="wrap" mb={1}>
        {word.tags?.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            sx={{
              bgcolor: hexToRgba(colors.primaryLight, 0.85),
              color: hexToRgba(colors.primaryDark, 0.95),
              fontWeight: 600,
              textTransform: "capitalize",
              userSelect: "none",
              boxShadow: `0 1px 3px ${hexToRgba(colors.primaryDark, 0.3)}`, // Chip gölgesi koyu
            }}
          />
        ))}
      </Box>

      {word.example && (
        <>
          <Button
            variant="outlined"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setShowExample((prev) => !prev);
            }}
            sx={{
              color: hexToRgba(colors.primaryDark, 0.95),
              borderColor: hexToRgba(colors.primaryLight, 0.95),
              fontWeight: 600,
              textTransform: "none",
              mb: 1,
              alignSelf: "flex-start",
            }}
          >
            {showExample ? "Örnek Cümleyi Gizle" : "Örnek Cümleyi Göster"}
          </Button>
          <Collapse
            in={showExample}
            timeout="auto"
            unmountOnExit
            sx={{
              color: hexToRgba(colors.neutralDark, 0.8),
              fontStyle: "italic",
              userSelect: "text",
              borderLeft: `3px solid ${hexToRgba(colors.accent, 0.7)}`,
              pl: 2,
            }}
          >
            "{word.example}"
          </Collapse>
        </>
      )}
    </Card>
  );
};

export default WordCard;
