import React, { useState, useRef, useEffect } from "react";
import { Box, TextField, IconButton, List, ListItem, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function ChatArea({ messages, onSend }) {
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  // Mesaj listesinin sonuna scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input.trim());
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        height: 400,
        display: "flex",
        flexDirection: "column",
        p: 2,
        mb: 3,
        borderRadius: 3,
        bgcolor: "#FFFFFF",
        boxShadow: "0 4px 10px rgba(14,165,233,0.1)",
      }}
    >
      <List
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          mb: 1,
          px: 1,
          scrollbarWidth: "thin",
          scrollbarColor: "#0EA5E9 transparent",
          "&::-webkit-scrollbar": { width: 6 },
          "&::-webkit-scrollbar-thumb": { backgroundColor: "#0EA5E9", borderRadius: 3 },
        }}
      >
        {messages.map(({ id, sender, text }) => (
          <ListItem
            key={id}
            sx={{
              justifyContent: sender === "user" ? "flex-end" : "flex-start",
              px: 0,
              mb: 1,
            }}
          >
            <Box
              sx={{
                maxWidth: "70%",
                bgcolor: sender === "user" ? "#0EA5E9" : "#E0F2FE",
                color: sender === "user" ? "#fff" : "#0369A1",
                p: 1.5,
                borderRadius: 2,
                boxShadow: sender === "user" ? "0 3px 10px rgba(14,165,233,0.4)" : "none",
                fontWeight: 600,
                whiteSpace: "pre-line",
                userSelect: "text",
              }}
            >
              {text}
            </Box>
          </ListItem>
        ))}
        <div ref={bottomRef} />
      </List>
      <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ display: "flex" }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Mesajınızı yazın..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          sx={{ bgcolor: "#F5F7FA", borderRadius: 2 }}
        />
        <IconButton color="primary" onClick={handleSend} sx={{ ml: 1 }}>
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}
