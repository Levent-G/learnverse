import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function ChatBot({ chat, setChat }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { user: "Sen", text: input.trim() };
    setChat((prev) => [...prev, userMessage]);

    setTimeout(() => {
      let reply = "Bu konuda maalesef henüz detaylı bilgi veremiyorum.";
      const lower = input.toLowerCase();
      if (lower.includes("kelime")) {
        reply =
          "Kelime öğrenimi için günlük tekrar ve cümle içinde kullanmak çok faydalı.";
      } else if (lower.includes("gramer")) {
        reply =
          "Gramer için örnek cümleler üzerinde çalışmak ve temel kuralları öğrenmek çok önemli.";
      } else if (lower.includes("quiz")) {
        reply = "Quizleri düzenli çözmek ilerlemeni hızlandırır.";
      } else if (lower.includes("konuşma")) {
        reply =
          "Konuşma pratiği için sesli kaydedip dinlemek ve partnerle pratik yapmak çok yararlı.";
      }

      setChat((prev) => [...prev, { user: "AI", text: reply }]);
    }, 1000);

    setInput("");
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Sorularını Sor
      </Typography>
      <Paper
        sx={{
          p: 2,
          maxHeight: 300,
          overflowY: "auto",
          mb: 2,
        }}
      >
        {chat.map(({ user, text }, i) => (
          <Box
            key={i}
            sx={{
              mb: 1,
              textAlign: user === "Sen" ? "right" : "left",
            }}
          >
            <Typography
              sx={{
                display: "inline-block",
                backgroundColor:
                  user === "Sen"
                    ? "#4a148c"
                    : "#4a148c",
                color:
                  user === "Sen"
                    ? "#f3e5f5"
                    : "#f3e5f5",
                borderRadius: 2,
                p: 1,
                maxWidth: "75%",
                wordWrap: "break-word",
              }}
            >
              <strong>{user}:</strong> {text}
            </Typography>
          </Box>
        ))}
      </Paper>
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Sorunu yaz..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button variant="contained" onClick={handleSend} sx={{ backgroundColor: "#4a148c",}}>
          Gönder
        </Button>
      </Box>
    </Box>
  );
}
