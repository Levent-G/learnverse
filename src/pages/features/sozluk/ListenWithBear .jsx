import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { TalkingBear } from "./TalkingBear";

const ListenWithBear = ({ textToSpeak }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const speak = () => {
    setIsSpeaking(true)
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    utterance.lang = "en-US";

    window.speechSynthesis.speak(utterance);

 
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
        mt: 5,
        px: 2,
        maxWidth: 360,
        mx: "auto",
        bgcolor: "#f5f5f5",
        borderRadius: 3,
        boxShadow: 3,
        py: 4,
      }}
    >
      <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
        <TalkingBear isSpeaking={isSpeaking} size={80} />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={speak}
        disabled={!textToSpeak}
        sx={{
          borderRadius: 3,
          fontWeight: 700,
          px: 5,
          py: 1.5,
          fontSize: "1.1rem",
          textTransform: "none",
          boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
          "&:hover": {
            backgroundColor: "#1976d2",
            boxShadow: "0 6px 12px rgba(0,0,0,0.25)",
          },
        }}
      >
        🔊 Dinle
      </Button>
      {isSpeaking && (
        <Button
          variant="outlined"
          color="error"
          onClick={() => setIsSpeaking(false)}
        >
          ⏹ Durdur
        </Button>
      )}
    </Box>
  );
};

export default ListenWithBear;
