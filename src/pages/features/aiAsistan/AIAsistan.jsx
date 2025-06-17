import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { initialTips } from "./shared/aiAsistanEnums";
import LevelSelector from "./LevelSelector";
import StudyPlan from "./StudyPlan";
import DailyTips from "./DailyTips";
import ChatBot from "./ChatBot";
import { useColors } from "../../../context/ColorContext";

export default function AIAsistan() {
  const {colors} = useColors();

  const [level, setLevel] = useState("beginner");
  const [tips] = useState(initialTips);
  const [chat, setChat] = useState([
    { user: "AI", text: "Merhaba! Bugün sana nasıl yardımcı olabilirim?" },
  ]);

  return (
    <Box
      sx={{
        mx: "auto",
        p: 4,
        bgcolor: colors.backgroundPaper,
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          color: colors.primary,
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        Yapay Zeka Destekli Asistan
      </Typography>

      <LevelSelector level={level} setLevel={setLevel} />
      <StudyPlan level={level} />
      <DailyTips tips={tips} />
      <ChatBot chat={chat} setChat={setChat} />
    </Box>
  );
}
