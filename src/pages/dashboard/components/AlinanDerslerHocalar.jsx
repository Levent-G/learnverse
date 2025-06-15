import { Avatar, Box, Card, Grid, Typography } from "@mui/material";
import React from "react";
import { enrolledCourses } from "../shared/dashboardEnums";

const AlinanDerslerHocalar = () => {
  return (
    <Box mb={6}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: "#4a148c",
          mt: 6,
          mb: 4,
        }}
      >
        Aldığınız Dersler & Hocalar
      </Typography>

      <Grid container spacing={3}>
        {enrolledCourses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card
              sx={{
                p: 3,
                display: "flex",
                alignItems: "center",
                gap: 2,
                borderRadius: 4,
                backgroundColor: "#f3e5f5", // açık mor ton
                boxShadow: "0 3px 10px rgba(74, 20, 140, 0.1)",
              }}
            >
              <Avatar
                src={course.avatar}
                alt={course.teacher}
                sx={{
                  width: 56,
                  height: 56,
                  border: "2px solid #7e57c2",
                }}
              />
              <Box>
                <Typography
                  fontWeight={700}
                  fontSize="1rem"
                  sx={{ color: "#4a148c" }}
                >
                  {course.subject}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#6a1b9a", mt: 0.5 }}
                >
                  Eğitmen: {course.teacher}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AlinanDerslerHocalar;
