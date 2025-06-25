import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useColors } from "../../../context/ColorContext";

export default function SearchBar({ value, onChange }) {
  const { colors } = useColors();

  return (
    <TextField
      variant="outlined"
      fullWidth
      placeholder="Kelime veya anlam ara..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      size="medium"
      sx={{
        backgroundColor: "#fff",
        borderRadius: 3,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        "& .MuiOutlinedInput-root": {
          borderRadius: 3,
          paddingRight: 0,
          "& fieldset": {
            borderColor: colors.neutralLight,
          },
          "&:hover fieldset": {
            borderColor: colors.primary,
          },
          "&.Mui-focused fieldset": {
            borderColor: colors.primary,
            boxShadow: `0 0 10px ${colors.primaryLight}`,
          },
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: colors.neutralDark }} />
          </InputAdornment>
        ),
      }}
    />
  );
}
