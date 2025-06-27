import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Box, Container, useMediaQuery } from "@mui/material";
import { useColors } from "../../../context/ColorContext";
import { useApiRequest } from "../../../hooks/useApiRequest";
import CategorySidebar from "./components/CategorySidebar";
import WordList from "./components/WordList";
import ErrorPage from "../../../components/errorPage/ErrorPage";
import Header from "./components/Header";
import { shuffledArray } from "../../../utils/shuffledArray";

export default function Sozluk() {
  const { colors } = useColors();
  const { error, request } = useApiRequest();
  const isMobile = useMediaQuery("(max-width:768px)");

  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [words, setWords] = useState([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  /**
   * Words listesini API'den çeker
   * @param {boolean} shuffle kelimeleri karıştırıp karıştırmayacağı
   */
  const fetchWords = useCallback(
    async (shuffle = true) => {
      const params = selectedCategories.length
        ? { categories: selectedCategories }
        : null;

      const result = await request({
        url: selectedCategories.length ? "/words/by-categories" : "/words",
        params,
      });

      if (result.success) {
        const data = shuffle ? shuffledArray(result.data) : result.data;
        setWords(data);
      } else {
        setWords([]);
      }
    },
    [request, selectedCategories]
  );

  useEffect(() => {
    fetchWords(true);
  }, [fetchWords]);

  useEffect(() => {
    fetchWords(false);
  }, [showOnlyFavorites, fetchWords]);

  const filteredWords = useMemo(() => {
    let list = words;
    if (showOnlyFavorites) {
      list = list.filter((w) => w.favori);
    }
    return list.filter((w) =>
      w.word.toLowerCase().includes(search.toLowerCase())
    );
  }, [words, search, showOnlyFavorites]);

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
            setWords={setWords}
            showOnlyFavorites={showOnlyFavorites}
            setShowOnlyFavorites={setShowOnlyFavorites}
            onRefresh={() => fetchWords(false)}
          />
        </Box>
      </Container>
    </Box>
  );
}
