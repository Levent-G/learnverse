import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  List,
  ListItemButton,
  Slide,
  Button,
} from "@mui/material";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import StarsIcon from "@mui/icons-material/Stars";
import DiamondIcon from "@mui/icons-material/Diamond";
import { useColors } from "../../../context/ColorContext";
import { useApiRequest } from "../../../hooks/useApiRequest";

const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
const levelIcons = {
  A1: <EmojiObjectsIcon fontSize="small" sx={{ mr: 1 }} />,
  A2: <RocketLaunchIcon fontSize="small" sx={{ mr: 1 }} />,
  B1: <AutoStoriesIcon fontSize="small" sx={{ mr: 1 }} />,
  B2: <PsychologyAltIcon fontSize="small" sx={{ mr: 1 }} />,
  C1: <StarsIcon fontSize="small" sx={{ mr: 1 }} />,
  C2: <DiamondIcon fontSize="small" sx={{ mr: 1 }} />,
};

export default function CategorySidebar({ selectedCategories, onSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriesByLevel, setCategoriesByLevel] = useState({});
  const [loadingCount, setLoadingCount] = useState(0);
  const [error, setError] = useState(null);

  const { request } = useApiRequest();
  const { colors } = useColors();

  useEffect(() => {
    let isMounted = true;
    setLoadingCount(levels.length);
    setError(null);
    setCategoriesByLevel({});

    Promise.all(
      levels.map((level) =>
        request({ url: `/words/level/${level}` })
          .then((res) => {
            if (res.success) return { level, data: res.data };
            throw new Error(`Level ${level}: ${res.error}`);
          })
          .catch((err) => {
            if (isMounted) setError(err.message);
            return { level, data: [] };
          })
      )
    ).then((results) => {
      if (!isMounted) return;
      const merged = {};
      results.forEach(({ level, data }) => {
        merged[level] = data;
      });
      setCategoriesByLevel(merged);
      setLoadingCount(0);
    });

    return () => {
      isMounted = false;
    };
  }, [request]);

  const toggleCategory = (cat) => {
    if (selectedCategories.includes(cat)) {
      onSelect(selectedCategories.filter((c) => c !== cat));
    } else {
      onSelect([...selectedCategories, cat]);
    }
  };

  const loading = loadingCount > 0;

  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        fullWidth
        placeholder="Kategori ara..."
        size="small"
        variant="outlined"
        sx={{
          mb: 2,
          backgroundColor: "#fff",
          borderRadius: 2,
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            "& fieldset": { borderColor: colors.neutral },
            "&:hover fieldset": { borderColor: colors.primary },
            "&.Mui-focused fieldset": {
              borderColor: colors.primary,
              boxShadow: `0 0 8px ${colors.primaryLight}`,
            },
          },
        }}
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
      />

      {loading && (
        <Typography variant="body2" sx={{ mb: 2, color: colors.neutralDark }}>
          Kategoriler yükleniyor...
        </Typography>
      )}

      {error && (
        <Typography variant="body2" sx={{ mb: 2, color: "error.main" }}>
          Hata: {error}
        </Typography>
      )}

      {selectedCategories.length > 0 && (
        <Box sx={{ mb: 2, textAlign: "right" }}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => onSelect([])}
            sx={{
              borderRadius: 2,
              color: colors.primary,
              borderColor: colors.primary,
              "&:hover": {
                backgroundColor: colors.primaryLight,
                borderColor: colors.primaryDark,
                color: colors.primaryDark,
              },
              fontSize: "11px",
            }}
          >
            Seçimleri Sıfırla
          </Button>
        </Box>
      )}

      {!loading &&
        !error &&
        Object.entries(categoriesByLevel).map(([level, words]) => {
          if (!words) return null;

          const uniqueCategories = Array.from(
            new Set(words.map((w) => w.category))
          );

          const filtered = uniqueCategories.filter((cat) =>
            cat.toLowerCase().includes(searchTerm)
          );

          if (filtered.length === 0) return null;

          return (
            <Box key={level} sx={{ mb: 3 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: 600,
                  color: "#fff",
                  px: 1.5,
                  py: 0.8,
                  borderRadius: 2,
                  mx: 1,
                  mb: 1,
                  background: `linear-gradient(135deg, ${colors.primaryDark}, ${colors.primary})`,
                }}
              >
                {levelIcons[level]} {level}
              </Typography>

              <List
                dense
                disablePadding
                sx={{
                  maxHeight: 180,
                  overflowY: "auto",
                  px: 1,
                  borderRadius: 2,
                  backgroundColor: "#fefefe",
                  boxShadow: "inset 0 0 6px rgba(0,0,0,0.05)",
                  "&::-webkit-scrollbar": { width: 6 },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: colors.primary,
                    borderRadius: 10,
                  },
                }}
              >
                {filtered.map((cat, i) => (
                  <Slide direction="up" in={true} timeout={300 + i * 40} key={cat}>
                    <ListItemButton
                      selected={selectedCategories.includes(cat)}
                      onClick={() => toggleCategory(cat)}
                      sx={{
                        borderRadius: 2,
                        my: 0.5,
                        px: 2,
                        py: 1,
                        transition: "all 0.3s ease",
                        transform: selectedCategories.includes(cat)
                          ? "scale(1.04)"
                          : "scale(1)",
                        backgroundColor: selectedCategories.includes(cat)
                          ? colors.primaryLight
                          : "transparent",
                        color: selectedCategories.includes(cat)
                          ? colors.primaryDark
                          : colors.neutralDark,
                        fontWeight: selectedCategories.includes(cat) ? 700 : 400,
                        fontSize: "0.95rem",
                        "&:hover": {
                          backgroundColor: colors.neutralLight,
                          transform: "scale(1.03)",
                        },
                      }}
                    >
                      {cat}
                    </ListItemButton>
                  </Slide>
                ))}
              </List>
            </Box>
          );
        })}
    </Box>
  );
}
