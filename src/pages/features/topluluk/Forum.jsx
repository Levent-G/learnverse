import React, { useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Chip,
  List,
  Button,
  TextField,
} from "@mui/material";
import { useColors } from "../../../context/ColorContext";

const Forum = ({
  questions,
  filteredQuestions,
  selectedTag,
  setSelectedTag,
  popularTags,
  newQuestion,
  setNewQuestion,
  addQuestion,
}) => {
  const { colors } = useColors();

  const inputRef = useRef(null);

  // Yeni soru eklendikten sonra inputa odaklan
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [newQuestion]); // newQuestion değiştiğinde focus ver

  // addQuestion fonksiyonunu güncellemek istiyorsan, onu üst componentte yapmanı öneririm.
  // Burada sadece render ediyoruz.

  return (
    <Box sx={{ mb: 5 }}>
      <Typography
        variant="h6"
        sx={{ mb: 2, color: colors.primary, fontWeight: 700 }}
      >
        Forum - Soru & Cevap
      </Typography>

      {/* Popüler Etiketler */}
      <Box sx={{ mb: 2 }}>
        {popularTags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            color={selectedTag === tag ? "secondary" : "default"}
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            sx={{ mr: 1, cursor: "pointer", fontWeight: 600 }}
            variant={selectedTag === tag ? "filled" : "outlined"}
          />
        ))}
      </Box>

      <List>
        {filteredQuestions.map(({ id, user, question, answers }) => (
          <Paper
            key={id}
            sx={{
              mb: 2,
              p: 2,
              backgroundColor: colors.backgroundPaper,
              borderRadius: 3,
            }}
            elevation={1}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              {question}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mb: 1, display: "block" }}
            >
              {user} tarafından soruldu
            </Typography>

            {answers.length ? (
              <Box sx={{ pl: 2 }}>
                {answers.map(({ user: ansUser, text }, i) => (
                  <Box key={i} sx={{ mb: 1 }}>
                    <Typography
                      sx={{ fontWeight: "bold", color: colors.primaryDark }}
                    >
                      {ansUser}:
                    </Typography>
                    <Typography>{text}</Typography>
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontStyle: "italic" }}
              >
                Henüz cevap yok.
              </Typography>
            )}
          </Paper>
        ))}
      </List>

      {/* Yeni Soru Ekleme */}
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <TextField
          inputRef={inputRef}
          fullWidth
          size="small"
          placeholder="Yeni soru sor..."
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addQuestion()}
          sx={{
            mb: 2,
            borderRadius: 2,
            // burada arka planı sadece root ve inputa veriyoruz
            "& .MuiOutlinedInput-root": {
              backgroundColor: "white", // açık gri gibi, kendi paletinden de olabilir
              borderRadius: 2,
              "& fieldset": {
                borderColor: colors.primaryLight,
              },
              "&:hover fieldset": {
                borderColor: colors.primaryDark,
              },
              "&.Mui-focused fieldset": {
                borderColor: colors.primaryDark,
              },
              "& input": {
                backgroundColor: "white", // mutlaka inputun içine de ver, transparent kalmasın
                color: colors.neutralDark,
              },
            },
            "& .MuiInputLabel-root": {
              color: colors.primaryDark,
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: colors.primaryDark,
            },
          }}
        />
        <Button
          variant="contained"
          onClick={addQuestion}
          sx={{
            backgroundColor: colors.primary,
            "&:hover": { backgroundColor: colors.primaryDark },
            fontWeight: "bold",
            whiteSpace: "nowrap",
          }}
        >
          Sor
        </Button>
      </Box>
    </Box>
  );
};

export default Forum;
