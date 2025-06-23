import React, { useState, useMemo } from "react";
import { Box, Chip, TextField } from "@mui/material";
import { useColors } from "../../../../context/ColorContext";

const CategoryCardList = ({
  selectedLevel,
  categories,
  selectedCategories = [],
  onSelect,
}) => {
  const { colors } = useColors();
  const [searchTerm, setSearchTerm] = useState("");

  const toggleCategory = (cat) => {
    const isSelected = selectedCategories.includes(cat);
    const newList = isSelected
      ? selectedCategories.filter((c) => c !== cat)
      : [...selectedCategories, cat];
    onSelect(newList);
  };

  const filteredCategories = useMemo(() => {
    return categories.filter((cat) =>
      cat.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, categories]);

  return (
    <Box>
      {/* Seçilen Kategoriler */}
      {selectedCategories.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            mb: 2,
          }}
        >
          {selectedCategories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              onClick={() => toggleCategory(cat)}
              clickable
              sx={{
                fontSize: "0.8rem",
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
                fontWeight: 500,
                bgcolor: colors.primary,
                color: "#fff",
              }}
            />
          ))}
        </Box>
      )}

      {/* Arama Inputu */}
      {selectedLevel && (
        <TextField
          fullWidth
          size="small"
          placeholder="Kategori ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
        />
      )}

      {/* Kategori Seçimi */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          justifyContent: "flex-start",
        }}
      >
        {filteredCategories.map((cat) => {
          const isSelected = selectedCategories.includes(cat);
          return (
            <Chip
              key={cat}
              label={cat}
              onClick={() => toggleCategory(cat)}
              clickable
              sx={{
                fontSize: "0.85rem",
                px: 2,
                py: 1,
                borderRadius: 2,
                fontWeight: 500,
                bgcolor: isSelected ? colors.primary : "#e0e0e0",
                color: isSelected ? "#fff" : "#333",
                border: isSelected ? "none" : `1px solid #ccc`,
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: isSelected ? colors.primaryDark : "#d5d5d5",
                },
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default CategoryCardList;
