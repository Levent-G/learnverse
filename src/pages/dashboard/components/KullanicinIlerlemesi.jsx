import { Box, LinearProgress, Typography, Card } from "@mui/material";
import React from "react";
import { otherUsersProgress, userProgress } from "../shared/dashboardEnums";
import { useColors } from "../../../context/ColorContext";

const KullanicinIlerlemesi = () => {
  const { colors } = useColors();

  const allProgressValues = [
    userProgress.progress,
    ...otherUsersProgress.map((u) => u.progress),
  ];
  const averageProgress =
    allProgressValues.reduce((sum, val) => sum + val, 0) /
    allProgressValues.length;

  return (
    <Box mb={6} >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: colors.primaryDark,
          mb: 4,
          textAlign: "center",
        }}
      >
        Genel İlerlemeniz
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        {[
          {
            title: `${userProgress.name} (Siz)`,
            value: userProgress.progress,
            barColor: colors.primary,
            bgColor: colors.primaryLight + "33", // saydam açık ton
          },
          {
            title: "Tüm Kullanıcıların Ortalaması",
            value: averageProgress,
            barColor: colors.secondary,
            bgColor: colors.secondaryLight + "33",
          },
        ].map(({ title, value, barColor, bgColor }, i) => (
          <Card
            key={i}
            sx={{
              flex: "1 1 320px",
              p: 3,
              borderRadius: 4,
              backgroundColor: colors.neutralLight,
              boxShadow: `0 4px 12px ${colors.primaryDark}22`,
            }}
          >
            <Typography
              fontWeight={700}
              mb={1}
              fontSize="1rem"
              color={colors.primaryDark}
            >
              {title}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={value}
              sx={{
                height: 14,
                borderRadius: 7,
                backgroundColor: bgColor,
                "& .MuiLinearProgress-bar": {
                  backgroundColor: barColor,
                },
              }}
            />
            <Typography
              variant="body2"
              mt={1}
              fontSize="0.85rem"
              color={colors.primaryDark}
            >
              %{value.toFixed(1)} tamamlandı
            </Typography>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default KullanicinIlerlemesi;
