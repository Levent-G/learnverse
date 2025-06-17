import { Avatar, Box, Card, Grid, Typography } from "@mui/material";
import React from "react";
import { enrolledCourses } from "../shared/dashboardEnums";
import { useColors } from "../../../context/ColorContext";

const AlinanDerslerHocalar = () => {
  const { colors } = useColors();

  return (
    <Box mb={6}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: colors.primaryDark,
          mt: 6,
          mb: 4,
          textAlign: "center",
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
                backgroundColor: colors.primaryLight + "33", // çok açık mor-lila saydam
                boxShadow: `0 3px 10px ${colors.primaryDark}22`,
                cursor: "default",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: `0 6px 20px ${colors.primaryDark}44`,
                  backgroundColor: colors.primaryLight + "55",
                },
              }}
            >
              <Avatar
                src={course.avatar}
                alt={course.teacher}
                sx={{
                  width: 56,
                  height: 56,
                  border: `2px solid ${colors.primary}`,
                }}
              />
              <Box>
                <Typography
                  fontWeight={700}
                  fontSize="1rem"
                  sx={{ color: colors.primaryDark }}
                >
                  {course.subject}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: colors.primary }}
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
