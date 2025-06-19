import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { useColors } from "../../../context/ColorContext";

const KullaniciBilgisi = () => {
  const { colors } = useColors();

  return (
    <Box
      component="header"
      sx={{
        py: 4,
        px: 3,
        mx: "auto",
        userSelect: "none",
        bgcolor: colors.primaryLight,
        borderRadius: 3,
        boxShadow: `0 4px 12px ${colors.primaryLight}55`,
        textAlign: "center",
      }}
    >
      <Avatar
        sx={{
          width: 70,
          height: 70,
          mx: "auto",
          mb: 2,
          bgcolor: colors.primary,
          fontSize: 28,
          fontWeight: "bold",
          boxShadow: `0 4px 12px ${colors.primaryDark}88`,
          border: `3px solid ${colors.primaryLight}`,
          cursor: "default",
          userSelect: "none",
        }}
        aria-label="kullanıcı avatar"
      >
        A
      </Avatar>

      <Typography
        variant="h4"
        fontWeight={700}
        gutterBottom
        sx={{ letterSpacing: 1, color: colors.primaryDark }}
      >
        Hoş geldin, Ahmet!
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mb: 4,
          fontStyle: "italic",
          color: colors.neutralDark,
          fontWeight: 500,
          letterSpacing: 0.3,
        }}
      >
        Bugün öğrenmeye hazır mısın?
      </Typography>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="center"
        spacing={3}
        flexWrap="wrap"
      >
        
          <LocalFireDepartmentIcon
            fontSize="medium"
            sx={{ color: colors.warning }}
          />
          <Typography
            variant="subtitle1"
            fontWeight={600}
            color={colors.warning}
          >
            Seri: 5 gün
          </Typography>

          <EmojiEventsIcon fontSize="medium" sx={{ color: colors.success }} />
          <Typography variant="subtitle1" fontWeight={600} color={colors.success}>
            Başarı Puanı: 1260
          </Typography>
      </Stack>
    </Box>
  );
};

export default KullaniciBilgisi;
