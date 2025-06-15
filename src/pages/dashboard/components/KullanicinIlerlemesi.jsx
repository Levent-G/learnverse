import { Box, LinearProgress, Typography, Card } from "@mui/material";
import React from "react";
import { otherUsersProgress, userProgress } from "../shared/dashboardEnums";

const KullanicinIlerlemesi = () => {
  const allProgressValues = [
    userProgress.progress,
    ...otherUsersProgress.map((u) => u.progress),
  ];
  const averageProgress =
    allProgressValues.reduce((sum, val) => sum + val, 0) /
    allProgressValues.length;

  return (
    <Box mb={6}>
        <Typography
        variant="h5"
        sx={{ fontWeight: 700, color: "#6a1b9a", mb: 4, textAlign: "center" }} // mor-lila
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
        {[ // kart yapısında hem kendin hem ortalama
          {
            title: `${userProgress.name} (Siz)`,
            value: userProgress.progress,
            barColor: "#673ab7",
            bgColor: "#ede7f6",
          },
          {
            title: "Tüm Kullanıcıların Ortalaması",
            value: averageProgress,
            barColor: "#9575cd",
            bgColor: "#ede7f6",
          },
        ].map(({ title, value, barColor, bgColor }, i) => (
          <Card
            key={i}
            sx={{
              flex: "1 1 320px",
              p: 3,
              borderRadius: 4,
              backgroundColor: "#f8f5fc",
              boxShadow: "0 4px 12px rgba(74, 20, 140, 0.1)",
            }}
          >
            <Typography
              fontWeight={700}
              mb={1}
              fontSize="1rem"
              color="#5e35b1"
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
              color="#4a148c"
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
