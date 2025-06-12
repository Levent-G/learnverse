import { Paper, Typography } from "@mui/material";

const CustomPaper = ({ sx, title, altTitle, children }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 7,
        borderRadius: 3,
        backgroundColor: "#ffffff",
        boxShadow: "0 10px 30px rgba(74, 144, 226, 0.15)", // mavi gölge
        fontFamily: "Rubik, sans-serif",
        ...sx,
      }}
    >
      {title && (
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 700,
            color: "#222222", // koyu gri
            mb: 1,
            letterSpacing: "-0.5px",
          }}
        >
          Learnverse
        </Typography>
      )}
      
      {altTitle && (
        <Typography
          variant="body2"
          align="center"
          sx={{ color: "#555555", mb: 3 }} // biraz açık koyu gri
        >
          Hoş geldiniz! Giriş yapmak için bilgilerinizi girin.
        </Typography>
      )}

      {children}
    </Paper>
  );
};

export default CustomPaper;
