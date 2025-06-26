import React, { useState, useEffect, useMemo } from "react";
import { Box, Container, useMediaQuery } from "@mui/material";
import { useColors } from "../../../context/ColorContext";
import { useApiRequest } from "../../../hooks/useApiRequest";
import CategorySidebar from "./components/CategorySidebar";
import WordList from "./components/WordList";
import WordModal from "./components/WordModal";
import ErrorPage from "../../../components/errorPage/ErrorPage";
import Header from "./components/Header";

export default function Sozluk() {
  const { colors } = useColors();
  const { error, request } = useApiRequest();
  const isMobile = useMediaQuery("(max-width:768px)");

  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [words, setWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  useEffect(() => {
    async function fetchWords() {
      const params = selectedCategories.length
        ? { categories: selectedCategories }
        : null;

      const result = await request({
        url: selectedCategories.length ? "/words/by-categories" : "/words",
        params,
      });

      if (result.success) {
        const shuffled = [...result.data];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        setWords(shuffled);
      } else {
        setWords([]);
      }
    }
    fetchWords();
  }, [selectedCategories, request]);

  const filteredWords = useMemo(() => {
    let list = words;
    if (showOnlyFavorites) {
      list = list.filter((w) => w.favorite);
    }
    return list.filter((w) =>
      w.word.toLowerCase().includes(search.toLowerCase())
    );
  }, [words, search, showOnlyFavorites]);

  const toggleFavorite = (wordId) => {
    setWords((prev) =>
      prev.map((w) =>
        w.id === wordId ? { ...w, favorite: !w.favorite } : w
      )
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

  if (error) {
    return (
      <ErrorPage title="Veri Yüklenirken Hata Oluştu" description={error} />
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: colors.neutralLight }}>
      <Header search={search} setSearch={setSearch} />

      <Container
        maxWidth="xl"
        sx={{
          py: 4,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        <Box
          sx={{
            width: isMobile ? "100%" : 320,
            background: "#fff",
            borderRadius: 3,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            p: 2,
          }}
        >
          <CategorySidebar
            selectedCategories={selectedCategories}
            onSelect={setSelectedCategories}
          />
        </Box>

        <Box
          sx={{
            flex: 1,
            background: "#fff",
            borderRadius: 3,
            p: 3,
            boxShadow: "0 6px 15px rgba(0,0,0,0.04)",
            overflowY: "auto",
          }}
        >
          <WordList
            words={filteredWords}
            page={page}
            onPageChange={setPage}
            toggleFavorite={toggleFavorite}
            onWordClick={openWordModal}
            totalFavorites={totalFavorites}
            showOnlyFavorites={showOnlyFavorites}
            setShowOnlyFavorites={setShowOnlyFavorites}
            setPage={setPage}
          />
        </Box>
      </Container>

      {open && (
        <WordModal word={selectedWord} onClose={closeWordModal} open={open} />
      )}
    </Box>
  );
}
