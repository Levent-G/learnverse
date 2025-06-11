import { Button } from "@mui/material";
import React from "react";

const CustomButton = ({ onClick, variant = "outlined", sx, text }) => {
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
            borderColor: "#9b59b6",
            color: "#9b59b6",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "#f3e8fb",
              borderColor: "#8e44ad",
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
            borderColor: "#9b59b6",
            color: "white",
            backgroundColor: "#8e44ad",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "#f3e8fb",
              borderColor: "#8e44ad",
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
