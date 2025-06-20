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

export default function DrawerMenu({ menuItems, onLogout }) {
  const { colors } = useColors();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: colors.neutralLight,
          paddingTop: 2,
        },
      }}
    >
      <Box
        sx={{
          px: 3,
          mb: 2,
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
            sx={{
              mx: 2,
              my: 1,
              borderRadius: 2,
              backgroundColor:
                location.pathname === item.path
                  ? colors.secondaryLight
                  : "transparent",
              color: colors.neutralDark,
              "&:hover": {
                backgroundColor: colors.secondary,
                color: "white",
              },
              transition: "all 0.3s ease",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 35,
                color:
                  location.pathname === item.path
                    ? colors.secondaryDark
                    : colors.primary,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ px: 3, pb: 2 }}>
        <LogoutButton
          fullWidth
          onClick={onLogout}
          sx={{
            color: colors.secondaryDark,
            borderColor: colors.secondaryDark,
            "&:hover": {
              backgroundColor: colors.secondaryLight,
              borderColor: colors.secondary,
              color: colors.secondaryDark,
            },
          }}
        />
      </Box>
    </Drawer>
  );
}
