

import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";

const About = ({ darkMode }) => {
  const [aboutData, setAboutData] = useState({ title: "", value: "" });

  useEffect(() => {
    async function fetchAbout() {
      try {
        const docRef = doc(db, "pages", "learnverse", "fields", "about");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAboutData(docSnap.data());
        } else {
          console.log("About dokümanı bulunamadı!");
        }
      } catch (error) {
        console.error("About verisi çekilirken hata:", error);
      } finally {
      }
    }
    fetchAbout();
  }, []);


  return (
    <Box
      id="about"
      className="py-24 px-6 mx-auto text-center relative"
      style={{
        background: darkMode
          ? "linear-gradient(135deg, #2d3748 0%, #1a202c 100%)"
          : "linear-gradient(135deg, #f9fafb 0%, #e0e7ff 100%)",
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{
          fontWeight: "800",
          mb: 4,
          color: darkMode ? "#c084fc" : "#9333ea",
          position: "relative",
          display: "inline-block",
          fontSize: {
            xs: "2rem",
            sm: "2.5rem",
            md: "2.75rem",
            lg: "2.875rem",
          },
        }}
      >
        {aboutData.title || "Learnverse Nedir?"}
        <Box
          component="span"
          sx={{
            display: "block",
            width: 80,
            height: 4,
            bgcolor: darkMode ? "#c084fc" : "#9333ea",
            borderRadius: 2,
            mx: "auto",
            mt: 1,
          }}
        />
      </Typography>

      <Typography
        variant="body1"
        sx={{
          fontSize: "1.125rem",
          maxWidth: 768,
          mx: "auto",
          color: darkMode ? "#d1d5db" : "#374151",
          lineHeight: 1.6,
          filter: "drop-shadow(0 0 2px rgba(0,0,0,0.1))",
          mt: 0,
        }}
      >
        {aboutData.value ||
          "Learnverse; interaktif, kullanıcı merkezli ve yapay zeka destekli bir dil öğrenme platformudur. Cümle tamamlama, sesli tekrar, kişisel kart oluşturma gibi araçlarla dil becerilerinizi hızla geliştirmenize yardımcı olur."}
      </Typography>
    </Box>
  );
};

export default About;
