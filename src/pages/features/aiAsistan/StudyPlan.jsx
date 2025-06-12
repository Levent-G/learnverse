import { Box, Paper, Typography } from "@mui/material";
import { studyPlans } from "./shared/aiAsistanEnums";

export default function StudyPlan({ level }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Sana Özel Çalışma Planı
      </Typography>
      <Paper sx={{ p: 3, backgroundColor: "#f3e5f5" }}>
        <ul>
          {studyPlans[level].map((item, idx) => (
            <li key={idx}>
              <Typography variant="body1">{item}</Typography>
            </li>
          ))}
        </ul>
      </Paper>
    </Box>
  );
}
