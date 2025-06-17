import React from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import { useColors } from "../../../context/ColorContext";

const AddPhraseForm = ({
  newPhraseText,
  setNewPhraseText,
  newPhraseCategory,
  setNewPhraseCategory,
  categories,
  onAdd,
}) => {
  const { colors } = useColors();

  return (
    <Box sx={{ mt: 6, maxWidth: 600, mx: "auto" }}>
      <Typography
        variant="h5"
        sx={{ mb: 2, fontWeight: 700, color: colors.primaryDark }}
      >
        Kendi Cümleni Ekle
      </Typography>

      <TextField
        fullWidth
        label="Cümle"
        variant="outlined"
        value={newPhraseText}
        onChange={(e) => setNewPhraseText(e.target.value)}
        sx={{
          mb: 2,
          borderRadius: 2,
          // burada arka planı sadece root ve inputa veriyoruz
          "& .MuiOutlinedInput-root": {
            backgroundColor: "white", // açık gri gibi, kendi paletinden de olabilir
            borderRadius: 2,
            "& fieldset": {
              borderColor: colors.primaryLight,
            },
            "&:hover fieldset": {
              borderColor: colors.primaryDark,
            },
            "&.Mui-focused fieldset": {
              borderColor: colors.primaryDark,
            },
            "& input": {
              backgroundColor: "white", // mutlaka inputun içine de ver, transparent kalmasın
              color: colors.neutralDark,
            },
          },
          "& .MuiInputLabel-root": {
            color: colors.primaryDark,
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: colors.primaryDark,
          },
        }}
      />
      <TextField
        select
        label="Kategori"
        value={newPhraseCategory}
        onChange={(e) => setNewPhraseCategory(e.target.value)}
        SelectProps={{ native: true }}
        sx={{
          mb: 2,
          width: "100%",
          borderRadius: 2,
          "& .MuiOutlinedInput-root": {
            backgroundColor: "white",
            borderRadius: 2,
            "& fieldset": {
              borderColor: colors.primaryLight,
            },
            "&:hover fieldset": {
              borderColor: colors.primaryDark,
            },
            "&.Mui-focused fieldset": {
              borderColor: colors.primaryDark,
            },
            "& select": {
              backgroundColor: "white",
              color: colors.neutralDark,
            },
          },
          "& .MuiInputLabel-root": {
            color: colors.primaryDark,
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: colors.primaryDark,
          },
        }}
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
          backgroundColor: colors.primaryDark,
          "&:hover": { backgroundColor: colors.primary },
          fontWeight: "bold",
          py: 1.5,
          borderRadius: 2,
        }}
        fullWidth
      >
        Ekle
      </Button>
    </Box>
  );
};

export default AddPhraseForm;
