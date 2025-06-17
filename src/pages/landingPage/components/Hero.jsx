import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // düzeltme: doğru router kullanımı
import { useFetchData } from "../../../hooks/useFetchData";

const Hero = () => {
  const [data, error] = useFetchData("hero");

  return !error ? (
    <Box className="text-center py-16 px-4">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl font-bold mb-6"
      >
        {data?.title}{" "}
        <Typography variant="span" sx={{ color: "#c084fc" }}>
          {data?.title2}
        </Typography>
      </motion.h2>
      <Typography
        component="p"
        sx={{
          fontSize: { xs: "1.125rem", sm: "1.25rem" },
          maxWidth: "42rem",
          marginX: "auto",
          marginBottom: 3,
        }}
      >
        {data?.description}
      </Typography>
      <Link
        to="/kayit"
        className="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700"
      >
        Hemen Başla
      </Link>
    </Box>
  ) : (
    <Typography
      fontSize="1.5rem"
      sx={{ fontWeight: 800, color: "red", textAlign: "center" }}
    >
      Sayfa Yüklenirken Hata Oluştu
    </Typography>
  );
};

export default Hero;
