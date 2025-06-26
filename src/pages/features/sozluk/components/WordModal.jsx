import React from "react";
import { Box, Typography, Modal, Divider } from "@mui/material";
import { useColors } from "../../../../context/ColorContext";
import ListenWithBear from "./ListenWithBear";

const WordModal = ({ open, word, onClose }) => {
  const { colors } = useColors();

  if (!word) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="word-modal-title"
      aria-describedby="word-modal-description"
      sx={{
        overflowY: "auto",
        backdropFilter: "blur(6px)",
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
          gap: 4,
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
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

        {/* Anlam alanı - modern */}
        <Box
          sx={{
            backgroundColor: "#F9FAFB",
            borderLeft: `4px solid ${colors.primaryDark}`,
            borderRadius: 2,
            px: 2,
            py: 1.5,
            boxShadow: `0 1px 4px ${colors.primaryDark}10`,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              color: colors.primaryDark,
              fontWeight: 700,
              mb: 0.5,
              letterSpacing: 0.5,
            }}
          >
            📖 Anlamı
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: colors.primaryDark,
              fontWeight: 500,
              lineHeight: 1.7,
              fontSize: "1.05rem",
            }}
          >
            {word.meaning}
          </Typography>
        </Box>

        <Divider sx={{ borderColor: colors.primaryLight }} />

        <Box>
          <ListenWithBear textToSpeak={word.word} />
        </Box>
      </Box>
    </Modal>
  );
};

export default WordModal;
