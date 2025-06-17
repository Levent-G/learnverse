import React from "react";
import { Box, Typography, Checkbox, FormControlLabel, Paper } from "@mui/material";
import { useColors } from "../../../context/ColorContext";

const DailyTasks = ({ tasks, toggleTask }) => {
  const {colors} = useColors();

  return (
    <Box sx={{ mb: 5 }}>
      <Typography variant="h6" sx={{ mb: 2, color: colors.primary, fontWeight: 700 }}>
        Günlük Görevler
      </Typography>
      <Paper
        sx={{
          p: 2,
          backgroundColor: colors.backgroundPaper,
          borderRadius: 3,
        }}
      >
        {tasks.map(({ id, task, done }) => (
          <FormControlLabel
            key={id}
            control={
              <Checkbox
                checked={done}
                onChange={() => toggleTask(id)}
                color="secondary"
              />
            }
            label={task}
            sx={{
              color: done ? "text.disabled" : colors.textPrimary,
              userSelect: "none",
            }}
          />
        ))}
      </Paper>
    </Box>
  );
};

export default DailyTasks;
