import React from "react";
import { Box, Card, Typography, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { featuresModul } from "../shared/dashboardEnums";
import { useColors } from "../../../context/ColorContext";

const Moduller = () => {
  const navigate = useNavigate();
  const { colors } = useColors();

  return (
    <Box sx={{ mt: 6, mb: 6 }}>
      <Typography
        variant="h5"
        fontWeight={700}
        color={colors.primaryDark} // Koyu pastel mor
        sx={{ mb: 4, textAlign: "center" }}
      >
        Öğrenmeye Devam Et
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {featuresModul.map(({ path, icon, title, description }) => (
          <Grid item xs={12} sm={6} md={4} key={path}>
            <Card
              elevation={4}
              sx={{
                p: 3,
                height: 240,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: 3,
                bgcolor: colors.primaryLight, // Açık pastel mor
                boxShadow: `0 6px 18px ${colors.primary}26`, // rgba efekti için 26 hex = %15 opacity
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: `0 12px 28px ${colors.primary}4d`, // %30 opacity
                  bgcolor: colors.primary, // Canlı mor (hover)
                },
              }}
              onClick={() => navigate(path)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") navigate(path);
              }}
              aria-label={`${title} modülüne git`}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ fontSize: 40, color: colors.primaryDark }}>{icon}</Box>
                <Typography variant="h6" fontWeight={700} color={colors.primaryDark}>
                  {title}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                color={colors.primaryDark}
                sx={{ mt: 1.5, flexGrow: 1 }}
              >
                {description}
              </Typography>
              <Box sx={{ textAlign: "right" }}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(path);
                  }}
                  sx={{
                    bgcolor: colors.primary,
                    color: "#fff",
                    fontWeight: 600,
                    borderRadius: 2,
                    px: 3,
                    textTransform: "none",
                    "&:hover": {
                      bgcolor: colors.primaryDark,
                    },
                  }}
                  aria-label={`${title} modülüne devam et`}
                >
                  Devam et
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Moduller;
