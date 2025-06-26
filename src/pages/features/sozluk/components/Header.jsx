import { Box, Typography, Chip, Stack } from "@mui/material";
import React from "react";
import { useColors } from "../../../../context/ColorContext";
import SearchBar from "../../../../components/form/formInputs/SearchBar";

const Header = ({ search, setSearch }) => {
  const { colors } = useColors();

  return (
    <Box
      sx={{
        py: 8,
        px: 3,
        background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
        color: "#fff",
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      {/* Başlık */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: 900,
          fontFamily: "'Montserrat', sans-serif",
          letterSpacing: 1.5,
          mb: 1,
          textShadow: "0 2px 6px rgba(0,0,0,0.2)",
        }}
      >
        🌍 Learnverse Sözlük
      </Typography>

      {/* Alt Başlık */}
      <Typography
        variant="h7"
        sx={{
          fontStyle: "italic",
          color: colors.accent,
          fontWeight: 500,
          mb: 4,
        }}
      >
        Her gün yeni kelimelerle dünyanı genişlet!
      </Typography>

      {/* Özellik/istatistik alanı */}
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        flexWrap="wrap"
        sx={{ mb: 4 ,mt:2}}
      >
        <Chip label="12.000+ Kelime" sx={{ bgcolor: "#ffffff33", color: "#fff" }} />
        <Chip label="Kategoriye Göre Filtrele" sx={{ bgcolor: "#ffffff33", color: "#fff" }} />
        <Chip label="Favorilere Ekle" sx={{ bgcolor: "#ffffff33", color: "#fff" }} />
        <Chip label="Sesli Okuma" sx={{ bgcolor: "#ffffff33", color: "#fff" }} />
      </Stack>

      {/* Arama */}
      <Box sx={{ maxWidth: 400, mx: "auto" }}>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Örneğin: appreciate, clever, enhance..."
        />
      </Box>
    </Box>
  );
};

export default Header;
