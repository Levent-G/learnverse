import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useColors } from "../../context/ColorContext";
import UserMenu from "../UserProfileMenu";

export default function MobileAppBar({ username, onLogout, onMenuClick }) {
  const { colors } = useColors();

  return (
    <AppBar position="static" sx={{ backgroundColor: colors.primaryDark }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          sx={{ color: "white", userSelect: "none", fontWeight: "bold" }}
        >
          LearnVerse
        </Typography>

        <UserMenu username={username} onLogout={onLogout} />
      </Toolbar>
    </AppBar>
  );
}
