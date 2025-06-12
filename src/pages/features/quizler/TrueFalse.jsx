import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

export default function TrueFalse({ data, answers, onChange }) {
  return (
    <Box sx={{ mb: 5 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Doğru / Yanlış Soruları
      </Typography>
      {data.map(({ question }, idx) => (
        <Box key={idx} sx={{ mb: 2 }}>
          <Typography>{question}</Typography>
          <RadioGroup
            value={answers[idx] !== undefined ? answers[idx].toString() : ""}
            onChange={(e) => onChange(idx, e.target.value === "true")}
            row
          >
            <FormControlLabel value="true" control={<Radio />} label="Doğru" />
            <FormControlLabel
              value="false"
              control={<Radio />}
              label="Yanlış"
            />
          </RadioGroup>
        </Box>
      ))}
    </Box>
  );
}
