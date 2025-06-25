import React from "react";
import { Grid, Pagination, Box } from "@mui/material";
import WordCard from "./WordCard";
import FavoritesButton from "./FavoritesButton";
import { useColors } from "../../../context/ColorContext";

export default function WordList({
  words,
  page,
  onPageChange,
  favorites,
  toggleFavorite,
  onWordClick,
}) {
  const { colors } = useColors();

  const PAGE_SIZE = 6;
  const paginatedWords = words.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <Box sx={{ flex: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 2,
        }}
      >
        <FavoritesButton
          onClick={() => alert("Favorileriniz gösterilecek.")}
          favoritesCount={favorites.length}
        />
      </Box>

      <Grid container spacing={3}>
        {paginatedWords.map((word) => (
          <Grid item xs={12} sm={12} md={12} key={word.id}>
            <WordCard
              word={word}
              isFavorite={favorites.includes(word.id)}
              onToggleFavorite={toggleFavorite}
              onClick={() => onWordClick(word)}
            />
          </Grid>
        ))}
      </Grid>

      <Box
        display="flex"
        justifyContent="flex-end"
        mt={4}
        sx={{ userSelect: "none" }}
      >
        <Pagination
          count={Math.ceil(words.length / PAGE_SIZE)}
          page={page}
          onChange={(e, val) => onPageChange(val)}
          color="primary"
          shape="rounded"
          sx={{
            "& .MuiPaginationItem-root": {
              color: colors.primaryDark,
              fontWeight: 600,
            },
            "& .MuiPaginationItem-page.Mui-selected": {
              backgroundColor: colors.primaryLight,
              color: colors.primaryDark,
              fontWeight: "bold",
              boxShadow: `0 2px 8px ${colors.accent}80`,
            },
          }}
        />
      </Box>
    </Box>
  );
}
