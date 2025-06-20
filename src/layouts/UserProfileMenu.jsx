import React, { useState } from "react";
import { Avatar, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useColors } from "../context/ColorContext";

export default function UserMenu({ username, onLogout }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const { colors } = useColors();

  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleProfile = () => {
    handleClose();
    navigate("/profil");
  };

  const handleLogout = () => {
    handleClose();
    onLogout?.(); // dışarıdan gelen logout fonksiyonu varsa çağır
  };

  return (
    <>
      <IconButton onClick={handleClick} size="large">
        <Avatar
          sx={{
            width: 34,
            height: 34,
            bgcolor: colors.secondary,
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          {username?.charAt(0)?.toUpperCase()}
        </Avatar>
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleProfile}>
          <Typography variant="body1">👤 Profilim</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Typography variant="body1">🚪 Çıkış Yap</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
