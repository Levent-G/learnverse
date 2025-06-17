import React from "react";
import { Box, Typography, TextField, Button, Paper, Divider } from "@mui/material";
import { useColors } from "../../../context/ColorContext";

const ChatBox = ({ chatMessages, newChatMsg, setNewChatMsg, addChatMessage }) => {
  const {colors} = useColors();

  return (
    <Box sx={{ mb: 5 }}>
      <Typography variant="h6" sx={{ mb: 2, color: colors.primary, fontWeight: 700 }}>
        Sohbet
      </Typography>

      <Paper
        sx={{
          maxHeight: 250,
          overflowY: "auto",
          p: 2,
          mb: 1,
          backgroundColor: colors.backgroundPaper,
        }}
      >
        {chatMessages.map(({ user, text }, i) => (
          <Box key={i} sx={{ mb: 1 }}>
            <Typography sx={{ fontWeight: "bold", color: colors.primaryDark }}>{user}:</Typography>
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
            mb: 2,
            borderRadius: 2,
            // burada arka planı sadece root ve inputa veriyoruz
            "& .MuiOutlinedInput-root": {
              backgroundColor: "white", // açık gri gibi, kendi paletinden de olabilir
              borderRadius: 2,
              "& fieldset": {
                borderColor: colors.primaryLight,
              },
              "&:hover fieldset": {
                borderColor: colors.primaryDark,
              },
              "&.Mui-focused fieldset": {
                borderColor: colors.primaryDark,
              },
              "& input": {
                backgroundColor: "white", // mutlaka inputun içine de ver, transparent kalmasın
                color: colors.neutralDark,
              },
            },
            "& .MuiInputLabel-root": {
              color: colors.primaryDark,
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: colors.primaryDark,
            },
          }}
        />
        <Button
          variant="contained"
          onClick={addChatMessage}
          sx={{
            backgroundColor: colors.primary,
            "&:hover": { backgroundColor: colors.primaryDark },
            fontWeight: "bold",
            whiteSpace: "nowrap",
          }}
        >
          Gönder
        </Button>
      </Box>
    </Box>
  );
};

export default ChatBox;
