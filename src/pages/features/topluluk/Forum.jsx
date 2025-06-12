import React from "react";
import {
  Box,
  Typography,
  Paper,
  Chip,
  List,
  Button,
  TextField,
} from "@mui/material";

const Forum = ({
  questions,
  filteredQuestions,
  selectedTag,
  setSelectedTag,
  popularTags,
  newQuestion,
  setNewQuestion,
  addQuestion,
}) => (
  <Box sx={{ mb: 5 }}>
    <Typography variant="h6" sx={{ mb: 2, color: "#6a1b9a", fontWeight: 700 }}>
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
          sx={{ mb: 2, p: 2, backgroundColor: "#f3e5f5", borderRadius: 3 }}
          elevation={1}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            {question}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block" }}>
            {user} tarafından soruldu
          </Typography>

          {answers.length ? (
            <Box sx={{ pl: 2 }}>
              {answers.map(({ user: ansUser, text }, i) => (
                <Box key={i} sx={{ mb: 1 }}>
                  <Typography sx={{ fontWeight: "bold", color: "#4a148c" }}>{ansUser}:</Typography>
                  <Typography>{text}</Typography>
                </Box>
              ))}
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic" }}>
              Henüz cevap yok.
            </Typography>
          )}
        </Paper>
      ))}
    </List>

    {/* Yeni Soru Ekleme */}
    <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
      <TextField
        fullWidth
        size="small"
        placeholder="Yeni soru sor..."
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addQuestion()}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#6a1b9a" },
            "&:hover fieldset": { borderColor: "#4a148c" },
            "&.Mui-focused fieldset": { borderColor: "#4a148c" },
          },
        }}
      />
      <Button
        variant="contained"
        onClick={addQuestion}
        sx={{
          backgroundColor: "#6a1b9a",
          "&:hover": { backgroundColor: "#4a148c" },
          fontWeight: "bold",
          whiteSpace: "nowrap",
        }}
      >
        Sor
      </Button>
    </Box>
  </Box>
);

export default Forum;
