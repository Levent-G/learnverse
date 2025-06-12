import React from "react";
import { Box, Typography, Checkbox, FormControlLabel, Paper } from "@mui/material";

const DailyTasks = ({ tasks, toggleTask }) => (
  <Box sx={{ mb: 5 }}>
    <Typography variant="h6" sx={{ mb: 2, color: "#6a1b9a", fontWeight: 700 }}>
      Günlük Görevler
    </Typography>
    <Paper sx={{ p: 2, backgroundColor: "#f3e5f5", borderRadius: 3 }}>
      {tasks.map(({ id, task, done }) => (
        <FormControlLabel
          key={id}
          control={<Checkbox checked={done} onChange={() => toggleTask(id)} color="secondary" />}
          label={task}
          sx={{ color: done ? "text.disabled" : "text.primary", userSelect: "none" }}
        />
      ))}
    </Paper>
  </Box>
);

export default DailyTasks;
