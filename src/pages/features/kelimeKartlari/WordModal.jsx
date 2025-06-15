import React from "react";
import { Box, Typography, Button, Modal, Chip, Divider, Stack } from "@mui/material";

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
          width: { xs: "90%", sm: 500 },
          bgcolor: "#fff",
          borderRadius: 3,
          p: { xs: 3, sm: 4 },
          outline: "none",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <Typography
          variant="h4"
          sx={{ mb: 1, fontWeight: 700, color: "#7C3AED", textAlign: "center" }}
        >
          {word.word}
        </Typography>

        <Typography
          variant="h6"
          sx={{ mb: 3, fontWeight: 500, color: "#2E2E3A", textAlign: "center" }}
        >
          {word.meaning}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ textAlign: "center", mb: 3 }}>
          <audio controls style={{ width: "100%" }}>
            <source src={word.audio} type="audio/mpeg" />
            Tarayıcınız ses oynatıcısını desteklemiyor.
          </audio>
        </Box>

        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600, color: "#7C3AED" }}>
          Örnek Cümleler:
        </Typography>
        <Box
          component="ul"
          sx={{ pl: 3, mb: 3, color: "#2E2E3A", fontSize: "0.95rem" }}
        >
          {word.examples.map((ex, i) => (
            <li key={i} style={{ marginBottom: 8 }}>
              {ex}
            </li>
          ))}
        </Box>

        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600, color: "#7C3AED" }}>
          Benzer Kelimeler:
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          sx={{ flexWrap: "wrap", mb: 3 }}
        >
          {word.similar.map((sim, i) => (
            <Chip
              key={i}
              label={sim}
              variant="outlined"
              sx={{
                bgcolor: "#F3E8FF",
                borderColor: "#7C3AED",
                color: "#7C3AED",
                fontWeight: 500,
              }}
              size="small"
            />
          ))}
        </Stack>

        <Box sx={{ textAlign: "right" }}>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              backgroundColor: "#F43F5E",
              fontWeight: 600,
              px: 3,
              py: 1,
              "&:hover": {
                backgroundColor: "#D5304F",
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
