import { Box, Paper, Typography } from "@mui/material";
import { useColors } from "../../../context/ColorContext";

export default function DailyTips({ tips }) {
  const {colors} = useColors();

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, color: colors.primary, fontWeight: 700 }}>
        Günlük İpuçları
      </Typography>
      <Paper sx={{ p: 3, backgroundColor: colors.backgroundPaper, borderRadius: 3 }}>
        <ul style={{ paddingLeft: 20 }}>
          {tips.map((tip, idx) => (
            <li key={idx}>
              <Typography variant="body2" sx={{ mb: 0.5, color: colors.textPrimary }}>
                • {tip}
              </Typography>
            </li>
          ))}
        </ul>
      </Paper>
    </Box>
  );
}
