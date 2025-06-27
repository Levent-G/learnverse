import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";

// Paleti import edebilirsin ya da aşağıda direkt tanımladım:
export const colorsPalet = {
  primary: "#0EA5E9",        // Serin açık mavi (temiz ve güvenilir)
  primaryLight: "#E0F2FE",   // Buz mavisi
  primaryDark: "#0369A1",    // Derin mavi (odak alanları)

  secondary: "#818CF8",      // Lila-mavi geçişi (soğuk ama pastel)
  secondaryLight: "#C7D2FE", // Açık pastel indigo
  secondaryDark: "#4338CA",  // Koyu mavi-mor

  neutralLight: "#F0F9FF",   // Çok açık buz beyazı
  neutral: "#94A3B8",        // Açık mavi-gri
  neutralDark: "#1E293B",    // Lacivertimsi koyu gri

  accent: "#99F6E4",         // Turkuaz-mint (serin vurgu)
  success: "#6EE7B7",        // Açık yeşil
  error: "#FCA5A5",          // Hafif kırmızı-şeftali
  warning: "#FCD34D",        // Mevcut pastel sarı
};

export default function StartScreen({ onStart }) {
  const [openPreview, setOpenPreview] = useState(false);

  const infoItems = [
    {
      icon: <InfoIcon sx={{ fontSize: 40, color: colorsPalet.primary }} />,
      title: "Nasıl Oynanır?",
      description: "Ekrana düşen İngilizce kelimenin Türkçe anlamını seçin.",
    },
    {
      icon: <AccessTimeIcon sx={{ fontSize: 40, color: colorsPalet.primary }} />,
      title: "Zaman Sınırlaması",
      description: "Kelime düşerken acele edin, kaçırdığınızda canınız azalır.",
    },
    {
      icon: <EmojiEventsIcon sx={{ fontSize: 40, color: colorsPalet.primary }} />,
      title: "Yüksek Skor",
      description: "Doğru cevaplarsanız puan kazanır, 3 doğruda özel animasyon!",
    },
  ];

  // Örnek skor tablosu
  const leaderboard = [
    { id: 1, name: "Levent", score: 5200 },
    { id: 2, name: "Ayşe", score: 4800 },
    { id: 3, name: "Mehmet", score: 4300 },
    { id: 4, name: "Zeynep", score: 3900 },
    { id: 5, name: "Can", score: 3500 },
  ];

  return (
    <Box
      sx={{
        minHeight: "90vh",
        mx: "auto",
        px: 3,
        py: 5,
        bgcolor: colorsPalet.primaryLight,
        borderRadius: 4,
        boxShadow: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
    >
      {/* Başlık */}
      <Typography
        variant="h3"
        fontWeight="900"
        color={colorsPalet.primaryDark}
        textAlign="center"
        sx={{ letterSpacing: 1 }}
      >
        Kelime Yakalama Oyunu
      </Typography>
      <Typography
        variant="subtitle1"
        color={colorsPalet.neutralDark}
        textAlign="center"
        sx={{ maxWidth: 400 }}
      >
        İngilizce kelimeleri hızlıca öğrenin ve kelime dağarcığınızı güçlendirin!
      </Typography>

      {/* Info Kartları */}
      <Grid container spacing={3} sx={{ width: "100%" }}>
        {infoItems.map(({ icon, title, description }, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                textAlign: "center",
                borderRadius: 3,
                bgcolor: colorsPalet.neutralLight,
                boxShadow: `0 6px 15px ${colorsPalet.primary}25`, // opacity 25%
                transition: "transform 0.3s ease",
                "&:hover": { transform: "translateY(-6px)" },
                cursor: "default",
              }}
            >
              {icon}
              <Typography
                variant="h6"
                mt={1}
                mb={0.5}
                fontWeight="700"
                color={colorsPalet.primaryDark}
              >
                {title}
              </Typography>
              <Typography
                variant="body2"
                color={colorsPalet.neutral}
                sx={{ lineHeight: 1.4, px: 1 }}
              >
                {description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Video Önizleme ve Başla Butonları */}
      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <Button
          variant="outlined"
          onClick={() => setOpenPreview(true)}
          sx={{
            fontWeight: 700,
            px: 4,
            py: 1.5,
            borderColor: colorsPalet.primary,
            color: colorsPalet.primary,
            borderRadius: 3,
            "&:hover": { bgcolor: colorsPalet.primaryLight, borderColor: colorsPalet.primary },
          }}
        >
          Nasıl Oynanır?
        </Button>
        <Button
          variant="contained"
          onClick={onStart}
          sx={{
            px: 5,
            py: 1.5,
            fontWeight: 900,
            bgcolor: colorsPalet.primary,
            borderRadius: 3,
            boxShadow: `0 6px 15px ${colorsPalet.primary}80`,
            "&:hover": { bgcolor: colorsPalet.primaryDark },
          }}
        >
          Başla
        </Button>
      </Box>

      {/* Skor Tablosu */}
      <Paper
        elevation={3}
        sx={{
          mt: 5,
          p: 2,
          width: "100%",
          maxWidth: 400,
          borderRadius: 3,
          bgcolor: colorsPalet.neutralLight,
          boxShadow: `0 6px 15px ${colorsPalet.primary}25`,
        }}
      >
        <Typography
          variant="h6"
          fontWeight="700"
          color={colorsPalet.primaryDark}
          mb={1}
          textAlign="center"
        >
          En Yüksek Skorlar
        </Typography>
        <Divider />
        <List>
          {leaderboard.map(({ id, name, score }, i) => (
            <ListItem
              key={id}
              sx={{
                px: 0,
                py: 1,
                justifyContent: "space-between",
              }}
              secondaryAction={
                <Typography
                  variant="subtitle1"
                  fontWeight="700"
                  color={colorsPalet.primaryDark}
                >
                  {score}
                </Typography>
              }
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <EmojiEventsOutlinedIcon
                  sx={{
                    color: i === 0 ? colorsPalet.warning : colorsPalet.primary,
                    fontSize: 28,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={name}
                primaryTypographyProps={{
                  fontWeight: "600",
                  color: colorsPalet.primaryDark,
                }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Video Modal */}
      <Dialog
        open={openPreview}
        onClose={() => setOpenPreview(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogContent
          sx={{
            position: "relative",
            p: 0,
            bgcolor: "black",
            borderRadius: 1,
          }}
        >
          <IconButton
            onClick={() => setOpenPreview(false)}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "white",
              zIndex: 10,
            }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>

          <video
            controls
            autoPlay
            style={{ width: "100%", borderRadius: 4 }}
            src="https://www.w3schools.com/html/mov_bbb.mp4"
          >
            Tarayıcınız video etiketini desteklemiyor.
          </video>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
