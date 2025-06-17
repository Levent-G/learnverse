import React, { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import CategoryFilter from "./CategoryFilter";
import { categories, phraseData } from "./shared/kalipCumlelerEnums";
import PhraseCard from "./PhraseCard";
import PhraseModal from "./PhraseModal";
import AddPhraseForm from "./AddPhraseForm";
import { useColors } from "../../../context/ColorContext"; // renk hook'u import

export default function KalipCumleler() {
  const { colors } = useColors(); // renk paletini alıyoruz

  const [newPhraseText, setNewPhraseText] = useState("");
  const [newPhraseCategory, setNewPhraseCategory] = useState("Genel");
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPhrase, setSelectedPhrase] = useState(null);
  const [userPhrases, setUserPhrases] = useState([]);

  // Kayıt durumu
  const [recording, setRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);

  // Quiz durumu
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [quizResult, setQuizResult] = useState(null);

  const openModal = (phrase) => {
    setSelectedPhrase(phrase);
    setModalOpen(true);
    setQuizAnswers(new Array(phrase?.missingWordsQuiz?.length || 0).fill(""));
    setQuizResult(null);
    setRecordedAudio(null);
  };

  const closeModal = () => {
    setSelectedPhrase(null);
    setModalOpen(false);
  };

  const addUserPhrase = () => {
    if (!newPhraseText.trim()) return alert("Lütfen cümleyi giriniz.");
    const newPhrase = {
      id: Date.now().toString(),
      text: newPhraseText.trim(),
      category: newPhraseCategory,
    };
    setUserPhrases((prev) => [...prev, newPhrase]);
    setNewPhraseText("");
    setNewPhraseCategory("Genel");
  };

  // Kayıt simülasyonu
  const onStartRecord = () => {
    setRecording(true);
    setTimeout(() => {
      setRecording(false);
      setRecordedAudio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
    }, 3000);
  };

  const onStopRecord = () => {
    setRecording(false);
  };

  // Quiz işlemleri
  const onQuizChange = (idx, value) => {
    const updated = [...quizAnswers];
    updated[idx] = value;
    setQuizAnswers(updated);
  };

  const onQuizCheck = () => {
    if (!selectedPhrase?.missingWordsQuiz) return;

    const correct = selectedPhrase.missingWordsQuiz;
    const allCorrect = correct.every(
      (word, idx) => word.toLowerCase() === (quizAnswers[idx] || "").toLowerCase().trim()
    );

    setQuizResult(allCorrect ? "Tebrikler! Tüm kelimeler doğru." : "Bazı cevaplar yanlış. Tekrar deneyin.");
  };

  return (
    <Box sx={{ mx: "auto", p: 3, maxWidth: 1200 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: 700,
          color: colors.primaryDark, // sabit renk yerine palet
          textAlign: "center",
          userSelect: "none",
          letterSpacing: 1.2,
        }}
      >
        Kalıp Cümleler
      </Typography>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <Grid container spacing={3}>
        {[...phraseData, ...userPhrases]
          .filter((p) => selectedCategory === "Tümü" || p.category === selectedCategory)
          .map((phrase) => (
            <Grid item xs={12} sm={6} md={4} key={phrase.id}>
              <PhraseCard phrase={phrase} onClick={() => openModal(phrase)} />
            </Grid>
          ))}
      </Grid>

      <PhraseModal
        open={modalOpen}
        onClose={closeModal}
        phrase={selectedPhrase}
        recording={recording}
        onStartRecord={onStartRecord}
        onStopRecord={onStopRecord}
        recordedAudio={recordedAudio}
        quizAnswers={quizAnswers}
        onQuizChange={onQuizChange}
        onQuizCheck={onQuizCheck}
        quizResult={quizResult}
      />

      <AddPhraseForm
        newPhraseText={newPhraseText}
        setNewPhraseText={setNewPhraseText}
        newPhraseCategory={newPhraseCategory}
        setNewPhraseCategory={setNewPhraseCategory}
        categories={categories}
        onAdd={addUserPhrase}
      />
    </Box>
  );
}
