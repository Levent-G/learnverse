// components/QuizError.js
import React from "react";
import { Box, Typography, Button, Zoom } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ title, description }) => {
  const navigate = useNavigate();

  return (
    <Zoom in={true}>
      <Box
        sx={{
          mt: 10,
          textAlign: "center",
          p: 4,
          maxWidth: 500,
          mx: "auto",
          borderRadius: 3,
          boxShadow: 4,
          bgcolor: "#fff3f3",
          color: "#d32f2f",
        }}
      >
        <SentimentVeryDissatisfiedIcon sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h5" fontWeight="bold" gutterBottom>
            {title ? title : "404 - Sayfa Bulunamadı"}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {description
            ? description
            : " Lütfen internet bağlantınızı kontrol edin veya daha sonra tekrar deneyin."}
        </Typography>
        <Button
          variant="contained"
          color="error"
          sx={{ mt: 2 }}
          onClick={() => navigate("/ana-sayfa")}
        >
          Ana Sayfaya Dön
        </Button>
      </Box>
    </Zoom>
  );
};

export default ErrorPage;
