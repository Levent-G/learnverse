import React from "react";
import {
  Box,
  Card,
  Typography,
  Chip,
  Button,
  Grid,
  Avatar,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const softColors = {
  primary: "#87CEEB",
  secondary: "#A3BFFA",
  neutralLight: "#F5F9FF",
  neutralDark: "#394867",
  accent: "#B5EAEA",
  success: "#A1E3A1",
};

export default function VideoCard({ video, onPreview }) {
  return (
    <Card
      sx={{
        display: "flex",
        p: 2,
        borderRadius: 3,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        backgroundColor: softColors.neutralLight,
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        },
      }}
    >
      {/* Sol: Thumbnail */}
      <Box
        sx={{
          width: 160,
          height: 90,
          borderRadius: 2,
          overflow: "hidden",
          backgroundImage: `url(${video.thumbnail})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          mr: 3,
          flexShrink: 0,
        }}
      />

      {/* Orta: Video Bilgileri */}
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, color: softColors.neutralDark, mb: 0.5 }}
        >
          {video.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#657786", mb: 1.5, lineHeight: 1.4 }}
        >
          {video.description}
        </Typography>

        <Grid container spacing={1} sx={{ mb: 1 }}>
          <Grid item>
            <Chip
              label={video.category}
              sx={{
                backgroundColor: softColors.accent,
                color: softColors.neutralDark,
                fontWeight: "600",
                borderRadius: 2,
              }}
              size="small"
            />
          </Grid>
          <Grid item>
            <Chip
              label={video.level}
              sx={{
                backgroundColor: softColors.secondary,
                color: softColors.neutralDark,
                fontWeight: "600",
                borderRadius: 2,
              }}
              size="small"
            />
          </Grid>
          <Grid item>
            <Chip
              icon={<VisibilityIcon sx={{ color: softColors.neutralDark }} />}
              label={video.views}
              variant="outlined"
              size="small"
              sx={{
                borderColor: softColors.secondary,
                color: softColors.neutralDark,
                fontWeight: "600",
                borderRadius: 2,
              }}
            />
          </Grid>
          <Grid item>
            <Chip
              icon={<ThumbUpIcon sx={{ color: softColors.neutralDark }} />}
              label={video.likes}
              variant="outlined"
              size="small"
              sx={{
                borderColor: softColors.secondary,
                color: softColors.neutralDark,
                fontWeight: "600",
                borderRadius: 2,
              }}
            />
          </Grid>
        </Grid>

        <Button
          startIcon={<PlayArrowIcon />}
          variant="contained"
          onClick={() => onPreview(video)}
          sx={{
            backgroundColor: softColors.primary,
            color: "#fff",
            fontWeight: 600,
            borderRadius: 2,
            textTransform: "none",
            boxShadow: "0 3px 6px rgba(135, 206, 235, 0.4)",
            "&:hover": {
              backgroundColor: softColors.secondary,
              boxShadow: "0 6px 12px rgba(163, 191, 250, 0.6)",
            },
          }}
        >
          {video.watched ? "Watch Again" : "Preview"}
        </Button>
      </Box>

      {/* Sağ: Ekstra Alan (Öğretmen Avatar + Video Süresi) */}
      <Box
        sx={{
          width: 110,
          ml: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          color: softColors.neutralDark,
        }}
      >
        <Avatar
          alt="Instructor"
          src="https://randomuser.me/api/portraits/women/44.jpg"
          sx={{ width: 56, height: 56, mb: 2, boxShadow: "0 0 8px rgba(0,0,0,0.15)" }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            fontWeight: 600,
            fontSize: 14,
            backgroundColor: softColors.accent,
            px: 1.5,
            py: 0.5,
            borderRadius: 2,
            boxShadow: "inset 0 0 4px rgba(0,0,0,0.1)",
          }}
        >
          <AccessTimeIcon sx={{ mr: 0.7, fontSize: 18 }} />
          12:34
        </Box>
      </Box>
    </Card>
  );
}
