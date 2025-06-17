import React from "react";
import { Chip, Box } from "@mui/material";
import { useColors } from "../../../context/ColorContext";

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  const { colors } = useColors();

  return (
    <Box
      sx={{
        mb: 3,
        display: "flex",
        gap: 1,
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat;
        return (
          <Chip
            key={cat}
            label={cat}
            clickable
            onClick={() => onSelectCategory(cat)}
            sx={{
              backgroundColor: isSelected ? colors.secondary : "default",
              color: isSelected ? colors.neutralLight : colors.neutralDark,
              fontWeight: isSelected ? "700" : "400",
              "&:hover": {
                backgroundColor: isSelected ? colors.secondaryDark : colors.neutral,
              },
            }}
          />
        );
      })}
    </Box>
  );
};

export default CategoryFilter;
