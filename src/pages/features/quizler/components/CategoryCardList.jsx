import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Chip,
  TextField,
  Typography,
  InputAdornment,
  Grid,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useColors } from "../../../../context/ColorContext";
import { useApiRequest } from "../../../../hooks/useApiRequest";

const CategoryCardList = ({
  selectedLevel,
  selectedCategories = [],
  onSelect,
  setValue,
}) => {
  const { colors } = useColors();
  const { request } = useApiRequest();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);

  const toggleCategory = (cat) => {
    const isSelected = selectedCategories.includes(cat);
    const newList = isSelected
      ? selectedCategories.filter((c) => c !== cat)
      : [...selectedCategories, cat];
    onSelect(newList);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      if (!selectedLevel) {
        setCategoryOptions([]);
        setValue("category", []);
        return;
      }

      try {
        const result = await request({
          url: `/words/level/${selectedLevel}`,
          method: "GET",
        });

        if (result.success && Array.isArray(result.data)) {
          const uniqueCategories = Array.from(
            new Set(result.data.map((word) => word.category))
          ).sort((a, b) => a.localeCompare(b)); // Alfabetik sıralama
          setCategoryOptions(uniqueCategories);
        } else {
          setCategoryOptions([]);
          setValue("category", []);
        }
      } catch (error) {
        setCategoryOptions([]);
        setValue("category", []);
      }
    };

    fetchCategories();
  }, [selectedLevel, setValue, request]);

  // Arama terimine göre filtrelenmiş kategori listesi
  const filteredCategories = useMemo(() => {
    if (!searchTerm) return categoryOptions;
    return categoryOptions.filter((cat) =>
      cat.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categoryOptions, searchTerm]);

  return (
    <Box
      sx={{
        mb: 5,
      }}
    >
      {/* Arama */}
      <TextField
        fullWidth
        size="small"
        placeholder="Kategori ara..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="primary" />
            </InputAdornment>
          ),
        }}
        sx={{
          mb: 2,
          borderRadius: 2,
          backgroundColor: "#fff",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          input: {
            fontSize: "0.9rem",
            fontWeight: 500,
          },
        }}
      />

      {/* Seçili Kategoriler */}
      {selectedCategories.length > 0 && (
        <Box
          sx={{
            mb: 2,
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            p: 1.2,
            background: "#eef2f7",
            borderRadius: 2,
          }}
        >
          {selectedCategories.map((cat) => (
            <Chip
              key={cat}
              label={`${cat}`}
              onClick={() => toggleCategory(cat)}
              clickable
              size="small"
              icon={<CheckCircleIcon sx={{ color: "#fff" }} />}
              sx={{
                backgroundColor: colors.primary,
                color: "#fff",
                fontSize: "0.75rem",
                fontWeight: 500,
                "&:hover": { backgroundColor: colors.primaryDark },
              }}
            />
          ))}
        </Box>
      )}

      {/* Liste */}
      <Box
        sx={{
          maxHeight: showAll ? 400 : 300,
          overflowY: "auto",
          pr: 0.5,
          "&::-webkit-scrollbar": {
            width: 6,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ccc",
            borderRadius: 3,
          },
        }}
      >
        <Grid container spacing={1.5}>
          {filteredCategories.map((cat) => {
            const isSelected = selectedCategories.includes(cat);
            return (
              <Grid item xs={12} sm={6} md={6} lg={6} key={cat}>
                <Box
                  onClick={() => toggleCategory(cat)}
                  sx={{
                    cursor: "pointer",
                    borderRadius: 2,
                    py: 1.2,
                    px: 2,
                    background: isSelected ? colors.primary : "#f6f7f9",
                    color: isSelected ? "#fff" : "#333",
                    fontWeight: 500,
                    fontSize: "0.9rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: `1px solid ${isSelected ? colors.primary : "#ddd"}`,
                    transition: "all 0.25s ease",
                    "&:hover": {
                      background: isSelected ? colors.primaryDark : "#e8ebf0",
                    },
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                  }}
                >
                  <Box display="flex" gap={1} alignItems="center">
                    <span>🔹 {cat}</span>
                  </Box>
                  {isSelected && <CheckCircleIcon sx={{ fontSize: 16 }} />}
                </Box>
              </Grid>
            );
          })}
        </Grid>

        {/* Boş sonuç */}
        {filteredCategories.length === 0 && (
          <Typography
            variant="body2"
            sx={{ mt: 3, textAlign: "center", color: "#999" }}
          >
            Uygun kategori bulunamadı.
          </Typography>
        )}
      </Box>

      {/* Daha Fazla Göster/Gizle */}
      {filteredCategories.length > 12 && (
        <Box mt={2} textAlign="center">
          <Button
            variant="text"
            onClick={() => setShowAll((prev) => !prev)}
            sx={{
              fontSize: "0.85rem",
              textTransform: "none",
              color: colors.primary,
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            {showAll ? "Daha Az Göster" : "Daha Fazla Göster"}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CategoryCardList;
