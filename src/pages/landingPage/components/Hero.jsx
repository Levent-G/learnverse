import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // düzeltme: doğru router kullanımı
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";

const Hero = () => {
  const [heroData, setHeroData] = useState({
    title: "",
    title2: "",
    description: "",
  });

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const docRef = doc(db, "pages", "learnverse", "fields", "hero");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setHeroData(docSnap.data());
        } else {
          console.warn("Hero verisi bulunamadı.");
        }
      } catch (error) {
        console.error("Hero verisi alınırken hata:", error);
      }
    };

    fetchHeroData();
  }, []);

  return (
    <Box className="text-center py-16 px-4">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl font-bold mb-6"
      >
        {heroData.title}{" "}
        <Typography variant="span" sx={{ color: "#c084fc" }}>
          {heroData.title2}
        </Typography>
      </motion.h2>
      <Typography
        component="p"
        sx={{
          fontSize: { xs: "1.125rem", sm: "1.25rem" },
          maxWidth: "42rem",
          marginX: "auto",
          marginBottom: 3,
        }}
      >
        {heroData.description}
      </Typography>
      <Link
        to="/kayit"
        className="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700"
      >
        Hemen Başla
      </Link>
    </Box>
  );
};

export default Hero;
