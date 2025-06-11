import React from "react";
import { Alert, Box, Container } from "@mui/material";
import CustomPaper from "../customPaper/CustomPaper";

const Page = ({ title, altTitle, info, error, sx, children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f5e8ff, #ffffff)", // Açık mor - beyaz geçişli
        fontFamily: "Rubik, sans-serif",
        px: 2,
        ...sx,
      }}
      component="main"
    >
      {info && (
        <Alert
          severity="info"
          sx={{
            backgroundColor: "#e3f2fd",
            color: "#1e1e2f",
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
            <Alert severity="error" sx={{ mb: 2, fontSize: "0.85rem" }}>
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
