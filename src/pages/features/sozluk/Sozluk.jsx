import React, { useState, useEffect, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import CategorySidebar from "./CategorySidebar";
import WordList from "./WordList";
import SearchBar from "./SearchBar";
import WordModal from "./WordModal";
import { useColors } from "../../../context/ColorContext";
import { useApiRequest } from "../../../hooks/useApiRequest";

export default function Sozluk() {
  const { colors } = useColors();
  const { data, error, loading, request } = useApiRequest();

  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const favs = localStorage.getItem("sozlukFavorites");
    return favs ? JSON.parse(favs) : [];
  });
  const [selectedWord, setSelectedWord] = useState(null);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);

  // Kategori değişince sayfa sıfırlanır ve veriler çekilir
  useEffect(() => {
    setPage(1);
    if (selectedCategories.length === 0) {
      request({ url: "/words" });
    } else {
      const params = selectedCategories
        .map((cat) => `categories=${encodeURIComponent(cat)}`)
        .join("&");

      request({ url: `/words/by-categories?${params}` });
    }
  }, [selectedCategories, request]);

  // Arama filtresi
  const words = useMemo(() => {
    if (!data) return [];
    return data.filter((w) =>
      w.word.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  // Favorilere ekleme/çıkarma
  function toggleFavorite(wordId) {
    setFavorites((prevFavorites) => {
      const newFavs = prevFavorites.includes(wordId)
        ? prevFavorites.filter((id) => id !== wordId)
        : [...prevFavorites, wordId];
      localStorage.setItem("sozlukFavorites", JSON.stringify(newFavs));
      return newFavs;
    });
  }

  // Kelime seçildiğinde modal açılır
  const handleWordClick = (word) => {
    setSelectedWord(word);
    setOpen(true);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: colors.background || "#f9fbfc",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          py: 6,
          px: 3,
          background: `linear-gradient(135deg, ${colors.primaryLight}, ${colors.primary})`,
          color: "#fff",
          textAlign: "center",
          boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
          userSelect: "none",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            letterSpacing: 2,
            fontFamily: "'Montserrat', sans-serif",
            textShadow: "0 1px 4px rgba(0,0,0,0.3)",
            mb: 1,
          }}
        >
          Learnverse Sözlük
        </Typography>
        <Typography
          variant="span"
          sx={{ opacity: 0.85, fontWeight: 500, fontStyle: "italic" }}
        >
          🚀 İngilizce kelimeleri keşfetmenin en şık yolu!
        </Typography>

        <Box sx={{ mt: 4, maxWidth: 600, mx: "auto" }}>
          <SearchBar value={search} onChange={setSearch} />
        </Box>
      </Box>

      {/* BODY */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          px: { xs: 2, md: 4 },
          py: 4,
          backgroundColor: "#fff",
          flexGrow: 1,
          overflow: "hidden",
        }}
      >
        {/* CATEGORY SIDEBAR */}
        <Box
          sx={{
            flexShrink: 0,
            width: { xs: "100%", md: 360 },
            height: { xs: "auto", md: "calc(100vh - 210px)" },
            overflowY: "auto",
            borderRadius: 3,
            boxShadow: "0 0 15px rgba(0,0,0,0.07)",
            px: 1,
            py: 3,
            bgcolor: "#fefefe",
          }}
        >
          <CategorySidebar
            selectedCategories={selectedCategories}
            onSelect={setSelectedCategories}
          />
        </Box>

        {/* WORD LIST */}
        <Box
          sx={{
            flexGrow: 1,
            height: { xs: "auto", md: "calc(100vh - 210px)" },
            overflowY: "auto",
            borderRadius: 3,
            boxShadow: "0 0 20px rgba(0,0,0,0.05)",
            p: 3,
            bgcolor: "#fafafa",
          }}
        >
          {loading && (
            <Typography
              variant="h6"
              sx={{ textAlign: "center", color: colors.primaryDark }}
            >
              Yükleniyor...
            </Typography>
          )}
          {error && (
            <Typography
              variant="h6"
              color="error"
              sx={{ textAlign: "center", fontWeight: "bold" }}
            >
              Hata: {error}
            </Typography>
          )}
          {!loading && !error && (
            <WordList
              words={words}
              page={page}
              onPageChange={setPage}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              onWordClick={handleWordClick}
            />
          )}
        </Box>
      </Box>

      {/* WORD DETAIL MODAL */}
      {open && (
        <WordModal
          word={selectedWord}
          onClose={() => {
            setSelectedWord(null);
            setOpen(false);
          }}
          open={open}
        />
      )}
    </Box>
  );
}
