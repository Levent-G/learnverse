import React from "react";
import { Box, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { useColors } from "../../../context/ColorContext";

export default function TrueFalse({ data, answers, onChange }) {
  const { colors } = useColors();

  return (
    <Box sx={{ mb: 5 }}>
      <Typography
        variant="h6"
        sx={{ mb: 3, color: colors.primaryDark, fontWeight: 700 }}
      >
        Doğru / Yanlış Soruları
      </Typography>
      {data.map(({ question }, idx) => (
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
          <Typography sx={{ mb: 1, color: colors.textPrimary, fontWeight: 600 }}>
            {question}
          </Typography>
          <RadioGroup
            value={answers[idx] !== undefined ? answers[idx].toString() : ""}
            onChange={(e) => onChange(idx, e.target.value === "true")}
            row
            sx={{
              "& .MuiFormControlLabel-root": {
                color: colors.neutralDark,
                "& .MuiRadio-root": {
                  color: colors.primaryLight,
                },
                "&.Mui-checked": {
                  color: colors.primaryDark,
                },
              },
            }}
          >
            <FormControlLabel value="true" control={<Radio />} label="Doğru" />
            <FormControlLabel value="false" control={<Radio />} label="Yanlış" />
          </RadioGroup>
        </Box>
      ))}
    </Box>
  );
}
