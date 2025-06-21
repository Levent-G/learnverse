import React from "react";
import { Box, Chip } from "@mui/material";
import { useColors } from "../../../../context/ColorContext";

const CategoryCardList = ({ categories, selectedCategory, onSelect }) => {
  const { colors } = useColors();

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 1.5,
        justifyContent: "center",
        mb: 3,
      }}
    >
      {categories.map((cat) => {
        const isSelected = cat === selectedCategory;
        return (
          <Chip
            key={cat}
            label={cat}
            clickable
            color={isSelected ? "primary" : "default"}
            variant={isSelected ? "filled" : "outlined"}
            onClick={() => onSelect(cat)}
            sx={{
              fontWeight: 600,
              fontSize: "0.9rem",
              paddingX: 2,
              paddingY: 1,
              borderRadius: 3,
              cursor: "pointer",
              transition: "all 0.3s ease",
              userSelect: "none",
              "&:hover": {
                backgroundColor: isSelected ? colors.primaryDark : colors.primaryLight,
                color: isSelected ? "#fff" : colors.primaryDark,
                borderColor: colors.primaryDark,
              },
            }}
          />
        );
      })}
    </Box>
  );
};

export default CategoryCardList;
