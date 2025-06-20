import { Paper, Typography, Box, Button } from "@mui/material";

export default function QuestionCard({ question, options, selectedAnswer, onSelect, colors }) {
  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 3, bgcolor: "#fafafa" }}>
      <Typography variant="h6" gutterBottom>
        {question}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {options.map((option, idx) => (
          <Button
            key={idx}
            variant={selectedAnswer === option ? "contained" : "outlined"}
            onClick={() => onSelect(option)}
            sx={{
              justifyContent: "flex-start",
              textTransform: "none",
              fontWeight: selectedAnswer === option ? 700 : 400,
              borderRadius: 2,
              py: 1.5,
              bgcolor: selectedAnswer === option ? colors.primary : undefined,
            }}
          >
            {option}
          </Button>
        ))}
      </Box>
    </Paper>
  );
}
