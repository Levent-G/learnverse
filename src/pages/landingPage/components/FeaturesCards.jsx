import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useFetchData } from "../../../hooks/useFetchData";
import { iconListFeaturesCards } from "../shared/landingEnums";

const FeaturesCards = ({ darkMode }) => {
  const [data, error] = useFetchData("featurescards");

  const [cards, setCards] = useState([]);

  //db den cards tutulma şekli düzeltilcek
  useEffect(() => {
    const fetchCards = async () => {
      try {
        if (!data) return;
        // card1, card2, ... her biri array içinde tek obje
        const cardsObj = Object.keys(data)
          .filter((key) => key.startsWith("card"))
          .sort(
            (a, b) =>
              parseInt(a.replace("card", "")) - parseInt(b.replace("card", ""))
          )
          .map((key, index) => {
            const cardData =
              Array.isArray(data[key]) && data[key][0] ? data[key][0] : {};

            return {
              id: key,
              icon: iconListFeaturesCards[index % iconListFeaturesCards.length],
              title: cardData.title ?? "Başlık yok",
              value: cardData.desc ?? "Açıklama yok",
              bgLightColor: cardData.bgLightColor ?? "#fff",
              textLightColor: cardData.textLightColor ?? "#000",
              bgDarkColor: cardData.bgDarkColor ?? "#000",
              textDarkColor: cardData.textDarkColor ?? "#fff",
            };
          });

        setCards(cardsObj);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };

    fetchCards();
  }, [data]);

  return !error ? (
    <Box
      id="features-cards"
      sx={{
        maxWidth: "1280px",
        mx: "auto",
        px: 2,
        py: 6,
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        },
        gap: 4,
      }}
    >
      {cards.map((card) => (
        <Box
          key={card.id}
          sx={{
            p: 3,
            borderRadius: 3,
            boxShadow: 3,
            textAlign: "center",
            transition: "0.3s ease",
            backgroundColor: darkMode ? card.bgDarkColor : card.bgLightColor,
            color: darkMode ? card.textDarkColor : card.textLightColor,
            "&:hover": {
              boxShadow: 6,
              transform: "translateY(-2px)",
            },
          }}
        >
          <Box sx={{ mb: 2 }}>{card.icon}</Box>

          <Typography variant="h6" fontWeight={800} gutterBottom>
            {card.title}
          </Typography>

          <Typography variant="body2" sx={{ opacity: 0.9, fontSize: "1rem" }}>
            {card.value.length > 70
              ? `${card.value.slice(0, 70)}...`
              : card.value}
          </Typography>
        </Box>
      ))}
    </Box>
  ) : (
    <Typography
      fontSize="1.5rem"
      sx={{ fontWeight: 800, color: "red", textAlign: "center" }}
    >
      Sayfa Yüklenirken Hata Oluştu
    </Typography>
  );
};

export default FeaturesCards;
