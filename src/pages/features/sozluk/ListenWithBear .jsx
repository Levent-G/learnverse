import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { TalkingBear } from "./TalkingBear";

const ListenWithBear = ({ textToSpeak }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = () => {
    if (!window.responsiveVoice) {
      alert("ResponsiveVoice yüklü değil!");
      return;
    }

    if (!textToSpeak) return;

    setIsSpeaking(true);

    window.responsiveVoice.speak(textToSpeak, "UK English Female", {
      onstart: () => {
        setIsSpeaking(true);
      },
      onend: () => {
        setIsSpeaking(false);
      },
      onerror: () => {
        setIsSpeaking(false);
      },
    });
  };

  const stopSpeaking = () => {
    if (window.responsiveVoice) {
      window.responsiveVoice.cancel();
    }
    setIsSpeaking(false);
  };

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
        disabled={!textToSpeak || isSpeaking}
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
          mr: 2,
        }}
      >
        🔊 Dinle
      </Button>
      {isSpeaking && (
        <Button
          variant="outlined"
          color="secondary"
          onClick={stopSpeaking}
          sx={{
            borderRadius: 3,
            fontWeight: 700,
            px: 5,
            py: 1.5,
            fontSize: "1.1rem",
            textTransform: "none",
          }}
        >
          ■ Durdur
        </Button>
      )}
    </Box>
  );
};

export default ListenWithBear;
