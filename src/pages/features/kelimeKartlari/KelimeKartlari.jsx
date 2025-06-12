import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import CategoryFilter from "./CategoryFilter";
import WordCard from "./WordCard";
import WordModal from "./WordModal";

const words = [
  {
    id: 1,
    word: "Hello",
    category: "Günlük",
    meaning: "Merhaba",
    examples: ["Hello! How are you?", "She said hello and smiled."],
    audio:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/hello--_gb_1.mp3",
    similar: ["Hi", "Hey", "Greetings"],
  },
  {
    id: 2,
    word: "Business",
    category: "İş",
    meaning: "İş, ticaret",
    examples: ["He runs his own business.", "Business meetings are important."],
    audio:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/business--_gb_1.mp3",
    similar: ["Company", "Trade", "Commerce"],
  },
  // Daha fazla kelime eklenebilir
];

const categories = ["Tümü", "Günlük", "İş", "Seyahat", "Eğitim"];

export default function KelimeKartlari() {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const filteredWords =
    selectedCategory === "Tümü"
      ? words
      : words.filter((w) => w.category === selectedCategory);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const openModal = (word) => {
    setSelectedWord(word);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedWord(null);
    setModalOpen(false);
  };

  return (
    <Box sx={{ mx: "auto", p: { xs: 2, md: 4 } }}>
      <Typography
        variant="h4"
        sx={{ mb: 3, fontWeight: 700, color: "#8e24aa", textAlign: "center" }}
      >
        Kelime Öğrenimi
      </Typography>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {filteredWords.map((word) => (
          <Grid item xs={12} sm={6} md={4} key={word.id}>
            <WordCard
              word={word}
              isFavorite={favorites.includes(word.id)}
              onToggleFavorite={toggleFavorite}
              onClick={() => openModal(word)}
            />
          </Grid>
        ))}
      </Grid>

      <WordModal open={modalOpen} onClose={closeModal} word={selectedWord} />
    </Box>
  );
}
