import React from "react";
import { Box, Typography, Button, Modal, TextField } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";

const PhraseModal = ({
  open,
  phrase,
  onClose,
  recording,
  onStartRecord,
  onStopRecord,
  recordedAudio,
  quizAnswers,
  onQuizChange,
  onQuizCheck,
  quizResult,
}) => (
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
      {phrase && (
        <>
          <Typography variant="h4" sx={{ mb: 2, color: "#6a1b9a" }}>
            {phrase.text}
          </Typography>

          {phrase.audio && (
            <Button
              variant="outlined"
              startIcon={<VolumeUpIcon />}
              onClick={() => new Audio(phrase.audio).play()}
              sx={{ mb: 2, color: "#6a1b9a", borderColor: "#6a1b9a" }}
            >
              Telaffuzunu Dinle
            </Button>
          )}

          <Box sx={{ mb: 3 }}>
            {!recording ? (
              <Button
                variant="contained"
                startIcon={<MicIcon />}
                onClick={onStartRecord}
                sx={{
                  mr: 1,
                  backgroundColor: "#6a1b9a",
                  "&:hover": { backgroundColor: "#4a148c" },
                }}
              >
                Tekrar Et (Kaydet)
              </Button>
            ) : (
              <Button
                variant="contained"
                color="error"
                startIcon={<StopIcon />}
                onClick={onStopRecord}
                sx={{ mr: 1 }}
              >
                Kaydı Durdur
              </Button>
            )}

            {recordedAudio && (
              <audio
                controls
                src={recordedAudio}
                style={{ marginTop: 8, width: "100%" }}
              />
            )}
          </Box>

          <Typography variant="h6" sx={{ mb: 1 }}>
            Eksik Kelimeleri Tamamla
          </Typography>

          <Box sx={{ mb: 2 }}>
            {phrase.missingWordsQuiz?.map((word, idx) => (
              <TextField
                key={idx}
                size="small"
                variant="outlined"
                placeholder={`Kelime ${idx + 1}`}
                value={quizAnswers?.[idx] || ""}
                onChange={(e) => onQuizChange(idx, e.target.value)}
                sx={{ mr: 1, mb: 1, width: "calc(50% - 8px)" }}
              />
            ))}
          </Box>

          <Button
            variant="contained"
            onClick={onQuizCheck}
            sx={{
              mb: 2,
              backgroundColor: "#6a1b9a",
              "&:hover": { backgroundColor: "#4a148c" },
            }}
          >
            Kontrol Et
          </Button>

          {quizResult && (
            <Typography
              sx={{
                mb: 2,
                color: quizResult.includes("Tebrikler") ? "green" : "red",
              }}
            >
              {quizResult}
            </Typography>
          )}

          <Box sx={{ textAlign: "right" }}>
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{ color: "#6a1b9a", borderColor: "#6a1b9a" }}
            >
              Kapat
            </Button>
          </Box>
        </>
      )}
    </Box>
  </Modal>
);

export default PhraseModal;
