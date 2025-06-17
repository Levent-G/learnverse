import { Box } from "@mui/material";
import Header from "./components/Header";
import Hero from "./components/Hero";
import FeaturesCards from "./components/FeaturesCards";
import About from "./components/About";
import Features from "./components/Features";
import GeneralAnalyses from "./components/GeneralAnalyses";
import GeneralFeatures from "./components/GeneralFeatures";
import Footer from "./components/Footer";
import { useDarkMode } from "../../hooks/useDarkMode";

export default function LandingPage() {
  const [darkMode, setDarkMode] = useDarkMode(false);

  return (
    <Box className="min-h-screen transition-colors duration-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Hero Section */}
      <Hero />

      {/* Features Cards Under Hero */}
      <FeaturesCards darkMode={darkMode} />

      {/* About Section */}
      <About darkMode={darkMode} />

      {/* Features section */}
      <Features darkMode={darkMode} />

      {/* General Analyses Section */}
      <GeneralAnalyses darkMode={darkMode} />

      {/* Genel Özellikler Section */}
      <GeneralFeatures darkMode={darkMode} />

      {/* Footer */}
      <Footer />
    </Box>
  );
}
