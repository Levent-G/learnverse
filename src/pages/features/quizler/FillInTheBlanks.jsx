import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { useColors } from "../../../context/ColorContext";

export default function FillInTheBlanks({ data, answers, onChange }) {
  const { colors } = useColors();

  return (
    <Box sx={{ mb: 5 }}>
      <Typography
        variant="h6"
        sx={{ mb: 3, color: colors.primaryDark, fontWeight: 700 }}
      >
        Boşluk Doldurma
      </Typography>
      {data.map(({ sentence }, idx) => {
        const displayedSentence = sentence.replace("___", "______");
        return (
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
              {displayedSentence}
            </Typography>
            <TextField
              size="small"
              placeholder="Kelimeyi yaz"
              value={answers[idx] || ""}
              onChange={(e) => onChange(idx, e.target.value)}
              sx={{
                mt: 1,
                width: "300px",
                backgroundColor: colors.neutralLight,
                borderRadius: 1,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: colors.primaryLight,
                  },
                  "&:hover fieldset": {
                    borderColor: colors.primaryDark,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: colors.primaryDark,
                  },
                },
                "& input": {
                  color: colors.neutralDark,
                },
              }}
            />
          </Box>
        );
      })}
    </Box>
  );
}
