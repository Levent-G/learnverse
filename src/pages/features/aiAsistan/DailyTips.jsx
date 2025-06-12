import { Box, Paper, Typography } from "@mui/material";

export default function DailyTips({ tips }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Günlük İpuçları
      </Typography>
      <Paper sx={{ p: 3, backgroundColor: "#f3e5f5" }}>
        <ul>
          {tips.map((tip, idx) => (
            <li key={idx}>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                • {tip}
              </Typography>
            </li>
          ))}
        </ul>
      </Paper>
    </Box>
  );
}
