import { Button } from "@mui/material";
import React from "react";
import { useColors } from "../../context/ColorContext";

const CustomButton = ({ onClick, variant = "outlined", sx, text, type }) => {
  const {colors} = useColors();

  return (
    <>
      {variant === "outlined" && (
        <Button
          onClick={onClick}
          type={type}
          variant={variant}
          sx={{
            px: 2,
            py: 1,
            fontSize: "0.875rem",
            textTransform: "none",
            borderRadius: 2,
            borderColor: colors.primary,
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
          type={type}
          variant="contained"
          sx={{
            px: 2,
            py: 1,
            fontSize: "0.875rem",
            textTransform: "none",
            borderRadius: 2,
            borderColor: colors.primary,
            color: "white",
            backgroundColor: colors.primary,
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
