import React from "react";
import { Box, Typography, TextField, Button, Paper, Divider } from "@mui/material";

const ChatBox = ({ chatMessages, newChatMsg, setNewChatMsg, addChatMessage }) => (
  <Box sx={{ mb: 5 }}>
    <Typography variant="h6" sx={{ mb: 2, color: "#6a1b9a", fontWeight: 700 }}>
      Sohbet
    </Typography>
    <Paper sx={{ maxHeight: 250, overflowY: "auto", p: 2, mb: 1, backgroundColor: "#f3e5f5" }}>
      {chatMessages.map(({ user, text }, i) => (
        <Box key={i} sx={{ mb: 1 }}>
          <Typography sx={{ fontWeight: "bold", color: "#4a148c" }}>{user}:</Typography>
          <Typography>{text}</Typography>
          <Divider sx={{ mt: 0.5 }} />
        </Box>
      ))}
    </Paper>
    <Box sx={{ display: "flex", gap: 2 }}>
      <TextField
        fullWidth
        size="small"
        value={newChatMsg}
        onChange={(e) => setNewChatMsg(e.target.value)}
        placeholder="Mesaj yaz..."
        onKeyDown={(e) => e.key === "Enter" && addChatMessage()}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#6a1b9a" },
            "&:hover fieldset": { borderColor: "#4a148c" },
            "&.Mui-focused fieldset": { borderColor: "#4a148c" },
          },
        }}
      />
      <Button
        variant="contained"
        onClick={addChatMessage}
        sx={{
          backgroundColor: "#6a1b9a",
          "&:hover": { backgroundColor: "#4a148c" },
          fontWeight: "bold",
          whiteSpace: "nowrap",
        }}
      >
        Gönder
      </Button>
    </Box>
  </Box>
);

export default ChatBox;
