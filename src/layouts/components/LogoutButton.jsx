import React from "react";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useColors } from "../../context/ColorContext";

export default function LogoutButton({ onClick, fullWidth = false }) {
  const { colors } = useColors();

  return (
    <Button
      fullWidth={fullWidth}
      variant="outlined"
      startIcon={<LogoutIcon />}
      onClick={onClick}
      sx={{
        color: "white",
        borderRadius: 3,
        textTransform: "none",
        fontWeight: "bold",
        transition: "all 0.3s ease",
        bgcolor:[colors.error],
        borderColor: [colors.error],
      }}
    >
      Çıkış Yap
    </Button>
  );
}
