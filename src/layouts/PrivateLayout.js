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
import { useAuth } from "../contexts/AuthContext";
import { notify } from "../utils/notify";

const drawerWidth = 240;

function PrivateLayout({ children }) {
  const isMobile = useMediaQuery("(max-width:800px)");
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    { label: "Ana Sayfa", icon: <HomeIcon />, path: "/ana-sayfa" },
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
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        backgroundColor: "#fefefe", // login sayfasına uyumlu açık renk
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
              backgroundColor: "#fff",
              borderRight: "1px solid #ddd",
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
              color: "#4a148c", // mor vurgu #9b59b6'dan biraz koyu daha koyu görünmesi için
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
                    location.pathname === item.path ? "#e1bee7" : "transparent", // açık mor arkaplan
                  color: location.pathname === item.path ? "#6a1b9a" : "#333", // aktif ise koyu mor, değilse koyu gri
                  "&:hover": {
                    backgroundColor: "#ce93d8",
                    color: "#4a148c",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 35,
                    color:
                      location.pathname === item.path ? "#6a1b9a" : "#9c27b0",
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
                color: "#9b59b6",
                borderColor: "#9b59b6",
                borderRadius: 3,
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#f3e5f5",
                  borderColor: "#8e24aa",
                  color: "#6a1b9a",
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
          <AppBar position="static" sx={{ backgroundColor: "#4a148c" }}>
            <Toolbar
              sx={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: 600,
                fontSize: "18px",
                letterSpacing: 1,
              }}
            >
              <Box>LearnVerse</Box>
            </Toolbar>
          </AppBar>
        )}

        {isMobile && (
          <Box
            sx={{
              backgroundColor: "#fff",
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
                    py: 1,
                    textDecoration: "none",
                    color: location.pathname === item.path ? "#9b59b6" : "#555",
                    borderBottom:
                      location.pathname === item.path
                        ? "2px solid #9b59b6"
                        : "2px solid transparent",
                    "&:hover": {
                      backgroundColor: "#f9f9f9",
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
                color: "#9b59b6",
                fontSize: "0.85rem",
                borderTop: "1px solid #eee",
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              Çıkış Yap
            </Button>
          </Box>
        )}

        <Box sx={{ padding: 3, flex: 1 }}>{children}</Box>
      </Box>
    </Box>
  );
}

export default PrivateLayout;
