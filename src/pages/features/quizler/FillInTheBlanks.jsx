import { Box, TextField, Typography } from "@mui/material";

export default function FillInTheBlanks({ data, answers, onChange }) {
  return (
    <Box sx={{ mb: 5 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Boşluk Doldurma
      </Typography>
      {data.map(({ sentence }, idx) => {
        const displayedSentence = sentence.replace("___", "______");
        return (
          <Box key={idx} sx={{ mb: 2 }}>
            <Typography>{displayedSentence}</Typography>
            <TextField
              size="small"
              placeholder="Kelimeyi yaz"
              value={answers[idx] || ""}
              onChange={(e) => onChange(idx, e.target.value)}
              sx={{ mt: 1, width: "300px" }}
            />
          </Box>
        );
      })}
    </Box>
  );
}
