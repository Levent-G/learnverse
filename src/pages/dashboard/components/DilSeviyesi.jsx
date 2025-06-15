import React from "react";
import {
  Box,
  Card,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import { Translate } from "@mui/icons-material";

const languageLevels = [
  { language: "İngilizce", level: "Orta", progress: 65 },
  { language: "Almanca", level: "Başlangıç", progress: 30 },
];

const DilSeviyesi = () => {
  return (
    <Box mb={6}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: "#00695c", // koyu teal (deniz yeşili)
          mb: 4,
          textAlign: "center",
        }}
      >
        Dil Seviyen ve İlerlemen
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {languageLevels.map(({ language, level, progress }, i) => (
          <Grid item xs={12} md={5} key={i}>
            <Card
              elevation={5}
              sx={{
                backgroundColor: "#b2dfdb", // yumuşak teal-bej ton
                borderRadius: 3,
                height: 140,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                px: 3,
                py: 2,
                boxShadow: "0 6px 16px rgba(0, 105, 92, 0.15)",
                cursor: "default",
              }}
            >
              <Box display="flex" alignItems="center" mb={1}>
                <Translate sx={{ color: "#004d40", fontSize: 32 }} />
                <Typography
                  variant="subtitle1"
                  ml={1.5}
                  fontWeight={600}
                  color="#004d40"
                >
                  {language} - Seviye: {level}
                </Typography>
              </Box>

              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: "#80cbc4", // açık teal alt bar
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#004d40", // koyu teal bar
                  },
                }}
              />

              <Typography
                variant="body2"
                mt={1}
                fontWeight={600}
                color="#004d40"
                textAlign="right"
              >
                %{progress} tamamlandı
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DilSeviyesi;
