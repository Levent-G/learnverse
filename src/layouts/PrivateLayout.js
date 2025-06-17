import React from "react";
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CssBaseline,
  useMediaQuery,
  Box,
  Button,
  Divider,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import QuizIcon from "@mui/icons-material/Quiz";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { useAuth } from "../contexts/AuthContext";
import { notify } from "../utils/notify";
import { useColors } from "../context/ColorContext";

const drawerWidth = 240;

function PrivateLayout({ children }) {
  const { colors } = useColors();
  const isMobile = useMediaQuery("(max-width:800px)");
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    { label: "Ana Sayfa", icon: <HomeIcon />, path: "/ana-sayfa" },
    { label: "Kelime Kartları", icon: <SchoolIcon />, path: "/feature/kelime-kartlari" },
    { label: "Kalıp Cümleler", icon: <MenuBookIcon />, path: "/feature/kalip-cumleler" },
    { label: "Quizler", icon: <QuizIcon />, path: "/feature/quizler" },
    { label: "Topluluk", icon: <PeopleAltIcon />, path: "/feature/topluluk" },
    { label: "AI Asistan", icon: <SmartToyIcon />, path: "/feature/ai-asistan" },
  ];

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      notify("Çıkış yapıldı", "success");
      navigate("/login");
    } else {
      notify(result.error || "Çıkış sırasında bir hata oluştu", "error");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: colors.neutralLight,
        minHeight: "100vh",
      }}
    >
      <CssBaseline />

      {!isMobile && (
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
                    location.pathname === item.path ? colors.secondaryLight : "transparent",
                  color:
                    location.pathname === item.path ? colors.secondaryDark : colors.neutralDark,
                  "&:hover": {
                    backgroundColor: colors.secondary,
                    color: colors.primaryDark,
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 35,
                    color:
                      location.pathname === item.path ? colors.secondaryDark : colors.primary,
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
            <Button
              onClick={handleLogout}
              fullWidth
              startIcon={<LogoutIcon />}
              variant="outlined"
              sx={{
                color: colors.secondaryDark,
                borderColor: colors.secondaryDark,
                borderRadius: 3,
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: colors.secondaryLight,
                  borderColor: colors.secondary,
                  color: colors.secondaryDark,
                },
                transition: "all 0.3s ease",
              }}
            >
              Çıkış Yap
            </Button>
          </Box>
        </Drawer>
      )}

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {!isMobile && (
          <AppBar position="static" sx={{ backgroundColor: colors.primaryDark }}>
            <Toolbar
              sx={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: 600,
                fontSize: "18px",
                letterSpacing: 1,
              }}
            >
              <Box>
                <img src="/logo.png" alt="LearnVerse Logo" style={{ height: 40 }} />
              </Box>
            </Toolbar>
          </AppBar>
        )}

        {isMobile && (
          <Box
            sx={{
              backgroundColor: colors.neutralLight,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ display: "flex" }}>
              {menuItems.map((item) => (
                <Box
                  key={item.label}
                  component={Link}
                  to={item.path}
                  sx={{
                    flex: 1,
                    textAlign: "center",
                    py: 2,
                    px: 1,
                    textDecoration: "none",
                    color: location.pathname === item.path ? colors.secondaryDark : "#555",
                    borderBottom:
                      location.pathname === item.path
                        ? `2px solid ${colors.secondaryDark}`
                        : "2px solid transparent",
                    "&:hover": {
                      backgroundColor: colors.neutralLight,
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <Box sx={{ color: "inherit" }}>{item.icon}</Box>
                  <Box sx={{ fontSize: "14px", mt: 0.5 }}>{item.label}</Box>
                </Box>
              ))}
            </Box>

            <Button
              onClick={handleLogout}
              variant="text"
              startIcon={<LogoutIcon />}
              sx={{
                py: 1,
                color: colors.secondaryDark,
                fontSize: "0.85rem",
                borderTop: `1px solid ${colors.neutral}`,
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              Çıkış Yap
            </Button>
          </Box>
        )}

        <Box sx={{ flex: 1, overflowY: "auto" }}>{children}</Box>
      </Box>
    </Box>
  );
}

export default PrivateLayout;
