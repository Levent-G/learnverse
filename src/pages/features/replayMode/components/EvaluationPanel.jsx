import React, { useState } from "react";
import { Box, Typography, Slider, TextField, Button } from "@mui/material";

export default function EvaluationPanel({ onEvaluate, evaluation }) {
  const [score, setScore] = useState(5);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    onEvaluate(score, feedback);
  };

  return (
    <Box
      sx={{
        bgcolor: "#E0F2FE",
        p: 3,
        borderRadius: 3,
        boxShadow: "0 3px 10px rgba(14,165,233,0.2)",
        mb: 3,
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={2} color="#0369A1">
        Cevabınızı Değerlendirin
      </Typography>

      <Typography gutterBottom>
        Puan: <strong>{score}</strong> (1 kötü - 10 mükemmel)
      </Typography>
      <Slider
        value={score}
        onChange={(_, val) => setScore(val)}
        min={1}
        max={10}
        step={1}
        sx={{ mb: 3, color: "#0EA5E9" }}
      />

      <TextField
        label="Geribildirim"
        multiline
        rows={3}
        fullWidth
        variant="outlined"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        sx={{ mb: 3 }}
        placeholder="Cevabınız hakkında düşüncelerinizi yazın..."
      />

      <Button
        variant="contained"
        fullWidth
        onClick={handleSubmit}
        sx={{ bgcolor: "#0EA5E9", fontWeight: "bold", "&:hover": { bgcolor: "#0369A1" } }}
      >
        Gönder
      </Button>

      {evaluation && (
        <Box mt={2} sx={{ color: "#0369A1" }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Değerlendirme Gönderildi!
          </Typography>
          <Typography>Puan: {evaluation.score}</Typography>
          <Typography>Geribildirim: {evaluation.feedback}</Typography>
        </Box>
      )}
    </Box>
  );
}
