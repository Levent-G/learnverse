import React from "react";
import {
  Card,
  Box,
  Typography,
  Chip,
  Button,
  Grid,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const colors = {
  primary: "#2563EB", // Mavi - güçlü vurgu
  primaryLight: "#3B82F6",
  background: "#F9FAFB",
  textPrimary: "#1E293B",
  textSecondary: "#64748B",
  accent: "#60A5FA",
  chipBackground: "#DBEAFE",
  chipBorder: "#93C5FD",
};

export default function VideoCard({ video, onPreview }) {
  return (
    <Card
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 8px 20px rgba(37, 99, 235, 0.1)",
        backgroundColor: colors.background,
        cursor: "pointer",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 12px 36px rgba(37, 99, 235, 0.25)",
        },
        height: "100%",
      }}
      onClick={() => onPreview(video)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onPreview(video);
        }
      }}
    >
      <Box
        component="img"
        src={video.thumbnail}
        alt={video.title}
        loading="lazy"
        sx={{
          width: "100%",
          height: 160,
          objectFit: "cover",
          borderBottom: `4px solid ${colors.primary}`,
          userSelect: "none",
        }}
      />

      <Box sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Typography
          variant="h6"
          noWrap
          sx={{ color: colors.textPrimary, fontWeight: 800, mb: 0.5 }}
          title={video.title}
        >
          {video.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: colors.textSecondary,
            mb: 2,
            flexGrow: 1,
            lineHeight: 1.3,
          }}
          noWrap
          title={video.description}
        >
          {video.description}
        </Typography>

        <Grid container spacing={1} sx={{ mb: 2 }}>
          <Grid item>
            <Chip
              label={video.category}
              size="small"
              sx={{
                backgroundColor: colors.chipBackground,
                color: colors.primary,
                fontWeight: 600,
                borderRadius: 2,
                textTransform: "capitalize",
              }}
            />
          </Grid>
          <Grid item>
            <Chip
              label={video.level}
              size="small"
              sx={{
                backgroundColor: colors.chipBackground,
                color: colors.primaryLight,
                fontWeight: 600,
                borderRadius: 2,
                textTransform: "capitalize",
              }}
            />
          </Grid>
          <Grid item>
            <Chip
              icon={<VisibilityIcon sx={{ color: colors.primaryLight }} />}
              label={video.views}
              size="small"
              variant="outlined"
              sx={{
                borderColor: colors.chipBorder,
                color: colors.textSecondary,
                fontWeight: 600,
                borderRadius: 2,
                minWidth: 48,
              }}
            />
          </Grid>
          <Grid item>
            <Chip
              icon={<ThumbUpIcon sx={{ color: colors.primaryLight }} />}
              label={video.likes}
              size="small"
              variant="outlined"
              sx={{
                borderColor: colors.chipBorder,
                color: colors.textSecondary,
                fontWeight: 600,
                borderRadius: 2,
                minWidth: 48,
              }}
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            startIcon={<PlayArrowIcon />}
            size="small"
            sx={{
              backgroundColor: colors.primary,
              fontWeight: 700,
              borderRadius: 2,
              textTransform: "none",
              boxShadow: "0 3px 8px rgba(37, 99, 235, 0.6)",
              "&:hover": {
                backgroundColor: colors.primaryLight,
                boxShadow: "0 6px 16px rgba(59, 130, 246, 0.8)",
              },
            }}
          >
            {video.watched ? "Watch Again" : "Preview"}
          </Button>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              fontWeight: 600,
              color: colors.textSecondary,
              fontSize: 14,
              userSelect: "none",
            }}
          >
            <AccessTimeIcon fontSize="small" />
            <Typography component="span">
              {video.duration || "12:34"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
