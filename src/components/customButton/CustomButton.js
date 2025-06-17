import { Button } from "@mui/material";
import React from "react";
import { useColors } from "../../context/ColorContext";

const CustomButton = ({ onClick, variant = "outlined", sx, text }) => {
  const { colors } = useColors();

  return (
    <>
      {variant === "outlined" && (
        <Button
          onClick={onClick}
          variant={variant}
          sx={{
            px: 2,
            py: 1,
            fontSize: "0.875rem",
            textTransform: "none",
            borderRadius: 2,
            borderColor: colors.primary, // Paletten renk kullanıldı
            color: colors.primary,
            fontWeight: 500,
            "&:hover": {
              backgroundColor: colors.primaryLight,
              borderColor: colors.primaryDark,
            },
            ...sx,
          }}
        >
          {text}
        </Button>
      )}
      {variant === "contained" && (
        <Button
          onClick={onClick}
          type="submit"
          variant="contained"
          sx={{
            px: 2,
            py: 1,
            fontSize: "0.875rem",
            textTransform: "none",
            borderRadius: 2,
            borderColor: colors.primary,
            color: "white",
            backgroundColor: colors.primaryDark,
            fontWeight: 500,
            "&:hover": {
              backgroundColor: colors.primaryLight,
              borderColor: colors.primaryDark,
            },
            ...sx,
          }}
        >
          {text}
        </Button>
      )}
    </>
  );
};

export default CustomButton;
