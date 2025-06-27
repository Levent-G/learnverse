import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";

const scenarios = [
  { id: 1, label: "Markette Alışveriş" },
  { id: 2, label: "İş Görüşmesi" },
  { id: 3, label: "Restoranda Sipariş" },
  { id: 4, label: "Telefonla Randevu" },
];

export default function ScenarioSelector({ onSelect }) {
  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center" color="#0EA5E9">
        Lütfen Bir Senaryo Seçin
      </Typography>
      <Grid container spacing={3}>
        {scenarios.map((scenario) => (
          <Grid item xs={12} sm={6} key={scenario.id}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                textAlign: "center",
                borderRadius: 3,
                cursor: "pointer",
                bgcolor: "#E0F2FE",
                color: "#0369A1",
                fontWeight: "600",
                "&:hover": { bgcolor: "#0EA5E9", color: "#fff" },
                userSelect: "none",
              }}
              onClick={() => onSelect(scenario)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === "Enter" && onSelect(scenario)}
            >
              {scenario.label}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
