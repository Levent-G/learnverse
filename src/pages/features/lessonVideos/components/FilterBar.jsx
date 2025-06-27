import React from "react";
import {
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";

const inputSx = {
  backgroundColor: "#F5F9FF",
  borderRadius: 3,
  boxShadow: "inset 0 2px 5px rgba(0,0,0,0.05)",
  "& .MuiOutlinedInput-root": {
    borderRadius: 3,
    "& fieldset": {
      borderColor: "#A3BFFA",
      transition: "border-color 0.3s ease",
    },
    "&:hover fieldset": {
      borderColor: "#87CEEB",
      boxShadow: "0 0 8px #87CEEB",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#0EA5E9",
      boxShadow: "0 0 8px #0EA5E9",
    },
  },
  "& .MuiInputBase-input": {
    padding: "12.5px 14px",
    fontWeight: 500,
    color: "#394867",
  },
  "& .MuiInputLabel-root": {
    color: "#657786",
    fontWeight: 600,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#0EA5E9",
  },
};

export default function FilterBar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  level,
  onLevelChange,
}) {
  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search lessons..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={inputSx}
          label="Search"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={6} md={4}>
        <TextField
          select
          fullWidth
          label="Category"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          sx={inputSx}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Grammar">Grammar</MenuItem>
          <MenuItem value="Speaking">Speaking</MenuItem>
          <MenuItem value="Listening">Listening</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={6} md={4}>
        <TextField
          select
          fullWidth
          label="Level"
          value={level}
          onChange={(e) => onLevelChange(e.target.value)}
          sx={inputSx}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Beginner">Beginner</MenuItem>
          <MenuItem value="Intermediate">Intermediate</MenuItem>
          <MenuItem value="Advanced">Advanced</MenuItem>
        </TextField>
      </Grid>
    </Grid>
  );
}
