import { DarkMode, LightMode } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";

const Header = ({ darkMode, setDarkMode }) => {
  const [data, error] = useFetchData("menu");

  return !error ? (
      <Box className="flex justify-between items-center p-4 shadow-md bg-white dark:bg-gray-800">
        <Box className="flex items-center gap-3">
          <img src="/logo.png" alt="LearnVerse Logo" style={{ height: 40 }} />
          <Typography fontSize="1.5rem" sx={{ fontWeight: 800 }}>
            {data?.title || "Learnverse"}
          </Typography>
        </Box>

        <Box
          component="nav"
          sx={{
            display: { xs: "none", sm: "block" },
            "& a": {
              marginRight: 2,
              textDecoration: "none",
              color: "inherit",
              "&:hover": {
                textDecoration: "underline",
              },
            },
          }}
        >
          {data?.menuitem?.map((item, index) => (
            <Link key={index} to={`#${item.value}`} className="hover:underline">
              {item.value}
            </Link>
          ))}
        </Box>

        <Box className="flex items-center space-x-2">
          <IconButton
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
            sx={{
              p: 1.5,
              borderRadius: "50%",
              backgroundColor: darkMode ? "grey.800" : "grey.200",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: darkMode ? "grey.700" : "grey.300",
              },
            }}
          >
            {!darkMode ? (
              <LightMode fontSize="small" sx={{ color: "#facc15" }} />
            ) : (
              <DarkMode fontSize="small" sx={{ color: "#1f2937" }} />
            )}
          </IconButton>
          <Link
            to="/giris"
            className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 text-sm font-semibold"
          >
            Giriş Yap
          </Link>
        </Box>
      </Box>
  ) : (
    <Typography fontSize="1.5rem" sx={{ fontWeight: 800,color:"red",textAlign:"center" }}>
      Sayfa Yüklenirken Hata Oluştu
    </Typography>
  );
};

export default Header;
