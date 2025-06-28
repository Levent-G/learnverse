import React from "react";
import { Grid, TextField, MenuItem, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const inputSx = {
  backgroundColor: "#F9FAFB",
  borderRadius: 2,
  "& .MuiOutlinedInput-root": {
    borderRadius: 8,
    "& fieldset": {
      borderColor: "#CBD5E1",
      transition: "border-color 0.3s ease",
    },
    "&:hover fieldset": {
      borderColor: "#3B82F6",
      boxShadow: "0 0 8px rgba(59, 130, 246, 0.4)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2563EB",
      boxShadow: "0 0 8px rgba(37, 99, 235, 0.7)",
    },
  },
  "& .MuiInputBase-input": {
    padding: "12px 14px",
    fontWeight: 600,
    color: "#1E293B",
    fontSize: 14,
  },
  "& .MuiInputLabel-root": {
    color: "#64748B",
    fontWeight: 600,
    fontSize: 14,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#2563EB",
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
    <Grid container spacing={3} sx={{ mb: 5 }}>
      <Grid item xs={12} md={5}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search lessons..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={inputSx}
          label="Search"
          InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#64748B" }} />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={6} md={3.5}>
        <TextField
          select
          fullWidth
          label="Category"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          sx={inputSx}
        >
          <MenuItem value="">All Categories</MenuItem>
          <MenuItem value="Grammar">Grammar</MenuItem>
          <MenuItem value="Speaking">Speaking</MenuItem>
          <MenuItem value="Listening">Listening</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={6} md={3.5}>
        <TextField
          select
          fullWidth
          label="Level"
          value={level}
          onChange={(e) => onLevelChange(e.target.value)}
          sx={inputSx}
        >
          <MenuItem value="">All Levels</MenuItem>
          <MenuItem value="Beginner">Beginner</MenuItem>
          <MenuItem value="Intermediate">Intermediate</MenuItem>
          <MenuItem value="Advanced">Advanced</MenuItem>
        </TextField>
      </Grid>
    </Grid>
  );
}
