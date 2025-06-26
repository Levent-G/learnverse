import React from "react";
import {
  Typography,
  Box,
  Grid,
  Pagination,
  Button,
} from "@mui/material";
import WordCard from "./WordCard";
import { useColors } from "../../../../context/ColorContext";

export default function WordList({
  words,
  page,
  onPageChange,
  favorites,
  toggleFavorite,
  onWordClick,
}) {
  const { colors } = useColors();

  const PAGE_SIZE = 5;
  const paginatedWords = words.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <Box sx={{ flex: 1 }}>
      {/* Favoriler ve filtre */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, color: colors.primaryDark }}
        >
          Toplam Kelime: {words.length}
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => alert("Favorileriniz gösterilecek.")}
          sx={{
            fontWeight: 700,
            textTransform: "none",
            boxShadow: `0 3px 12px ${colors.accent}77`,
            "&:hover": {
              boxShadow: `0 5px 20px ${colors.accent}aa`,
            },
          }}
        >
          Favoriler ({favorites.length})
        </Button>
      </Box>

      <Grid container spacing={3}>
        {paginatedWords.map((word) => (
          <Grid item xs={12} sm={12} key={word.id}>
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
