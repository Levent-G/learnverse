// src/components/VideoPreviewModal.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function VideoPreviewModal({ open, onClose, video }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        {video?.title}
        <IconButton
          sx={{ position: "absolute", right: 8, top: 8 }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {video && (
          <iframe
            width="100%"
            height="400"
            src={video.videoUrl}
            frameBorder="0"
            allowFullScreen
            title={video.title}
          ></iframe>
        )}
      </DialogContent>
    </Dialog>
  );
}
