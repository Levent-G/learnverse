import { Box, Chip, Typography } from "@mui/material";

export default function LevelSelector({ level, setLevel }) {
  const levels = ["beginner", "intermediate", "advanced"];
  return (
    <Box sx={{ mb: 4, textAlign: "center" }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Öğrenme seviyeni seç:
      </Typography>
      {levels.map((lvl) => (
        <Chip
          key={lvl}
          label={lvl.charAt(0).toUpperCase() + lvl.slice(1)}
          onClick={() => setLevel(lvl)}
          sx={{
            backgroundColor: "#8e24aa",
            mx: 1,
            cursor: "pointer",
            fontWeight: level === lvl ? "bold" : "normal",
            boxShadow:
              level === lvl ? "0px 4px 10px rgba(156, 39, 176, 0.5)" : "none",
            transition: "all 0.3s ease",
            color:"white"
          }}
        />
      ))}
    </Box>
  );
}
