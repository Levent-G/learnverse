import React, { useState } from "react";
import { Box, CssBaseline, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useColors } from "../context/ColorContext";
import { useAuth } from "../context/AuthContext";

import DrawerMenu from "./components/DrawerMenu";
import MobileDrawerMenu from "./components/MobileDrawerMenu";
import DesktopAppBar from "./components/DesktopAppBar";
import MobileAppBar from "./components/MobileAppBar";

import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import QuizIcon from "@mui/icons-material/Quiz";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon'; 
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

import { notify } from "../utils/notify";

export default function PrivateLayout({ children }) {
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const { colors } = useColors();
  const isMobile = useMediaQuery("(max-width:1000px)");
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    { label: "Ana Sayfa", icon: <HomeIcon />, path: "/ana-sayfa" },
    {
      label: "Learnverse Sözlük",
      icon: <MenuBookIcon />,
      path: "/feature/learnverse-sozluk",
    },
    {
      label: "Kalıp Cümleler",
      icon: <SchoolIcon />,
      path: "/feature/kalip-cumleler",
    },
    { label: "Quizler", icon: <QuizIcon />, path: "/feature/quizler" },
    {
      label: "Ders Videoları",
      icon: <VideoLibraryIcon />,
      path: "/feature/lessonVideos",
    },
    {
      label: "Roleplay Modu",
      icon: <WorkOutlineIcon />,
      path: "/feature/roleplay",
    },
    { label: "Topluluk", icon: <PeopleAltIcon />, path: "/feature/topluluk" },
    {
      label: "AI Asistan",
      icon: <SmartToyIcon />,
      path: "/feature/ai-asistan",
    },
    // Yeni oyun menü öğesi
    {
      label: "Kelime Yakala",
      icon: <CatchingPokemonIcon />,
      path: "/feature/word-catcher-game",
    },
  ];

  // Dilerseniz burada iconları da aynı şekilde import edip ekleyin, veya props olarak PrivateLayout dışından verin

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate("/login");
      notify("Çıkış Yapıldı", "info");
    } else {
      alert(result.error || "Çıkış sırasında bir hata oluştu");
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
        <DrawerMenu menuItems={menuItems} onLogout={handleLogout} />
      )}

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {!isMobile && (
          <DesktopAppBar
            username={userInfo?.username || "?"}
            onLogout={handleLogout}
          />
        )}

        {isMobile && (
          <MobileAppBar
            username={userInfo?.username || "?"}
            onLogout={handleLogout}
            onMenuClick={() => setDrawerOpen(true)}
          />
        )}

        {isMobile && (
          <MobileDrawerMenu
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            menuItems={menuItems}
            onLogout={() => {
              setDrawerOpen(false);
              handleLogout();
            }}
          />
        )}

        <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>{children}</Box>
      </Box>
    </Box>
  );
}
