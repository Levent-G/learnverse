import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function VideoPreviewModal({ open, onClose, video }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          backgroundColor: "#F9FAFB",
          boxShadow: "0 12px 36px rgba(0,0,0,0.15)",
        },
      }}
      aria-labelledby="video-dialog-title"
    >
      <DialogTitle
        id="video-dialog-title"
        sx={{
          fontWeight: 800,
          fontSize: 20,
          color: theme.palette.primary.main,
          position: "relative",
          pb: 1,
          userSelect: "none",
        }}
      >
        {video?.title}
        <IconButton
          aria-label="Close video preview"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
            color: theme.palette.primary.main,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          p: 0,
          display: "flex",
          justifyContent: "center",
          backgroundColor: "black",
          borderRadius: "0 0 16px 16px",
        }}
      >
        {video ? (
          <iframe
            width="100%"
            height={fullScreen ? 250 : 480}
            src={video.videoUrl}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ borderRadius: 8 }}
          />
        ) : (
          <Box sx={{ p: 4, color: "text.secondary" }}>
            No video selected.
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
