import React from "react";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export default function LogoutButton({ onClick, fullWidth = false }) {
  return (
    <Button
      fullWidth={fullWidth}
      variant="outlined"
      startIcon={<LogoutIcon />}
      onClick={onClick}
      sx={{
        color: "inherit",
        borderRadius: 3,
        textTransform: "none",
        fontWeight: "bold",
        transition: "all 0.3s ease",
      }}
    >
      Çıkış Yap
    </Button>
  );
}
