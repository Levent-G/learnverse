import React from "react";
import { Box, Container, Paper } from "@mui/material";
import RoleplayHeader from "./RoleplayHeader";
import ScenarioSelector from "./ScenarioSelector";

export default function RoleplayStartScreen({ onScenarioSelect }) {
  return (
    <Box
      sx={{
        minHeight: "90vh",
        background:
          "linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 50%, #0EA5E9 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={8}
          sx={{
            p: 4,
            borderRadius: 5,
            backdropFilter: "blur(8px)",
            bgcolor: "rgba(255 255 255 / 0.75)",
            boxShadow: "0 15px 40px rgba(14,165,233,0.25)",
          }}
        >
          <RoleplayHeader />
          <ScenarioSelector onSelect={onScenarioSelect} />
        </Paper>
      </Container>
    </Box>
  );
}
