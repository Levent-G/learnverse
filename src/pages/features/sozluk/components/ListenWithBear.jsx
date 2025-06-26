import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { TalkingBear } from "./TalkingBear";

const ListenWithBear = ({ textToSpeak }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = () => {
    if (!window.speechSynthesis || !textToSpeak) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = "en-US";

    setIsSpeaking(true);

    utterance.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);

    setTimeout(() => {
      setIsSpeaking(false);
    }, 2500);
  };

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 1,
        px: 3,
        py: 4,
        borderRadius: 3,
        bgcolor: "#F0F4F8",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
        <TalkingBear isSpeaking={isSpeaking} size={80} />
      </Box>
      <Button
        variant="contained"
        onClick={speak}
        sx={{
          background: "linear-gradient(90deg, #3B82F6, #2563EB)",
          color: "#fff",
          fontWeight: 600,
          px: 4,
          py: 1,
          borderRadius: 3,
          fontSize: "0.95rem",
          textTransform: "none",
          transition: "all 0.2s ease",
          "&:hover": {
            background: "#2563EB",
            transform: "scale(1.03)",
          },
        }}
      >
        🔊 Dinle
      </Button>
    </Box>
  );
};

export default ListenWithBear;
