import React from "react";
import { Alert, Box, Container } from "@mui/material";
import CustomPaper from "../customPaper/CustomPaper";
import { useColors } from "../../context/ColorContext";

const Page = ({ title, altTitle, info, error, sx, children }) => {
  const { colors } = useColors();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // Arka planı pastel renk paletindeki tonlarla güncelledim
        background: `linear-gradient(135deg, ${colors.primaryLight}, ${colors.neutralLight})`,
        fontFamily: "Rubik, sans-serif",
        p: 3,
        ...sx,
      }}
      component="main"
    >
      {info && (
        <Alert
          severity="info"
          sx={{
            backgroundColor: colors.primaryLight,
            color: colors.primaryDark,
            mt: 2,
            mb: 2,
            borderRadius: 2,
          }}
        >
          {info}
        </Alert>
      )}
      <Container maxWidth="xs">
        <CustomPaper title={title} altTitle={altTitle}>
          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 2,
                fontSize: "0.85rem",
                backgroundColor: colors.error,
                color: "#fff",
              }}
            >
              {error}
            </Alert>
          )}
          {children}
        </CustomPaper>
      </Container>
    </Box>
  );
};

export default Page;
