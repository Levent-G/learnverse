import React from "react";
import { Box, Typography, Button, Modal, Chip } from "@mui/material";

const WordModal = ({ open, word, onClose }) => {
  if (!word) return null;

  return (
    <Modal open={open} onClose={onClose} sx={{ overflowY: "auto" }}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 3,
          p: 4,
          outline: "none",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <Typography variant="h4" sx={{ mb: 1 }}>
          {word.word}
        </Typography>
        <Typography variant="h6" sx={{ mb: 2, color: "#8e24aa" }}>
          {word.meaning}
        </Typography>

        <audio controls style={{ width: "100%", marginBottom: 16 }}>
          <source src={word.audio} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
          Örnek Cümleler:
        </Typography>
        <Box component="ul" sx={{ pl: 3, mb: 3 }}>
          {word.examples.map((ex, i) => (
            <li key={i} style={{ marginBottom: "8px" }}>
              {ex}
            </li>
          ))}
        </Box>

        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
          Benzer Kelimeler:
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {word.similar.map((sim, i) => (
            <Chip key={i} label={sim} size="small" variant="outlined" />
          ))}
        </Box>

        <Box sx={{ mt: 3, textAlign: "right" }}>
          <Button variant="contained" onClick={onClose} sx={{ textTransform: "none", borderRadius: 2 }}>
            Kapat
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default WordModal;