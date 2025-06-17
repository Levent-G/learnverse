import React from "react";
import { Box, Typography, Button, Modal, TextField } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import { useColors } from "../../../context/ColorContext";

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
}) => {
  const { colors } = useColors();

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflowY: "auto",
        padding: 2,
        backdropFilter: "blur(6px)", // arka planı flu yapar, odak artırır
        backgroundColor: "rgba(0,0,0,0.3)",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 600,
          bgcolor: colors.background || "background.paper",
          boxShadow: 24,
          borderRadius: 3,
          p: 4,
          maxHeight: "90vh",
          overflowY: "auto",
          outline: "none",
          // Scroll bar design (isteğe bağlı)
          "&::-webkit-scrollbar": {
            width: 8,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: colors.primaryLight,
            borderRadius: 4,
          },
        }}
      >
        {phrase && (
          <>
            <Typography
              variant="h4"
              sx={{ mb: 2, color: colors.primaryDark, fontWeight: 700 }}
            >
              {phrase.text}
            </Typography>

            {phrase.audio && (
              <Button
                variant="outlined"
                startIcon={<VolumeUpIcon />}
                onClick={() => new Audio(phrase.audio).play()}
                sx={{
                  mb: 2,
                  color: colors.primaryDark,
                  borderColor: colors.primaryDark,
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: colors.primaryLight,
                    borderColor: colors.primaryDark,
                  },
                }}
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
                    backgroundColor: colors.primaryDark,
                    "&:hover": { backgroundColor: colors.primary },
                    fontWeight: "bold",
                    borderRadius: 2,
                    py: 1,
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
                  sx={{
                    mr: 1,
                    fontWeight: "bold",
                    borderRadius: 2,
                    py: 1,
                  }}
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

            <Typography
              variant="h6"
              sx={{ mb: 1, fontWeight: 600, color: colors.primaryDark }}
            >
              Eksik Kelimeleri Tamamla
            </Typography>

            <Box sx={{ mb: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
              {phrase.missingWordsQuiz?.map((word, idx) => (
                <TextField
                  key={idx}
                  size="small"
                  variant="outlined"
                  placeholder={`Kelime ${idx + 1}`}
                  value={quizAnswers?.[idx] || ""}
                  onChange={(e) => onQuizChange(idx, e.target.value)}
                  sx={{
                    flex: "1 1 calc(50% - 8px)",
                    backgroundColor: colors.neutralLight,
                    borderRadius: 2,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: colors.neutralLight,
                    },
                    "& input": {
                      color: colors.neutralDark,
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: colors.primaryLight,
                    },
                    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: colors.primaryDark,
                      },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: colors.primaryDark,
                      },
                    "& .MuiInputLabel-root": {
                      color: colors.primaryDark,
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: colors.primaryDark,
                    },
                  }}
                />
              ))}
            </Box>

            <Button
              variant="contained"
              onClick={onQuizCheck}
              sx={{
                mb: 2,
                backgroundColor: colors.primaryDark,
                "&:hover": { backgroundColor: colors.primary },
                fontWeight: "bold",
                borderRadius: 2,
                py: 1.2,
              }}
              fullWidth
            >
              Kontrol Et
            </Button>

            {quizResult && (
              <Typography
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  color: quizResult.includes("Tebrikler") ? "green" : "red",
                  textAlign: "center",
                }}
              >
                {quizResult}
              </Typography>
            )}

            <Box sx={{ textAlign: "right" }}>
              <Button
                variant="outlined"
                onClick={onClose}
                sx={{
                  color: colors.primaryDark,
                  borderColor: colors.primaryDark,
                  fontWeight: "bold",
                  borderRadius: 2,
                  py: 1,
                  px: 3,
                  "&:hover": {
                    backgroundColor: colors.primaryLight,
                    borderColor: colors.primaryDark,
                  },
                }}
              >
                Kapat
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default PhraseModal;
