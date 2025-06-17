import React from "react";
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useColors } from "../../../context/ColorContext";

export default function MultipleChoice({ data, answers, onChange }) {
  const { colors } = useColors();

  return (
    <Box sx={{ mb: 5 }}>
      <Typography
        variant="h6"
        sx={{ mb: 3, color: colors.primaryDark, fontWeight: 700 }}
      >
        Çoktan Seçmeli Sorular
      </Typography>

      {data.map(({ question, options }, idx) => (
        <Box
          key={idx}
          sx={{
            mb: 3,
            p: 2,
            borderRadius: 2,
            bgcolor: colors.backgroundLight,
            boxShadow: `0 1px 4px ${colors.primaryLight}33`,
          }}
        >
          <Typography
            sx={{ mb: 1, fontWeight: 600, color: colors.textPrimary }}
          >
            {question}
          </Typography>

          <RadioGroup
            value={answers[idx] || ""}
            onChange={(e) => onChange(idx, e.target.value)}
            sx={{
              "& .MuiFormControlLabel-root": {
                color: colors.textPrimary,
                mb: 1,
              },
              "& .Mui-checked": {
                color: colors.primaryDark,
              },
            }}
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
