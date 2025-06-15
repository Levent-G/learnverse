import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

const KullaniciBilgisi = () => {
  return (
    <Box
      component="header"
      sx={{
        py: 3,
        px: 2,
        bgcolor: "background.default",
        borderBottom: "1px solid",
        borderColor: "divider",
        textAlign: "center",
        maxWidth: 480,
        mx: "auto",
        userSelect: "none",
      }}
    >
      <Avatar
        sx={{
          width: 56,
          height: 56,
          mx: "auto",
          mb: 1.5,
          bgcolor: "primary.main",
          fontSize: 24,
          fontWeight: "medium",
          boxShadow: "0 2px 8px rgba(25, 118, 210, 0.3)",
        }}
        aria-label="kullanıcı avatar"
      >
        A
      </Avatar>

      <Typography
        variant="h5"
        fontWeight={700}
        gutterBottom
        sx={{ letterSpacing: 0.5, color: "text.primary" }}
      >
        Hoş geldin, Ahmet!
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3, fontStyle: "italic" }}
      >
        Bugün öğrenmeye hazır mısın?
      </Typography>

      <Stack
        direction="row"
        justifyContent="center"
        spacing={4}
        flexWrap="wrap"
        sx={{ color: "text.secondary", fontWeight: 500 }}
      >
        <Stack direction="row" alignItems="center" spacing={0.8}>
          <LocalFireDepartmentIcon fontSize="small" color="warning" />
          <Typography>Seri: 5 gün</Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={0.8}>
          <EmojiEventsIcon fontSize="small" color="success" />
          <Typography>Başarı Puanı: 1260</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default KullaniciBilgisi;
