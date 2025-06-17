import { Box, Paper, Typography } from "@mui/material";
import { studyPlans } from "./shared/aiAsistanEnums";
import { useColors } from "../../../context/ColorContext";

export default function StudyPlan({ level }) {
  const {colors} = useColors();

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, color: colors.primary, fontWeight: 700 }}>
        Sana Özel Çalışma Planı
      </Typography>
      <Paper sx={{ p: 3, backgroundColor: colors.backgroundPaper, borderRadius: 3 }}>
        <ul style={{ paddingLeft: 20 }}>
          {studyPlans[level].map((item, idx) => (
            <li key={idx}>
              <Typography variant="body1" sx={{ color: colors.textPrimary }}>
                {item}
              </Typography>
            </li>
          ))}
        </ul>
      </Paper>
    </Box>
  );
}
