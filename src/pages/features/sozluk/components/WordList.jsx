import React, { useMemo, useState } from "react";
import { Typography, Box, Grid, Pagination, Button } from "@mui/material";
import { useColors } from "../../../../context/ColorContext";
import WordCard from "./wordCard/WordCard";
import WordModal from "./WordModal";

export default function WordList({
  words,
  setWords,
  showOnlyFavorites,
  setShowOnlyFavorites,
}) {
  const { colors } = useColors();

  const [selectedWord, setSelectedWord] = useState(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 4;
  const paginatedWords = words.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleFavorite = (wordId) => {
    setWords((prev) =>
      prev.map((w) => (w.id === wordId ? { ...w, favorite: !w.favorite } : w))
    );
  };

  const totalFavorites = useMemo(
    () => words.filter((w) => w.favorite).length,
    [words]
  );

  const openWordModal = (word) => {
    setSelectedWord(word);
    setOpen(true);
  };

  const closeWordModal = () => {
    setSelectedWord(null);
    setOpen(false);
  };

  return (
    <Box sx={{ flex: 1 }}>
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
          color={showOnlyFavorites ? "primary" : "secondary"}
          onClick={() => {
            setShowOnlyFavorites((prev) => !prev);
            setPage(1);
          }}
          sx={{
            fontWeight: 700,
            textTransform: "none",
            boxShadow: `0 3px 12px ${colors.accent}77`,
            "&:hover": {
              boxShadow: `0 5px 20px ${colors.accent}aa`,
            },
          }}
        >
          {showOnlyFavorites
            ? "T\u00fcm\u00fcn\u00fc G\u00f6ster"
            : `Favoriler (${totalFavorites})`}
        </Button>
      </Box>

      <Grid container spacing={3}>
        {paginatedWords.map((word) => (
          <Grid item xs={12} sm={12} key={word.id}>
            <WordCard
              word={word}
              isFavorite={word.favorite}
              onToggleFavorite={() => toggleFavorite(word.id)}
              onClick={() => openWordModal(word)}
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
          onChange={(e, val) => setPage(val)}
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

      {/* Kelime Modal */}
      {open && (
        <WordModal word={selectedWord} onClose={closeWordModal} open={open} />
      )}
    </Box>
  );
}
