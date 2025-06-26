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
          backgroundColor: colors.primaryLight, // soft buz mavisi
          paddingTop: 2,
        },
      }}
    >
      {/* Logo */}
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
        {menuItems.map((item) => {
          const isSelected = location.pathname === item.path;

          return (
            <ListItem
              button
              key={item.label}
              component={Link}
              to={item.path}
              sx={{
                mx: 2,
                my: 0.5,
                borderRadius: 2,
                backgroundColor: isSelected
                  ? colors.primary
                  : "transparent",
                color: isSelected ? "#fff" : colors.primaryDark,
                fontWeight: isSelected ? 600 : 500,
                transition: "all 0.25s ease",
                "&:hover": {
                  backgroundColor: `${colors.primary}22`, // transparan soft mavi
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 35,
                  color: isSelected ? "#fff" : colors.primaryDark,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: 14,
                }}
              />
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      {/* Logout Button */}
      <Box sx={{ px: 3, pb: 2 }}>
        <LogoutButton
          fullWidth
          onClick={onLogout}
          sx={{
            color: colors.primaryDark,
            borderColor: colors.primary,
            fontWeight: 600,
            "&:hover": {
              backgroundColor: `${colors.primary}22`,
              borderColor: colors.primary,
              color: colors.primaryDark,
            },
          }}
        />
      </Box>
    </Drawer>
  );
}
