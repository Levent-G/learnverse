import React from "react";
import {
  Box,
  Card,
  Typography,
  CircularProgress,
  Stack,
} from "@mui/material";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import { useColors } from "../../../context/ColorContext";

const LearningProgressCard = () => {
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo")) || {};
  const { level,successRate } = userInfo;

  const completed =  successRate.toFixed(1)
  const target = 100

  const {colors} = useColors();
  
  const remaining = target - completed;
  const progressPercent = (completed / target) * 100;

  return (
    <Card
      sx={{
        mx: "auto",
        p: 4,
        borderRadius: 3,
        boxShadow: "0 6px 20px rgba(108, 99, 255, 0.15)", // primary rengin transparan gölgesi
        background: `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`,
        color: "#fff",
        mb:4
      }}
      elevation={8}
      aria-label="Öğrenme ilerleme durumu"
    >
      <Stack direction="row" spacing={3} alignItems="center" justifyContent="center">
        <Box position="relative" display="inline-flex">
          <CircularProgress
            variant="determinate"
            value={progressPercent}
            size={150}
            thickness={5}
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
            }}
          />
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <EmojiObjectsIcon sx={{ fontSize: 32, mb: 0.5, color: "#fff" }} />
            <Typography variant="h6" fontWeight="bold" sx={{ lineHeight: 1 }}>
              {progressPercent.toFixed(0)}%
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.85 }}>
              tamamlandı
            </Typography>
          </Box>
        </Box>

        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {level}'seviyesinin bitmesine ne kadar kaldı ? 
          </Typography>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ lineHeight: 1, mb: 0.5 }}
            aria-live="polite"
          >
            %{remaining.toFixed(1)} kaldı. 🎯
          </Typography>
          <Typography
            variant="body2"
            sx={{ opacity: 0.85, maxWidth: 230 }}
          >
            Hedefinize yaklaşıyorsunuz. Her gün biraz daha ilerleyin, başarınız
            katlanarak artsın!
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
};

export default LearningProgressCard;
