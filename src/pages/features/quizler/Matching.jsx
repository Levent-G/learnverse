import { Box, Grid, MenuItem, Select, Typography } from "@mui/material";

export default function Matching({ data, answers, onChange }) {
  return (
    <Box sx={{ mb: 5 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Eşleştirme Soruları
      </Typography>
      {data.map(({ left, right }, idx) => (
        <Grid container spacing={2} key={idx}>
          {left.map((item) => (
            <Grid item xs={6} sm={4} key={item}>
              <Typography sx={{ fontWeight: 600 }}>{item}</Typography>
              <Select
                value={answers[item] || ""}
                onChange={(e) => onChange(item, e.target.value)}
                displayEmpty
                fullWidth
              >
                <MenuItem value="">
                  <em>Seçiniz</em>
                </MenuItem>
                {right.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          ))}
        </Grid>
      ))}
    </Box>
  );
}
