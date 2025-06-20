import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import { useColors } from "../../context/ColorContext";
import UserMenu from "../UserProfileMenu";

export default function DesktopAppBar({ username, onLogout }) {
  const { colors } = useColors();

  return (
    <AppBar position="static" sx={{ backgroundColor: colors.primaryDark }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          pr: 3,
        }}
      >
        <UserMenu username={username} onLogout={onLogout} />
      </Toolbar>
    </AppBar>
  );
}
