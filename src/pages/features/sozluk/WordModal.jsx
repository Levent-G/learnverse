import React from "react";
import { Box, Typography, Button, Modal, Divider } from "@mui/material";
import { useColors } from "../../../context/ColorContext";
import ListenWithBear from "./ListenWithBear ";

const WordModal = ({ open, word, onClose }) => {
  const { colors } = useColors();

  if (!word) return null;
  console.log(word);
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="word-modal-title"
      aria-describedby="word-modal-description"
      sx={{
        overflowY: "auto",
        backdropFilter: "blur(6px)", // arka planı flu yapar, odak artırır
        backgroundColor: "rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: 500 },
          bgcolor: colors.neutralLight,
          borderRadius: 4,
          p: { xs: 3, sm: 5 },
          boxShadow: `0 12px 24px ${colors.primaryDark}55`,
          outline: "none",
          maxHeight: "90vh",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        {/* Başlık */}
        <Typography
          id="word-modal-title"
          variant="h3"
          sx={{
            fontWeight: 800,
            color: colors.primaryDark,
            textAlign: "center",
            letterSpacing: 1.2,
            textTransform: "uppercase",
            userSelect: "none",
          }}
        >
          {word.word}
        </Typography>

        {/* Anlam */}
        <Typography
          variant="h6"
          sx={{
            color: colors.neutralDark,
            fontWeight: 600,
            textAlign: "center",
            fontStyle: "italic",
            letterSpacing: 0.3,
          }}
        >
          {word.meaning}
        </Typography>

        <Divider sx={{ borderColor: colors.primaryLight }} />

        {/* Ses */}
        <Box sx={{ textAlign: "center" }}>
          <ListenWithBear textToSpeak={word.word} />
        </Box>

        {/* Kapat Butonu */}
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              textTransform: "none",
              borderRadius: 3,
              backgroundColor: colors.primary,
              color: colors.neutralLight,
              fontWeight: 700,
              px: 5,
              py: 1.5,
              fontSize: "1rem",
              boxShadow: `0 4px 12px ${colors.primary}99`,
              transition: "background-color 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                backgroundColor: colors.primaryDark,
                boxShadow: `0 6px 18px ${colors.primaryDark}cc`,
              },
            }}
          >
            Kapat
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default WordModal;
