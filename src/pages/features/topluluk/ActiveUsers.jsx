import React from "react";
import { Box, Typography, Avatar, Grid, Paper } from "@mui/material";

const ActiveUsers = ({ users }) => (
  <Box sx={{ mb: 5 }}>
    <Typography variant="h6" sx={{ mb: 2 }}>
      Aktif Kullanıcılar
    </Typography>
    <Grid container spacing={3}>
      {users.map(({ id, name, bio, avatar }) => (
        <Grid key={id} item xs={12} sm={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              textAlign: "center",
              borderRadius: 3,
              cursor: "pointer",
              transition: "transform 0.3s",
              ":hover": { transform: "scale(1.05)" },
              backgroundColor: "#f3e5f5",
              color: "#4a148c",
            }}
          >
            <Avatar
              src={avatar}
              alt={name}
              sx={{ width: 72, height: 72, mx: "auto", mb: 1, border: "2px solid #6a1b9a" }}
            />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {bio}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default ActiveUsers;
