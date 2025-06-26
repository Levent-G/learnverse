import { Card, Box } from "@mui/material";
import { colors, hexToRgba } from "./shared/wordCardEnums";
import Word from "./Word";
import FavoriButton from "./FavoriButton";
import Meaning from "./Meaning";
import Level from "./Level";
import BilgiMesaji from "./BilgiMesaji";
import Ipucu from "./Ipucu";
import Etiketler from "./Etiketler";
import Example from "./Example";
import Dinle from "./Dinle";

const WordCard = ({ word, isFavorite, onToggleFavorite, onClick }) => {
  const updatedWord = {
    ...word,
    info:
      word.info ||
      "Bu kelime genellikle akademik ya da resmi yazışmalarda kullanılır.",
    hint: word.hint || "Benzer kelimeleri düşün: achieve, complete.",
    example: word.example || `Example usage of "${word.word}" in a sentence.`,
    tags: word.tags || ["örnek", "kelime", "deneme"],
  };

  return (
    <Card
      onClick={onClick}
      sx={{
        borderRadius: 4,
        backgroundColor: "#ffffff",
        border: `1px solid ${hexToRgba(colors.neutralDark, 0.1)}`,
        boxShadow: `0 6px 14px ${hexToRgba(colors.primaryDark, 0.08)}`,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: `0 14px 28px ${hexToRgba(colors.primaryDark, 0.15)}`,
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 3,
        minHeight: 240,
      }}
    >
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <Word updatedWord={updatedWord} />

        <FavoriButton
          onToggleFavorite={onToggleFavorite}
          word={word}
          isFavorite={isFavorite}
        />
      </Box>

      {/* Anlam Alanı */}
      <Meaning updatedWord={updatedWord} />

      {/* Seviye Alanı - Yeni Tasarım */}
      <Level updatedWord={updatedWord} />

      {/* Bilgi Mesajı */}
      <BilgiMesaji updatedWord={updatedWord} />

      {/* İpucu */}
      <Ipucu updatedWord={updatedWord} />

      {/* Etiketler */}
      <Etiketler updatedWord={updatedWord} />

      {/* Örnek ve Sesli Okuma */}
      <Example updatedWord={updatedWord} />
      <Dinle onClick={onClick} />
    </Card>
  );
};

export default WordCard;
