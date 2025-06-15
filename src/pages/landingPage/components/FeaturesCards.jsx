import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { doc, getDoc} from "firebase/firestore";
import {
  LibraryBooks,
  Timeline,
  SmartToy,
  School,
  CheckCircle,
  Star,
} from "@mui/icons-material";
import { db } from "../../../firebase/config";

const iconList = [
  <LibraryBooks fontSize="large" key="icon1" />,
  <Timeline fontSize="large" key="icon2" />,
  <SmartToy fontSize="large" key="icon3" />,
  <School fontSize="large" key="icon4" />,
  <CheckCircle fontSize="large" key="icon5" />,
  <Star fontSize="large" key="icon6" />,
];

const FeaturesCards = ({ darkMode }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const docRef = doc(db, "pages", "learnverse", "fields", "featurescards");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          // card1, card2, ... her biri array içinde tek obje
          const cardsObj = Object.entries(data)
            .filter(([key]) => key.startsWith("card"))
            .sort(([a], [b]) => {
              const aNum = parseInt(a.replace("card", ""));
              const bNum = parseInt(b.replace("card", ""));
              return aNum - bNum;
            })
            .map(([key, cardArray], index) => {
              const cardData = Array.isArray(cardArray) && cardArray.length > 0 ? cardArray[0] : {};

              return {
                id: key,
                icon: iconList[index % iconList.length],
                title: cardData.title || "Başlık yok",
                value: cardData.desc || "Açıklama yok", // desc olarak güncelledik
                bgLightColor: cardData.bgLightColor || "#fff",
                textLightColor: cardData.textLightColor || "#000",
                bgDarkColor: cardData.bgDarkColor || "#000",
                textDarkColor: cardData.textDarkColor || "#fff",
              };
            });

          setCards(cardsObj);
        } else {
          console.warn("featurescards belgesi bulunamadı.");
        }
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };

    fetchCards();
  }, []);

  return (
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

          <Typography
            variant="body2"
            sx={{ opacity: 0.9, fontSize: "1rem" }}
          >
            {card.value.length > 70 ? `${card.value.slice(0, 70)}...` : card.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default FeaturesCards;
