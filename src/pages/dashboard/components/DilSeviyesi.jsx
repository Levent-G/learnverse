import React from "react";
import { Box, Card, Grid, LinearProgress, Typography } from "@mui/material";
import { Translate } from "@mui/icons-material";
import { useColors } from "../../../context/ColorContext";

const DilSeviyesi = () => {
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo")) || {};
  const { level,successRate } = userInfo;

  const { colors } = useColors();

 const languageLevels = [
    {
      language: "Güncel Seviye",
      level: level,
      progress: successRate.toFixed(1),
    }
  ];
  return (
    <Box mb={6} mt={6}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: colors.primaryDark,  // koyu mor-mavi, ciddi ve okunabilir
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
                backgroundColor: colors.neutralLight, // çok açık gri-beyaz
                borderRadius: 3,
                height: 140,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                px: 3,
                py: 2,
                boxShadow: `0 6px 16px ${colors.primaryLight}33`, // hafif mor-mavi gölge
                cursor: "default",
              }}
            >
              <Box display="flex" alignItems="center" mb={1}>
                <Translate sx={{ color: colors.primary, fontSize: 32 }} />
                <Typography
                  variant="subtitle1"
                  ml={1.5}
                  fontWeight={600}
                  color={colors.primaryDark}
                >
                  {language}: {level}
                </Typography>
              </Box>

              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: colors.neutral, // orta gri-mavi
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: colors.success, // pastel yeşil vurgusu
                  },
                }}
              />

              <Typography
                variant="body2"
                mt={1}
                fontWeight={600}
                color={colors.primaryDark}
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
