import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

export default function MultipleChoice({ data, answers, onChange }) {
  return (
    <Box sx={{ mb: 5 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Çoktan Seçmeli Sorular
      </Typography>
      {data.map(({ question, options }, idx) => (
        <Box key={idx} sx={{ mb: 2 }}>
          <Typography>{question}</Typography>
          <RadioGroup
            value={answers[idx] || ""}
            onChange={(e) => onChange(idx, e.target.value)}
          >
            {options.map((opt) => (
              <FormControlLabel
                key={opt}
                value={opt}
                control={<Radio />}
                label={opt}
              />
            ))}
          </RadioGroup>
        </Box>
      ))}
    </Box>
  );
}
