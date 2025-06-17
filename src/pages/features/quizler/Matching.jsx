import React from "react";
import { Box, Grid, MenuItem, Select, Typography } from "@mui/material";
import { useColors } from "../../../context/ColorContext";

export default function Matching({ data, answers, onChange }) {
  const { colors } = useColors();

  return (
    <Box sx={{ mb: 5 }}>
      <Typography
        variant="h6"
        sx={{ mb: 3, color: colors.primaryDark, fontWeight: 700 }}
      >
        Eşleştirme Soruları
      </Typography>

      {data.map(({ left, right }, idx) => (
        <Grid container spacing={3} key={idx}>
          {left.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item}>
              <Typography
                sx={{
                  fontWeight: 600,
                  mb: 1,
                  color: colors.textPrimary,
                  userSelect: "text",
                }}
              >
                {item}
              </Typography>
              <Select
                value={answers[item] || ""}
                onChange={(e) => onChange(item, e.target.value)}
                displayEmpty
                fullWidth
                sx={{
                  bgcolor: colors.backgroundLight,
                  color: answers[item] ? colors.textPrimary : colors.textSecondary,
                  "& .MuiSelect-icon": {
                    color: colors.primaryDark,
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: colors.primaryLight,
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: colors.primaryDark,
                  },
                }}
              >
                <MenuItem value="">
                  <em style={{ color: colors.textSecondary }}>Seçiniz</em>
                </MenuItem>
                {right.map((option) => (
                  <MenuItem
                    key={option}
                    value={option}
                    sx={{
                      color: colors.textPrimary,
                    }}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          ))}
        </Grid>
      ))}
    </Box>
  );
}
