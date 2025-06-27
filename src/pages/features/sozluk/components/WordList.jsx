import React, { useMemo, useState } from "react";
import { Typography, Box, Grid, Pagination, Button } from "@mui/material";
import { useColors } from "../../../../context/ColorContext";
import WordCard from "./wordCard/WordCard";
import WordModal from "./WordModal";
import { motion, AnimatePresence } from "framer-motion";
import { useApiRequest } from "../../../../hooks/useApiRequest";
import { notify } from "../../../../utils/notify";

export default function WordList({
  words,
  setWords,
  showOnlyFavorites,
  setShowOnlyFavorites,
}) {
  const { colors } = useColors();
  const { request } = useApiRequest();

  const [selectedWord, setSelectedWord] = useState(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 4;
  const paginatedWords = words.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleFavorite = async (wordId) => {
    try {
      const result = await request({
        url: `/words/favori/${wordId}`,
        method: "POST",
      });

      if (result.success) {
        setWords((prev) =>
          prev.map((w) =>
            w.id === wordId ? { ...w, favori: !w.favori } : w
          )
        );
      } else {
        notify(result.error, "error");
      }
    } catch (err) {
      notify(err.message, "error");
    }
  };

  const totalFavorites = useMemo(
    () => words.filter((w) => w.favori).length,
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
            ? "Tümünü Göster"
            : `Favoriler (${totalFavorites})`}
        </Button>
      </Box>

      <Grid container spacing={3}>
        <AnimatePresence mode="wait">
          {paginatedWords.map((word) => (
            <Grid item xs={12} sm={12} key={word.id}>
              <motion.div
                key={word.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <WordCard
                  word={word}
                  isFavorite={word.favori}
                  onToggleFavorite={() => toggleFavorite(word.id)}
                  onClick={() => openWordModal(word)}
                />
              </motion.div>
            </Grid>
          ))}
        </AnimatePresence>
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

      {open && (
        <WordModal word={selectedWord} onClose={closeWordModal} open={open} />
      )}
    </Box>
  );
}
