import React from "react";
import { Box, Card, Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useColors } from "../../../context/ColorContext";
import { tasksData } from "../shared/dashboardEnums";



const GunlukGorevler = () => {
  const navigate = useNavigate();
  const { colors } = useColors();

  return (
    <Grid container spacing={4} justifyContent="center" sx={{ mb: 6, mt: 5 }}>
      {tasksData.map(({ title, tasks, buttonText, route }, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card
            elevation={3}
            sx={{
              p: 4,
              height: 220,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderRadius: 3,
              bgcolor: colors.secondaryLight,  // pastel mercan-turuncu açık
              boxShadow: `0 6px 18px ${colors.secondary}1f`, // yarı saydam turuncu (#ef6c00 + 12% opacity gibi)
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: `0 12px 28px ${colors.secondary}4d`, // daha koyu yarı saydam
                bgcolor: colors.secondaryLight + "dd", // biraz daha koyu pastel (CSS renk kodu ile opacity eklemek için)
              },
            }}
            onClick={() => navigate(route)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") navigate(route);
            }}
            aria-label={`${title} kartı, detaylar için tıklayın`}
          >
            <Box>
              <Typography
                variant="h6"
                fontWeight="700"
                color={colors.secondaryDark}
                mb={1.5}
                sx={{ userSelect: "none" }}
              >
                {title}
              </Typography>
              {tasks.map((task, i) => (
                <Typography
                  key={i}
                  variant="body2"
                  color={colors.neutralDark}
                  sx={{ mb: i !== tasks.length - 1 ? 0.6 : 0 }}
                >
                  {task}
                </Typography>
              ))}
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Button
                variant="contained"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(route);
                }}
                sx={{
                  bgcolor: colors.secondary,
                  color: "#fff",
                  fontWeight: "600",
                  "&:hover": {
                    bgcolor: colors.secondaryDark,
                  },
                  px: 3,
                  borderRadius: 2,
                  textTransform: "none",
                }}
                aria-label={buttonText}
              >
                {buttonText}
              </Button>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default GunlukGorevler;
