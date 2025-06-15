import React, { useEffect, useState } from "react";
import { Box, List, ListItem, Paper, Typography } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";

const GeneralAnalyses = ({ darkMode }) => {
  const [title, setTitle] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const docRef = doc(db, "pages", "learnverse", "fields", "generalanalyses");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();

          setTitle(data.title || "");

          const tempCards = [];
          for (let i = 1; i <= 6; i++) {
            const key = i === 4 ? "card4v2" : `card${i}`;
            const cardArr = data[key];
            if (Array.isArray(cardArr) && cardArr.length > 0) {
              tempCards.push(cardArr); 
            } else {
              tempCards.push([]); 
            }
          }
          setCards(tempCards);
        } else {
          console.log("GeneralAnalyses dokümanı bulunamadı!");
        }
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      } finally {
      }
    }
    fetchData();
  }, []);

 

  return (
    <Box
      id="general-analyses"
      sx={{
        maxWidth: 1536,
        mx: "auto",
        px: 4,
        py: 16,
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        align="center"
        sx={{
          fontWeight: "800",
          mb: 4,
          color: darkMode ? "#c084fc" : "#9333ea",
          fontSize: {
            xs: "2rem",
            sm: "2.5rem",
            md: "2.75rem",
            lg: "2.875rem",
          },
        }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "repeat(3, 1fr)",
          },
          gap: 8,
        }}
      >
        {cards.map((cardItems, i) => (
          <Paper
            key={i}
            elevation={4}
            sx={{
              bgcolor: darkMode ? "#1f2937" : "white",
              borderRadius: 2,
              p: 3,
              transition: "box-shadow 0.3s",
              "&:hover": {
                boxShadow: 8,
              },
            }}
          >
            <List
              sx={{
                listStyleType: "disc",
                pl: 2,
                "& .MuiListItem-root": {
                  display: "list-item",
                  padding: 0,
                  mb: 1,
                  color: darkMode ? "#e5e7eb" : "#374151",
                  fontSize: "0.875rem",
                },
              }}
            >
              {cardItems.map((item, idx) => (
                <ListItem key={idx} disablePadding>
                 {item.value}
                </ListItem>
              ))}
            </List>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default GeneralAnalyses;
