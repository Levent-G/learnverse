import React, { useState } from "react";
import {
  Box,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
} from "@mui/material";
import axios from "axios";

const QuizSelector = ({ onQuizFetched }) => {
  const [level, setLevel] = useState("");
  const [category, setCategory] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const availableLevels = ["A1", "A2", "B1", "B2", "C1"];
  const availableCategories = [
    "Greetings",
    "People",
    "Numbers",
    "Family",
    "Colors",
    "Months & Seasons",
  ];

  const handleStartQuiz = async () => {
    try {
      const response = await axios.get("http://localhost:8010/quiz", {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
        params: {
          level,
          category,
          count: 10,
        },
      });

      onQuizFetched(response.data); // Quiz ekranına veriyi aktar
    } catch (error) {
      console.error("Quiz alınamadı:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom textAlign="center">
        Quiz Başlat
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Seviye</InputLabel>
        <Select value={level} label="Seviye" onChange={(e) => setLevel(e.target.value)}>
          {availableLevels.map((lvl) => (
            <MenuItem key={lvl} value={lvl}>
              {lvl}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Kategori</InputLabel>
        <Select
          value={category}
          label="Kategori"
          onChange={(e) => setCategory(e.target.value)}
        >
          {availableCategories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        fullWidth
        onClick={handleStartQuiz}
        disabled={!level || !category}
      >
        Quizi Başlat
      </Button>
    </Box>
  );
};

export default QuizSelector;
