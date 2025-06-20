import React from "react";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useColors } from "../../context/ColorContext";
import LogoutButton from "./LogoutButton";

const drawerWidth = 240;

export default function MobileDrawerMenu({ open, onClose, menuItems, onLogout }) {
  const { colors } = useColors();
  const location = useLocation();

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: drawerWidth } }}
    >
      <Box
        sx={{ width: "100%" }}
        role="presentation"
        onClick={onClose}
        onKeyDown={onClose}
      >
        <Box
          sx={{
            px: 3,
            py: 2,
            fontWeight: "bold",
            fontSize: 20,
            color: colors.primaryDark,
            letterSpacing: 1,
          }}
        >
          LearnVerse
        </Box>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.label}
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: 1,
                mx: 1,
                my: 0.5,
                "&.Mui-selected": {
                  backgroundColor: colors.secondaryLight,
                  color: colors.secondaryDark,
                  "& .MuiListItemIcon-root": {
                    color: colors.secondaryDark,
                  },
                },
                "&:hover": {
                  backgroundColor: colors.secondaryLight,
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box sx={{ px: 2, py: 1 }}>
          <LogoutButton
            fullWidth
            onClick={onLogout}
          />
        </Box>
      </Box>
    </Drawer>
  );
}
