import { Box, Typography, LinearProgress } from "@mui/material";

export default function QuizHeader({ timeLeft, totalTime, current, total }) {
  const formatTime = (secs) =>
    `${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(secs % 60).padStart(2, "0")}`;

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="body2" sx={{ textAlign: "right", fontWeight: 600 }}>
        Süre: {formatTime(timeLeft)}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={(timeLeft / totalTime) * 100}
        sx={{ height: 10, borderRadius: 5, mt: 0.5 }}
      />
      <Typography variant="h5" textAlign="center" fontWeight={700} mt={2}>
        Soru {current} / {total}
      </Typography>
    </Box>
  );
}
