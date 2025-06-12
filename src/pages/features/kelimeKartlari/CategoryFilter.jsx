import React from "react";
import { Box, Chip } from "@mui/material";

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <Box sx={{ mb: 3, display: "flex", gap: 1, justifyContent: "center", flexWrap: "wrap" }}>
      {categories.map((cat) => (
        <Chip
          key={cat}
          label={cat}
          color={selectedCategory === cat ? "secondary" : "default"}
          onClick={() => onSelectCategory(cat)}
          clickable
        />
      ))}
    </Box>
  );
}
