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
import InfoIcon from "@mui/icons-material/Info";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

const colors = {
  primaryDark: "#1E1E2F",
  primaryLight: "#F1F5F9",
  accent: "#3B82F6",
  neutralDark: "#64748B",
  neutralLight: "#F8FAFC",
  error: "#EF4444",
  info: "#0EA5E9",
};

const hexToRgba = (hex, alpha = 1) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
};

const WordCard = ({ word, isFavorite, onToggleFavorite, onClick }) => {
  const [showExample, setShowExample] = useState(false);

  // word objesine eksik alanları mock olarak ekle
  const updatedWord = {
    ...word,
    info:
      word.info ||
      "Bu kelime genellikle akademik ya da resmi yazışmalarda kullanılır.",
    hint: word.hint || "Benzer kelimeleri düşün: achieve, complete.",
    example: word.example || `Example usage of "${word.word}" in a sentence.`,
    tags: word.tags || ["örnek", "kelime", "deneme"],
  };
console.log(word)
  return (
    <Card
      onClick={onClick}
      sx={{
        borderRadius: 4,
        backgroundColor: "#ffffff",
        border: `1px solid ${hexToRgba(colors.neutralDark, 0.1)}`,
        boxShadow: `0 6px 14px ${hexToRgba(colors.primaryDark, 0.08)}`,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: `0 14px 28px ${hexToRgba(colors.primaryDark, 0.15)}`,
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 3,
        minHeight: 240,
      }}
    >
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <Avatar
          sx={{
            bgcolor: colors.accent,
            color: "#fff",
            fontWeight: "bold",
            fontSize: 20,
            width: 48,
            height: 48,
            boxShadow: `0 4px 8px ${hexToRgba(colors.primaryDark, 0.25)}`,
            userSelect: "none",
          }}
        >
          {updatedWord.word[0]?.toUpperCase()}
        </Avatar>

        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h6"
            sx={{
              color: colors.primaryDark,
              fontWeight: 700,
              textTransform: "capitalize",
              fontSize: "1.25rem",
            }}
          >
            {updatedWord.word}
          </Typography>
          {updatedWord.type && (
            <Typography
              variant="subtitle2"
              sx={{
                color: hexToRgba(colors.neutralDark, 0.65),
                fontStyle: "italic",
                fontWeight: 500,
              }}
            >
              {updatedWord.type}
            </Typography>
          )}
        </Box>

        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(word.id); // Bu satır doğru şekilde sadece ilgili kelimeyi günceller
          }}
          sx={{
            color: isFavorite
              ? colors.error
              : hexToRgba(colors.neutralDark, 0.5),
            "&:hover": {
              color: colors.error,
              transform: "scale(1.2)",
            },
          }}
        >
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>

      {/* Anlam Alanı */}
      <Box
        sx={{
          backgroundColor: "#F9FAFB",
          borderLeft: `4px solid ${colors.accent}`,
          borderRadius: 2,
          px: 2,
          py: 1.5,
          mb: 2,
          boxShadow: `0 1px 4px ${hexToRgba(colors.primaryDark, 0.06)}`,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            display: "flex",
            alignItems: "center",
            color: colors.accent,
            fontWeight: 700,
            mb: 0.5,
            fontSize: "0.85rem",
            letterSpacing: 0.4,
          }}
        >
          📖 Anlamı
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: colors.primaryDark,
            fontWeight: 500,
            lineHeight: 1.7,
            fontSize: "1rem",
          }}
        >
          {updatedWord.meaning}
        </Typography>
      </Box>

      {/* Seviye Alanı - Yeni Tasarım */}
      {updatedWord.level && (
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            px: 1.5,
            py: 0.6,
            borderRadius: 2,
            background: `linear-gradient(135deg, ${colors.accent}11, ${colors.accent}22)`,
            color: colors.primaryDark,
            fontWeight: "bold",
            fontSize: "0.8rem",
            mb: 1,
            width: "fit-content",
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: colors.accent,
            }}
          />
          Seviye: {updatedWord.level}
        </Box>
      )}

      {/* Bilgi Mesajı */}
      {updatedWord.info && (
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          color={colors.info}
          fontSize="0.85rem"
          mb={2}
          mt={1}
        >
          <InfoIcon fontSize="small" />
          {updatedWord.info}
        </Box>
      )}

      {/* İpucu */}
      {updatedWord.hint && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: colors.accent,
            fontStyle: "italic",
            fontSize: "0.9rem",
            mb: 2,
          }}
        >
          <LightbulbIcon fontSize="small" />
          {updatedWord.hint}
        </Box>
      )}

      {/* Etiketler */}
      <Box display="flex" gap={1} flexWrap="wrap" mb={2} mt={2}>
        {updatedWord.tags?.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            sx={{
              bgcolor: hexToRgba(colors.primaryLight, 0.8),
              color: hexToRgba(colors.primaryDark, 0.95),
              fontWeight: 500,
              textTransform: "capitalize",
              userSelect: "none",
            }}
          />
        ))}
      </Box>

      {/* Örnek ve Sesli Okuma */}
      {updatedWord.example && (
        <>
          <Button
            variant="outlined"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setShowExample((prev) => !prev);
            }}
            sx={{
              color: colors.accent,
              borderColor: colors.accent,
              fontWeight: 600,
              textTransform: "none",
              fontSize: "0.85rem",
              px: 2,
              py: 0.5,
              borderRadius: 2,
              background: `linear-gradient(135deg, ${hexToRgba(
                colors.accent,
                0.04
              )}, ${hexToRgba(colors.accent, 0.08)})`,
              boxShadow: `0 2px 6px ${hexToRgba(colors.accent, 0.15)}`,
              transition: "all 0.25s ease-in-out",
              alignSelf: "flex-start",
              "&:hover": {
                backgroundColor: hexToRgba(colors.accent, 0.1),
                borderColor: colors.accent,
                transform: "scale(1.03)",
                boxShadow: `0 4px 10px ${hexToRgba(colors.accent, 0.25)}`,
              },
            }}
          >
            {showExample ? "Örneği Gizle" : "Örneği Göster"}
          </Button>

          <Collapse in={showExample} timeout="auto" unmountOnExit>
            <Box
              sx={{
                color: hexToRgba(colors.neutralDark, 0.9),
                borderLeft: `3px solid ${colors.accent}`,
                pl: 2,
                fontStyle: "italic",
                mb: 1,
                mt: 2,
              }}
            >
              "{updatedWord.example}"
            </Box>
          </Collapse>
        </>
      )}
      <Button
        variant="outlined"
        size="small"
        startIcon={<VolumeUpIcon fontSize="small" />}
        onClick={onClick}
        sx={{
          color: colors.accent,
          borderColor: hexToRgba(colors.accent, 0.6),
          fontWeight: 500,
          textTransform: "none",
          fontSize: "0.75rem",
          ml: "auto",
          mb: 1,
          px: 1.5,
          py: 0.4,
          borderRadius: 1.5,
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: hexToRgba(colors.accent, 0.1),
            borderColor: colors.accent,
            transform: "scale(1.02)",
          },
        }}
      >
        Dinle
      </Button>
    </Card>
  );
};

export default WordCard;
