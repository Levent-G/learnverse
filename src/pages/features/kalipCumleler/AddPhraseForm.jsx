import React from "react";
import { Box, TextField, Typography, Button } from "@mui/material";

const AddPhraseForm = ({
  newPhraseText,
  setNewPhraseText,
  newPhraseCategory,
  setNewPhraseCategory,
  categories,
  onAdd,
}) => (
  <Box sx={{ mt: 6, maxWidth: 600, mx: "auto" }}>
    <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: "#6a1b9a" }}>
      Kendi Cümleni Ekle
    </Typography>

    <TextField
      fullWidth
      label="Cümle"
      variant="outlined"
      value={newPhraseText}
      onChange={(e) => setNewPhraseText(e.target.value)}
      sx={{ mb: 2 }}
    />

    <TextField
      select
      label="Kategori"
      value={newPhraseCategory}
      onChange={(e) => setNewPhraseCategory(e.target.value)}
      SelectProps={{ native: true }}
      sx={{ mb: 2, width: 220 }}
    >
      {categories
        ?.filter((c) => c !== "Tümü")
        .map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
    </TextField>

    <Button
      variant="contained"
      onClick={onAdd}
      sx={{
        backgroundColor: "#6a1b9a",
        "&:hover": { backgroundColor: "#4a148c" },
        fontWeight: "bold",
      }}
      fullWidth
    >
      Ekle
    </Button>
  </Box>
);

export default AddPhraseForm;
