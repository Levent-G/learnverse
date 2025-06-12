import React from "react";
import { Chip, Box } from "@mui/material";

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => (
  <Box
    sx={{
      mb: 3,
      display: "flex",
      gap: 1,
      justifyContent: "center",
      flexWrap: "wrap",
    }}
  >
    {categories.map((cat) => (
      <Chip
        key={cat}
        label={cat}
        color={selectedCategory === cat ? "secondary" : "default"}
        onClick={() => onSelectCategory(cat)}
        clickable
        sx={{
          fontWeight: selectedCategory === cat ? "bold" : "normal",
          cursor: "pointer",
        }}
      />
    ))}
  </Box>
);

export default CategoryFilter;
